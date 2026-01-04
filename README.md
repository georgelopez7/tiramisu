<p align="center">
  <img src="./public/tiramisu-banner-light.png#gh-light-mode-only" width="300">
  <img src="./public/tiramisu-banner-dark.png#gh-dark-mode-only" width="300">
</p>

Tiramisu is a simple, open-source, and lightweight HTTP request inspector. Perfect for testing webhooks, APIs, and integrations with ease.

## Docker

Checkout the Docker image [here](https://hub.docker.com/r/geloop/tiramisu)

Run with `docker-compose.yaml`

```bash
services:
  tiramisu:
    image: geloop/tiramisu:latest
    ports:
      - "3000:3000"
    environment:
      - WEBHOOK_SECRET=<webhook-secret> [OPTIONAL]
      - SIGNATURE_HEADER=<signature-header> (e.g X-Signature) [OPTIONAL]
      - TIMESTAMP_HEADER=<timestamp-header> (e.g X-Timestamp) [OPTIONAL]
    volumes:
      - tiramisu-data:/app/data

volumes:
  tiramisu-data:
```

## Webhook Testing

Tiramisu offers webhook signature validation, allowing you to verify the authenticity of incoming requests.

Set up the following environment variables:

- `WEBHOOK_SECRET`: The secret key used to sign your webhook requests.
- `SIGNATURE_HEADER`: The header key used to store the signature in the request.
- `TIMESTAMP_HEADER`: The header key used to store the timestamp in the request.

The expected signature format is: `{timestamp}.{payload}`.
