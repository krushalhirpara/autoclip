"use client";

import React, { useEffect, useRef, useState } from "react";
import { Loader2, AlertCircle, ShieldCheck } from "lucide-react";
import { BillingInterval } from "@/core/payments/plans";

interface PayPalButtonProps {
  planId: string;
  planName?: string;
  amount?: number;
  billingInterval: BillingInterval;
  onSuccess: (data: {
    orderId: string;
    captureId?: string;
    planId: string;
    creditsAdded: number;
    newBalance: number;
  }) => void;
  onError?: (error: string) => void;
  onCancel?: () => void;
}

declare global {
  interface Window {
    paypal?: {
      Buttons: (config: {
        style?: {
          layout?: "vertical" | "horizontal";
          color?: "gold" | "blue" | "silver" | "white" | "black";
          shape?: "rect" | "pill";
          label?: "paypal" | "checkout" | "buynow" | "pay";
          height?: number;
        };
        createOrder: () => Promise<string>;
        onApprove: (data: { orderID: string; payerID?: string }) => Promise<void>;
        onCancel?: (data: Record<string, unknown>) => void;
        onError?: (err: Error) => void;
      }) => {
        render: (container: HTMLElement) => Promise<void>;
      };
    };
  }
}

export const PayPalButton: React.FC<PayPalButtonProps> = ({
  planId,
  billingInterval,
  onSuccess,
  onError,
  onCancel,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sdkLoading, setSdkLoading] = useState(true);
  const [sdkError, setSdkError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [isConfigured, setIsConfigured] = useState<boolean>(true);

  const logPayPalError = (err: Error) => {
    console.error("PayPal Button Error:", err);
  };

  useEffect(() => {
    let isMounted = true;

    async function loadPayPalSdk() {
      try {
        setSdkLoading(true);
        setSdkError(null);

        // Fetch public PayPal config from our backend
        const configRes = await fetch("/api/v1/payments/paypal/config");
        if (!configRes.ok) {
          throw new Error("Unable to load PayPal configuration");
        }
        const config = await configRes.json();

        if (!isMounted) return;
        setIsConfigured(config.isConfigured);

        const clientId = config.clientId || "sb"; // 'sb' is standard PayPal sandbox test fallback

        // Check if script is already present
        const scriptId = "paypal-js-sdk-script";
        let existingScript = document.getElementById(scriptId) as HTMLScriptElement | null;

        if (!existingScript) {
          existingScript = document.createElement("script");
          existingScript.id = scriptId;
          existingScript.src = `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(
            clientId
          )}&currency=USD&intent=capture`;
          existingScript.async = true;

          await new Promise<void>((resolve, reject) => {
            if (!existingScript) return;
            existingScript.onload = () => resolve();
            existingScript.onerror = () => reject(new Error("Failed to load PayPal SDK script"));
            document.body.appendChild(existingScript);
          });
        } else if (!window.paypal) {
          // Wait for existing script to finish loading
          await new Promise<void>((resolve) => {
            const checkInterval = setInterval(() => {
              if (window.paypal) {
                clearInterval(checkInterval);
                resolve();
              }
            }, 100);
            setTimeout(() => {
              clearInterval(checkInterval);
              resolve();
            }, 5000);
          });
        }

        if (!isMounted) return;

        if (window.paypal && containerRef.current) {
          containerRef.current.innerHTML = "";

          const buttons = window.paypal.Buttons({
            style: {
              layout: "vertical",
              color: "gold",
              shape: "rect",
              label: "checkout",
              height: 44,
            },
            createOrder: async () => {
              setProcessing(true);
              try {
                const res = await fetch("/api/v1/payments/paypal/create-order", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ planId, billingInterval }),
                });

                const data = await res.json();
                if (!res.ok || !data.orderId) {
                  throw new Error(data.error || "Failed to create order on server");
                }

                return data.orderId;
              } catch (err) {
                setProcessing(false);
                const errMsg = err instanceof Error ? err.message : "Error initiating checkout";
                if (onError) onError(errMsg);
                throw err;
              }
            },
            onApprove: async (data: { orderID: string }) => {
              setProcessing(true);
              try {
                const captureRes = await fetch("/api/v1/payments/paypal/capture-order", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ orderId: data.orderID }),
                });

                const captureData = await captureRes.json();

                if (!captureRes.ok || !captureData.success) {
                  throw new Error(captureData.error || "Payment verification failed");
                }

                setProcessing(false);
                onSuccess(captureData);
              } catch (err) {
                setProcessing(false);
                const errMsg = err instanceof Error ? err.message : "Error capturing payment";
                if (onError) onError(errMsg);
              }
            },
            onCancel: () => {
              setProcessing(false);
              if (onCancel) onCancel();
            },
            onError: (err: Error) => {
              setProcessing(false);
              logPayPalError(err);
              if (onError) onError(err.message || "PayPal checkout encountered an error");
            },
          });

          await buttons.render(containerRef.current);
        }
        setSdkLoading(false);
      } catch (err) {
        if (!isMounted) return;
        setSdkLoading(false);
        const msg = err instanceof Error ? err.message : "Unable to load PayPal";
        setSdkError(msg);
      }
    }

    loadPayPalSdk();

    return () => {
      isMounted = false;
    };
  }, [planId, billingInterval, onSuccess, onError, onCancel]);

  const handleDevMockCheckout = async () => {
    setProcessing(true);
    try {
      // 1. Create order
      const orderRes = await fetch("/api/v1/payments/paypal/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId, billingInterval }),
      });
      const orderData = await orderRes.json();
      if (!orderRes.ok) throw new Error(orderData.error);

      // 2. Capture order
      const captureRes = await fetch("/api/v1/payments/paypal/capture-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: orderData.orderId }),
      });
      const captureData = await captureRes.json();
      if (!captureRes.ok) throw new Error(captureData.error);

      setProcessing(false);
      onSuccess(captureData);
    } catch (err) {
      setProcessing(false);
      if (onError) onError(err instanceof Error ? err.message : "Mock checkout failed");
    }
  };

  return (
    <div className="w-full space-y-3">
      {processing && (
        <div className="flex flex-col items-center justify-center rounded-xl bg-purple-50 p-4 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800/40">
          <Loader2 className="h-6 w-6 animate-spin text-[#7C5CFC]" />
          <p className="mt-2 text-xs font-semibold text-purple-900 dark:text-purple-300">
            Securely processing PayPal transaction & activating credits...
          </p>
        </div>
      )}

      {sdkLoading && !processing && (
        <div className="flex h-11 w-full items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800">
          <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
        </div>
      )}

      {sdkError && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-600 dark:border-red-900/30 dark:bg-red-950/20 dark:text-red-400">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{sdkError}</span>
          </div>
          {!isConfigured && (
            <button
              onClick={handleDevMockCheckout}
              className="mt-2 text-xs font-bold underline hover:text-red-800"
            >
              Simulate Test Payment (Dev Sandbox Mode)
            </button>
          )}
        </div>
      )}

      <div
        ref={containerRef}
        className={`w-full min-h-[44px] ${processing ? "pointer-events-none opacity-50" : ""}`}
      />

      <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-400">
        <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
        <span>Official PayPal Business Encrypted Checkout (USD)</span>
      </div>
    </div>
  );
};
