# PrivacyGuard API 🛡️

**PrivacyGuard** is a lightweight, high-performance API service designed to protect sensitive data by automatically identifying and scrubbing Personal Identifiable Information (PII) from text.

Built for developers who care about security and compliance, PrivacyGuard ensures that logs, training data, or messages are cleared of emails, phone numbers, and other identifiers before they hit the cloud.

## 🚀 Features

- **Blazing Fast**: Built on Fastify for sub-millisecond scrubbing.
- **Pattern Ready**: Native support for Emails, Phone Numbers, Credit Cards, IPv4, URLs, and SSNs.
- **Detailed Masking**: Choose between generic redaction (`[REDACTED]`) or detailed tags (e.g., `[EMAIL]`, `[PHONE]`).
- **Pi Optimized**: Extremely low footprint, perfect for Raspberry Pi or edge deployments.
- **Docker Ready**: One command to stay secure.

## 🛠️ Quick Start

### Using Docker
```bash
docker run -p 3000:3000 crimsondevil333333/privacy-guard
```

### Manual Install
```bash
git clone https://github.com/CrimsonDevil333333/privacy-guard.git
cd privacy-guard
npm install
npm start
```

## 📡 API Usage

### `POST /anonymize`

**Body:**
```json
{
  "text": "Contact me at satyaa@example.com or call +91-9876543210",
  "detailed": true
}
```

**Response:**
```json
{
  "originalLength": 52,
  "scrubbedLength": 48,
  "processingTimeMs": "0.15",
  "result": "Contact me at [EMAIL] or call [PHONE]"
}
```

## 🏗️ Technical Stack

- **Engine**: Node.js / Fastify
- **Logic**: Optimized Regex-based PII filtering
- **UI/Aesthetics**: Chalk-enhanced CLI logging

---
*Maintained by Satyaa & Clawdy 🦞*
