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
  "text": "Contact me at satyaa@example.com or call +91-9876543210. My AWS key is AKIA1234567890ABCDEF.",
  "mode": "tag"
}
```

**Response:**
```json
{
  "originalLength": 92,
  "scrubbedLength": 78,
  "processingTimeMs": "0.18",
  "scrubbedCount": 3,
  "detectedTypes": ["email", "phone", "awsAccessKey"],
  "result": "Contact me at [EMAIL] or call [PHONE]. My AWS key is [AWSACCESSKEY]."
}
```

### Modes of Operation

| Mode | Input | Output |
|---|---|---|
| `redact` | `user@example.com` | `[REDACTED]` |
| `tag` | `user@example.com` | `[EMAIL]` |
| `partial` | `user@example.com` | `u****r@example.com` |

### `GET /stats`
Returns global metrics for the current session including request counts and total items scrubbed.

---
*Maintained by Satyaa & Clawdy 🦞*
