# PrivacyGuard API 🛡️

**PrivacyGuard** is a lightweight, high-performance API service designed to protect sensitive data by automatically identifying and scrubbing Personal Identifiable Information (PII) and API keys from text. 

Built for developers and privacy-conscious users, it acts as a secure buffer between your raw data and the outside world.

## 🌟 Why Use PrivacyGuard?

In our day-to-day digital life, we often handle sensitive data that shouldn't be shared. PrivacyGuard helps you:
- **Sanitize Logs**: Automatically strip emails and keys from application logs before they are stored or uploaded.
- **AI Safety**: Scrub PII from prompts before sending them to cloud-based LLMs (like OpenAI or Anthropic) to ensure your personal details never leave your local environment.
- **Data Sharing**: Clean datasets or documents before sharing them with colleagues or public forums.
- **Compliance**: Help meet GDPR, HIPAA, or local data protection standards by ensuring PII is handled locally.

## 🚀 New in v1.3.0

- **🤖 Optional AI Intent Redaction**: Pass `useAI: true` to redact sensitive business intent and project names using a Gemini model.
- **📡 Webhook Alerts**: Automatically notify your security team (or your own bot) when sensitive items are detected via `ALERT_WEBHOOK_URL`.
- **🔌 Plugin Architecture**: Drop custom `.js` pattern files into the `/plugins` directory to extend detection without core changes.
- **Advanced Pattern Detection**: Native support for AWS keys, GitHub tokens, Slack tokens, Private keys, IBANs, and BSNs.

## 🚀 Core Features

- **Blazing Fast**: Built on Fastify for sub-millisecond regex scrubbing.
- **Flexible Masking**: Choose how you hide data:
  - `redact`: Completely replace with a placeholder (default).
  - `partial`: Keep some characters for context (e.g., `s****a@example.com`).
  - `tag`: Replace with the data type (e.g., `[EMAIL]`).
- **Pi Optimized**: Extremely low footprint, perfect for edge deployments.
- **Docker Ready**: One command to stay secure.

## 📡 API Usage

### `POST /anonymize`

**Body:**
```json
{
  "text": "Contact me at user@example.com or call +91-9876543210. My AWS key is AKIA1234567890ABCDEF. Working on Project X-Secret.",
  "mode": "tag",
  "useAI": true
}
```

**Response:**
```json
{
  "originalLength": 115,
  "scrubbedLength": 98,
  "processingTimeMs": "0.18",
  "scrubbedCount": 3,
  "detectedTypes": ["email", "phone", "awsAccessKey"],
  "result": "Contact me at [EMAIL] or call [PHONE]. My AWS key is [AWSACCESSKEY]. Working on [INTENT_REDACTED]."
}
```

## 🔌 Creating a Plugin (Optional)

Extend the engine by creating `plugins/my-patterns.js`:

```javascript
module.exports = {
  patterns: {
    internal_id: /\bID-[0-9]{5}\b/g,
    custom_ticket: /\bTICKET-[0-9]{4}\b/g
  }
};
```

## 🛠️ Integration Guide

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

### **JavaScript/Node.js Integration**
```javascript
const scrubData = async (text) => {
  const res = await fetch('http://localhost:3000/anonymize', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, mode: 'partial' })
  });
  const data = await res.json();
  return data.result;
};
```

## 📱 Day-to-Day Examples

1. **Before posting to a forum**: 
   *Input*: "My server IP is 192.168.1.1 and my email is dev@example.com"
   *Output*: "My server IP is [IPV4] and my email is [EMAIL]"

2. **Cleaning a config file**: 
   *Input*: "aws_key=AKIAJS72EXAMPLE"
   *Output*: "aws_key=[AWSACCESSKEY]"

---
*Maintained by Satyaa & Clawdy 🦞*
