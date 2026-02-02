# PrivacyGuard API 🛡️

**PrivacyGuard** is a lightweight, high-performance API service designed to protect sensitive data by automatically identifying and scrubbing Personal Identifiable Information (PII) and API keys from text. 

Built for developers and privacy-conscious users, it acts as a secure buffer between your raw data and the outside world.

## 🚀 New in v1.2.0

- **🔌 Plugin Architecture (Optional)**: Users can now drop custom `.js` pattern files into the `/plugins` directory to extend detection without touching the core.
- **Advanced Pattern Detection**: Native support for AWS keys, GitHub tokens, Slack tokens, IBANs, and BSNs.
- **Flexible Masking Modes**: Choose how you want to hide data (`redact`, `partial`, or `tag`).
- **Stats & Monitoring**: New `/stats` endpoint to track processed volume.

## 🚀 Core Features

- **Blazing Fast**: Built on Fastify for sub-millisecond scrubbing.
- **Pi Optimized**: Extremely low footprint, perfect for edge deployments.
- **Docker Ready**: One command to stay secure.

## 📡 API Usage

### `POST /anonymize`

**Body:**
```json
{
  "text": "Contact me at user@example.com or call +91-9876543210. My AWS key is AKIA1234567890ABCDEF.",
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

## 🛠️ Plugin Guide (Optional)

Add your own patterns by creating a file in `/plugins/my-patterns.js`:

```javascript
module.exports = {
  patterns: {
    internal_id: /\bID-[0-9]{5}\b/g
  }
};
```

PrivacyGuard will automatically load these on startup!

## 🤝 Integration Guide

You can easily integrate PrivacyGuard into your existing workflows using simple HTTP calls.

### **Python Integration**
```python
import requests

def clean_text(input_text):
    response = requests.post(
        "http://your-server-ip:3000/anonymize",
        json={"text": input_text, "mode": "redact"}
    )
    return response.json()['result']
```

---
*Maintained by Satyaa & Clawdy 🦞*
