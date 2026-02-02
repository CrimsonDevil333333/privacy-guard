# PrivacyGuard API 🛡️

**PrivacyGuard** is a lightweight, high-performance API service designed to protect sensitive data by automatically identifying and scrubbing Personal Identifiable Information (PII) and API keys from text.

## 🚀 New in v1.3.0

- **🤖 Optional AI Intent Redaction**: Pass `useAI: true` to redact sensitive business intent and project names using a local or cloud Gemini model.
- **📡 Webhook Alerts**: Automatically notify your security team (or your own bot) when sensitive items like Private Keys are detected.
- **🔌 Sample Plugin Architecture**: Drop `.js` files in `/plugins` to extend detection without core changes.

## 📡 API Usage

### `POST /anonymize`
**Body:**
```json
{
  "text": "My AWS key is AKIA1234567890ABCDEF. I am working on Project X-Secret.",
  "mode": "tag",
  "useAI": true
}
```

### 🔌 Creating a Plugin
Create `plugins/my-patterns.js`:
```javascript
module.exports = {
  patterns: {
    internal_id: /\bID-[0-9]{5}\b/g
  }
};
```

---
*Maintained by Satyaa & Clawdy 🦞*
