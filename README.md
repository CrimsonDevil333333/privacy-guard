# PrivacyGuard API 🛡️

**PrivacyGuard** is a lightweight, high-performance API service designed to protect sensitive data by automatically identifying and scrubbing Personal Identifiable Information (PII) and API keys from text. 

Built for developers and privacy-conscious users, it acts as a secure buffer between your raw data and the outside world.

## 🌟 Why Use PrivacyGuard?

In our day-to-day digital life, we often handle sensitive data that shouldn't be shared. PrivacyGuard helps you:
- **Sanitize Logs**: Automatically strip emails and keys from application logs before they are stored or uploaded.
- **AI Safety**: Scrub PII from prompts before sending them to cloud-based LLMs (like OpenAI or Anthropic) to ensure your personal details never leave your local environment.
- **Data Sharing**: Clean datasets or documents before sharing them with colleagues or public forums.
- **Compliance**: Help meet GDPR, HIPAA, or local data protection standards by ensuring PII is handled locally.

## 🚀 New in v1.1.0

- **Advanced Pattern Detection**: Now detects AWS keys, GitHub tokens, Slack tokens, Private keys, IBANs, and BSNs.
- **Flexible Masking Modes**: Choose how you want to hide data (`redact`, `partial`, or `tag`).
- **Stats & Monitoring**: New `/stats` endpoint to track processed volume.

## 🚀 Core Features

- **Blazing Fast**: Built on Fastify for sub-millisecond scrubbing.
- **Pi Optimized**: Extremely low footprint, perfect for Raspberry Pi or edge deployments.
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

## 🛠️ Integration Guide

You can easily integrate PrivacyGuard into your existing workflows using simple HTTP calls.

### **Python Integration**
```python
import requests

def clean_text(input_text):
    response = requests.post(
        "http://your-pi-ip:3000/anonymize",
        json={"text": input_text, "mode": "redact"}
    )
    return response.json()['result']

# Use it before logging or sending to an LLM
log_message = "Error from user satyaa@email.com: API Key 12345 leaked"
print(clean_text(log_message))
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
   *Input*: "My server IP is 192.168.1.1 and my email is dev@satyaa.com"
   *Output*: "My server IP is [IPV4] and my email is [EMAIL]"

2. **Cleaning a config file for help**: 
   *Input*: "aws_key=AKIAJS72EXAMPLE"
   *Output*: "aws_key=[AWSACCESSKEY]"

3. **Masking customer support tickets**:
   *Input*: "My phone is 9876543210"
   *Output*: "My phone is 9876****3210" (using `mode: partial`)

---
*Maintained by Satyaa & Clawdy 🦞*
