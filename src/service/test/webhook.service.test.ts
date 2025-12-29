/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  ERR_INVALID_WEBHOOK_SIGNATURE,
  ERR_WEBHOOK_OUTDATED,
  ERR_WEBHOOK_SECRET_NOT_DEFINED,
  ValidateWebhookSignature,
} from "../webhook.service";

// CONSTANTS
const secret = "123456789";
const timestamp = Math.floor(new Date().getTime() / 1000);
const payload = "{key: 'value'}";
const timeSkew = 60 * 5;

const hasher = new Bun.CryptoHasher("sha256", secret);
hasher.update(timestamp + "." + payload);
const signature = hasher.digest("hex");

describe("TestService_ValidateWebhookSignature", () => {
  test("should return no error if signature is valid", async () => {
    const err = ValidateWebhookSignature(
      signature,
      payload,
      timestamp,
      timeSkew,
      secret
    );
    expect(err).toBe(null);
  });

  test("should return error if secret is not defined", async () => {
    const err = ValidateWebhookSignature(
      signature,
      payload,
      timestamp,
      timeSkew,
      ""
    );
    expect(err).toBe(ERR_WEBHOOK_SECRET_NOT_DEFINED);
  });

  test("should return error if webhook is outdated", async () => {
    const err = ValidateWebhookSignature(
      signature,
      payload,
      timestamp - timeSkew * 2,
      timeSkew,
      secret
    );
    expect(err).toBe(ERR_WEBHOOK_OUTDATED);
  });

  test("should return error if signature is invalid", async () => {
    const err = ValidateWebhookSignature(
      "invalid-signature",
      payload,
      timestamp,
      timeSkew,
      secret
    );
    expect(err).toBe(ERR_INVALID_WEBHOOK_SIGNATURE);
  });
});
