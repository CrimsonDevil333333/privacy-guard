# PrivacyGuard API 🛡️

**PrivacyGuard** is a lightweight, high-performance API service designed to protect sensitive data by automatically identifying and scrubbing Personal Identifiable Information (PII) and API keys from text.

## 🚀 New in v1.1.0

- **Advanced Pattern Detection**: Now detects AWS keys, GitHub tokens, Slack tokens, Private keys, and more.
- **Flexible Masking Modes**: Choose how you want to hide data:
  - `redact`: Completely replace with a placeholder (default).
  - `partial`: Keep some characters for context (e.g., `s****a@example.com`).
  - `tag`: Replace with the data type (e.g., `[EMAIL]`, `[AWSACCESSKEY]`).
- **Stats & Monitoring**: New `/stats` endpoint to track request volume and scrubbed items.

## 🚀 Core Features

- **Blazing Fast**: Built on Fastify for sub-millisecond scrubbing.
- **Pi Optimized**: Extremely low footprint, perfect for Raspberry Pi or edge deployments.
- **Docker Ready**: One command to stay secure.

## 📡 API Usage

### `POST /anonymize`

**Body:**
```json
{
  "text": "My AWS key is AKIA1234567890ABCDEF",
  "mode": "tag"
}
```

**Response:**
```json
{
  "originalLength": 32,
  "scrubbedLength": 24,
  "processingTimeMs": "0.12",
  "scrubbedCount": 1,
  "detectedTypes": ["awsAccessKey"],
  "result": "My AWS key is [AWSACCESSKEY]"
}
```

### `GET /stats`
Returns global metrics for the current session.

---
*Maintained by Satyaa & Clawdy 🦞*
