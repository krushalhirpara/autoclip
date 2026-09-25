import { prisma } from "../db/prisma";
import { InsufficientCreditsError } from "@/core/errors/app-error";
import { CreditTransactionType } from "@prisma/client";
import { logger } from "@/lib/logger";

export class CreditService {
  static async getBalance(userId: string): Promise<number> {
    const record = await prisma.creditBalance.findUnique({
      where: { userId },
    });

    if (!record) {
      // Initialize default balance for new user (e.g. 60 free minutes/credits)
      const created = await prisma.creditBalance.create({
        data: {
          userId,
          balance: 60,
          lifetimeGranted: 60,
          lifetimeUsed: 0,
        },
      });
      return created.balance;
    }

    return record.balance;
  }

  static async deductCredits(
    userId: string,
    amount: number,
    description: string,
    metadata?: Record<string, unknown>
  ): Promise<number> {
    const currentBalance = await this.getBalance(userId);

    if (currentBalance < amount) {
      throw new InsufficientCreditsError(amount, currentBalance);
    }

    const updated = await prisma.$transaction(async (tx) => {
      const balance = await tx.creditBalance.update({
        where: { userId },
        data: {
          balance: { decrement: amount },
          lifetimeUsed: { increment: amount },
        },
      });

      await tx.creditTransaction.create({
        data: {
          creditBalanceId: balance.id,
          userId,
          amount: -amount,
          type: CreditTransactionType.USAGE,
          description,
          metadata: metadata ? JSON.parse(JSON.stringify(metadata)) : undefined,
        },
      });

      await tx.usageLog.create({
        data: {
          userId,
          action: "CREDIT_DEDUCTION",
          costCredits: amount,
          metadata: metadata ? JSON.parse(JSON.stringify(metadata)) : undefined,
        },
      });

      return balance;
    });

    logger.info(`Deducted ${amount} credits from user ${userId}. New balance: ${updated.balance}`, "CreditService");
    return updated.balance;
  }

  static async addCredits(
    userId: string,
    amount: number,
    type: CreditTransactionType,
    description: string,
    metadata?: Record<string, unknown>
  ): Promise<number> {
    const updated = await prisma.$transaction(async (tx) => {
      const balance = await tx.creditBalance.upsert({
        where: { userId },
        create: {
          userId,
          balance: amount,
          lifetimeGranted: amount,
          lifetimeUsed: 0,
        },
        update: {
          balance: { increment: amount },
          lifetimeGranted: { increment: amount },
        },
      });

      await tx.creditTransaction.create({
        data: {
          creditBalanceId: balance.id,
          userId,
          amount,
          type,
          description,
          metadata: metadata ? JSON.parse(JSON.stringify(metadata)) : undefined,
        },
      });

      return balance;
    });

    logger.info(`Added ${amount} credits to user ${userId}. New balance: ${updated.balance}`, "CreditService");
    return updated.balance;
  }
}
