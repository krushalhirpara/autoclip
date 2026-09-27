/**
 * Input validation helpers for AutoClipp authentication and profiles
 */

/**
 * Validates whether a given phone number follows valid Indian mobile number format.
 * Accepts:
 * - 10-digit number starting with 6, 7, 8, 9 (e.g. 9876543210)
 * - +91 / 91 / 0 prefixed 10-digit numbers (e.g. +91 98765 43210, +91-9876543210, 09876543210)
 */
export function isValidIndianMobile(phone: string): boolean {
  if (!phone || typeof phone !== "string") return false;
  const cleaned = phone.trim().replace(/[\s\-\(\)]/g, "");
  return /^(?:\+?91|0)?[6-9]\d{9}$/.test(cleaned);
}

/**
 * Normalizes an Indian mobile number to standard "+91 XXXXX XXXXX" format.
 */
export function normalizeIndianMobile(phone: string): string {
  if (!phone) return "";
  const cleaned = phone.trim().replace(/[\s\-\(\)]/g, "");

  if (/^[6-9]\d{9}$/.test(cleaned)) {
    return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
  }
  if (/^\+91[6-9]\d{9}$/.test(cleaned)) {
    const num = cleaned.slice(3);
    return `+91 ${num.slice(0, 5)} ${num.slice(5)}`;
  }
  if (/^91[6-9]\d{9}$/.test(cleaned)) {
    const num = cleaned.slice(2);
    return `+91 ${num.slice(0, 5)} ${num.slice(5)}`;
  }
  if (/^0[6-9]\d{9}$/.test(cleaned)) {
    const num = cleaned.slice(1);
    return `+91 ${num.slice(0, 5)} ${num.slice(5)}`;
  }
  return phone.trim();
}
