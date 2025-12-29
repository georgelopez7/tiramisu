// Validate Webhook Signature - validate the webhook signature
export const ValidateWebhookSignature = (
  signature: string,
  payload: string,
  timestamp: number,
  timeSkew: number = 60 * 5 // 5 minutes
): boolean => {
  const secret = process.env.WEBHOOK_SECRET;
  if (!secret) {
    return false;
  }

  // Unix timestamp in seconds
  const now = Math.floor(Date.now() / 1000);
  const timeDiff = now - timestamp;

  if (timeDiff > timeSkew) {
    return false;
  }

  const hasher = new Bun.CryptoHasher("sha256", secret);
  hasher.update(timestamp + "." + payload);
  const expectedSignature = hasher.digest("hex");

  if (signature !== expectedSignature) {
    return false;
  }

  return true;
};
