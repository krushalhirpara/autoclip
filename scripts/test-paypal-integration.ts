import { prisma } from "../src/server/db/prisma";
import { getPayPalService } from "../src/core/payments/paypal.service";
import { PRICING_PLANS, getPlanById, getPlanPrice, getPlanCredits } from "../src/core/payments/plans";
import { CreditService } from "../src/server/services/credit.service";
import { PaymentStatus, SubscriptionStatus } from "@prisma/client";

async function runTests() {
  console.log("===============================================================");
  console.log("🚀 Starting AutoClipp PayPal Integration Comprehensive Test Suite");
  console.log("===============================================================\n");

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string, detail?: string) {
    if (condition) {
      console.log(`  ✅ PASS: ${testName}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${testName}`);
      if (detail) console.error(`     Detail: ${detail}`);
      failed++;
    }
  }

  try {
    // -------------------------------------------------------------
    // TEST 1: Pricing Plan Configuration & Amounts in USD
    // -------------------------------------------------------------
    console.log("📌 Test Suite 1: Pricing Plans & Currency Integrity");
    
    const starter = getPlanById("starter");
    assert(starter !== null, "Starter plan exists");
    assert(starter?.monthlyPrice === 19.0, "Starter monthly price is $19.00 USD");
    assert(starter?.yearlyPrice === 190.0, "Starter yearly price is $190.00 USD (2 months free)");
    assert(starter?.credits === 120, "Starter credits is 120 minutes");
    assert(starter?.currency === "USD", "Starter currency is USD");

    const pro = getPlanById("pro");
    assert(pro !== null, "Pro plan exists");
    assert(pro?.monthlyPrice === 49.0, "Pro monthly price is $49.00 USD");
    assert(pro?.yearlyPrice === 490.0, "Pro yearly price is $490.00 USD");
    assert(pro?.credits === 500, "Pro credits is 500 minutes");

    const agency = getPlanById("agency");
    assert(agency !== null, "Agency plan exists");
    assert(agency?.monthlyPrice === 149.0, "Agency monthly price is $149.00 USD");
    assert(agency?.yearlyPrice === 1490.0, "Agency yearly price is $1490.00 USD");
    assert(agency?.credits === 2000, "Agency credits is 2000 minutes");

    assert(getPlanById("nonexistent_plan") === null, "Invalid plan ID returns null safely");

    // -------------------------------------------------------------
    // TEST 2: User Creation & Order Initiation
    // -------------------------------------------------------------
    console.log("\n📌 Test Suite 2: PayPal Order Creation & DB Record");
    const testEmail1 = `test_paypal_user1_${Date.now()}@example.com`;
    const testEmail2 = `test_paypal_user2_${Date.now()}@example.com`;

    const user1 = await prisma.user.create({
      data: {
        email: testEmail1,
        name: "Test PayPal User 1",
        role: "USER",
      },
    });

    const user2 = await prisma.user.create({
      data: {
        email: testEmail2,
        name: "Test PayPal User 2",
        role: "USER",
      },
    });

    const initialBalance1 = await CreditService.getBalance(user1.id);
    assert(initialBalance1 === 60, "User 1 initialized with 60 default starter credits");

    const paypalService = getPayPalService();

    // Create Order for Pro plan ($49 USD)
    const orderResult = await paypalService.createOrder({
      userId: user1.id,
      userEmail: user1.email,
      planId: "pro",
      billingInterval: "month",
    });

    assert(Boolean(orderResult.orderId), `Order created with ID: ${orderResult.orderId}`);
    assert(orderResult.amount === 49.0, "Order amount derived server-side matches $49.00 USD");
    assert(orderResult.currency === "USD", "Order currency is USD");

    // Verify DB PaymentRecord
    const pendingRecord = await prisma.paymentRecord.findUnique({
      where: { orderId: orderResult.orderId },
    });

    assert(pendingRecord !== null, "PaymentRecord exists in PostgreSQL");
    assert(pendingRecord?.status === PaymentStatus.PENDING, "PaymentRecord initial status is PENDING");
    assert(pendingRecord?.userId === user1.id, "PaymentRecord belongs to user 1");
    assert(pendingRecord?.creditsGranted === 0, "No credits granted before capture");

    // -------------------------------------------------------------
    // TEST 3: Capture Order & Entitlement Activation
    // -------------------------------------------------------------
    console.log("\n📌 Test Suite 3: Order Capture & Entitlement Activation");

    const captureResult = await paypalService.captureOrder({
      orderId: orderResult.orderId,
      userId: user1.id,
    });

    assert(captureResult.success === true, "Capture reported success");
    assert(captureResult.creditsAdded === 500, "Granted 500 Pro plan credits");
    assert(captureResult.newBalance === initialBalance1 + 500, `New credit balance matches ${initialBalance1 + 500}`);

    // Verify DB state after capture
    const completedRecord = await prisma.paymentRecord.findUnique({
      where: { orderId: orderResult.orderId },
    });

    assert(completedRecord?.status === PaymentStatus.COMPLETED, "PaymentRecord status updated to COMPLETED");
    assert(Boolean(completedRecord?.captureId), "PaymentRecord has capture ID");
    assert(completedRecord?.creditsGranted === 500, "PaymentRecord records 500 credits granted");

    const subscription = await prisma.subscription.findUnique({
      where: { userId: user1.id },
    });

    assert(subscription !== null, "Subscription record exists");
    assert(subscription?.status === SubscriptionStatus.ACTIVE, "Subscription status is ACTIVE");
    assert(subscription?.planId === "pro", "Subscription planId is 'pro'");

    // -------------------------------------------------------------
    // TEST 4: Idempotency Protection (Duplicate Capture Attempt)
    // -------------------------------------------------------------
    console.log("\n📌 Test Suite 4: Idempotency & Replay Attack Prevention");

    const duplicateCapture = await paypalService.captureOrder({
      orderId: orderResult.orderId,
      userId: user1.id,
    });

    assert(duplicateCapture.success === true, "Duplicate capture handled gracefully");
    assert(duplicateCapture.creditsAdded === 0, "Zero additional credits added on duplicate capture");
    
    const balanceAfterDuplicate = await CreditService.getBalance(user1.id);
    assert(balanceAfterDuplicate === initialBalance1 + 500, "Credit balance strictly unchanged after duplicate capture");

    // -------------------------------------------------------------
    // TEST 5: Cross-User Security (User 2 capturing User 1's order)
    // -------------------------------------------------------------
    console.log("\n📌 Test Suite 5: Cross-User Authorization Verification");

    // User 1 creates an Agency order
    const agencyOrder = await paypalService.createOrder({
      userId: user1.id,
      userEmail: user1.email,
      planId: "agency",
      billingInterval: "month",
    });

    let unauthorizedThrown = false;
    try {
      // User 2 attempts to capture User 1's order
      await paypalService.captureOrder({
        orderId: agencyOrder.orderId,
        userId: user2.id,
      });
    } catch (err) {
      unauthorizedThrown = true;
    }

    assert(unauthorizedThrown, "Cross-user capture attempt correctly rejected with unauthorized error");

    // -------------------------------------------------------------
    // TEST 6: Webhook Event Deduplication
    // -------------------------------------------------------------
    console.log("\n📌 Test Suite 6: Webhook Event Ingestion & Deduplication");

    const mockEventId = `WH-TEST-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const mockWebhookEvent = {
      id: mockEventId,
      event_type: "PAYMENT.CAPTURE.COMPLETED",
      summary: "Payment capture test",
      resource: {
        id: "CAP-TEST-123",
        custom_id: user1.id,
      },
    };

    const firstWebhook = await paypalService.handleWebhookEvent(mockWebhookEvent);
    assert(firstWebhook.handled === true, "First webhook processed successfully");

    const recordedWebhook = await prisma.webhookEvent.findUnique({
      where: { eventId: mockEventId },
    });
    assert(recordedWebhook !== null, "WebhookEvent recorded in PostgreSQL");
    assert(recordedWebhook?.status === "PROCESSED", "WebhookEvent status is PROCESSED");

    // Send the exact same webhook again
    const secondWebhook = await paypalService.handleWebhookEvent(mockWebhookEvent);
    assert(secondWebhook.handled === true, "Duplicate webhook recognized and acknowledged without duplicate insert");

    const webhookCount = await prisma.webhookEvent.count({
      where: { eventId: mockEventId },
    });
    assert(webhookCount === 1, "Webhook event exists exactly once in database");

    // -------------------------------------------------------------
    // CLEANUP
    // -------------------------------------------------------------
    console.log("\n🧹 Cleaning up test fixtures...");
    await prisma.webhookEvent.deleteMany({ where: { eventId: mockEventId } });
    await prisma.paymentRecord.deleteMany({ where: { userId: { in: [user1.id, user2.id] } } });
    await prisma.creditTransaction.deleteMany({ where: { userId: { in: [user1.id, user2.id] } } });
    await prisma.creditBalance.deleteMany({ where: { userId: { in: [user1.id, user2.id] } } });
    await prisma.subscription.deleteMany({ where: { userId: { in: [user1.id, user2.id] } } });
    await prisma.user.deleteMany({ where: { id: { in: [user1.id, user2.id] } } });
    console.log("   Cleanup completed.\n");

  } catch (err) {
    console.error("💥 Unhandled exception during testing:", err);
    failed++;
  } finally {
    await prisma.$disconnect();
  }

  console.log("===============================================================");
  console.log(`📊 Test Results: ${passed} Passed, ${failed} Failed`);
  console.log("===============================================================");

  if (failed > 0) {
    process.exit(1);
  }
}

runTests();
