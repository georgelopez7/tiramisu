export const ERR_WEBHOOK_SECRET_NOT_DEFINED = "Webhook secret is not defined";
export const ERR_WEBHOOK_OUTDATED =
  "Webhook is outdated. Please send webhook again.";
export const ERR_INVALID_WEBHOOK_SIGNATURE = "Invalid webhook signature.";

// ValidateWebhookSignature - validate the webhook signature
export const ValidateWebhookSignature = (
  signature: string,
  payload: string,
  timestamp: number,
  timeSkew: number,
  secret: string
): string | null => {
  if (!secret) {
    return ERR_WEBHOOK_SECRET_NOT_DEFINED;
  }

  // Unix timestamp in seconds
  const now = Math.floor(Date.now() / 1000);
  const timeDiff = now - timestamp;

  if (timeDiff > timeSkew) {
    return ERR_WEBHOOK_OUTDATED;
  }

  const hasher = new Bun.CryptoHasher("sha256", secret);
  hasher.update(timestamp + "." + payload);
  const expectedSignature = hasher.digest("hex");

  if (signature !== expectedSignature) {
    return ERR_INVALID_WEBHOOK_SIGNATURE;
  }

  return null;
};
