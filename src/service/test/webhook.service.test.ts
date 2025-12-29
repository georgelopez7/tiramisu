import { ValidateWebhookSignature } from "../webhook.service";

describe("TestService_ValidateWebhookSignature", () => {
  const mockSecret = "secret";
  process.env.WEBHOOK_SECRET = mockSecret;

  const mockPayload = '{"id": 1}';
  const mockTimestamp = Date.now() / 1000;

  const hasher = new Bun.CryptoHasher("sha256", mockSecret);
  hasher.update(mockTimestamp + "." + mockPayload);
  const mockSignature = hasher.digest("hex");

  test("should return true if signature is valid", async () => {
    const result = await ValidateWebhookSignature(
      mockSignature,
      mockPayload,
      mockTimestamp
    );
    expect(result).toBe(true);
  });

  test("should return false if signature is invalid", async () => {
    const result = await ValidateWebhookSignature(
      "invalid",
      mockPayload,
      mockTimestamp
    );
    expect(result).toBe(false);
  });

  test("should return false if timestamp is too old", async () => {
    const result = await ValidateWebhookSignature(
      mockSignature,
      mockPayload,
      1234567890,
      0
    );
    expect(result).toBe(false);
  });
});
