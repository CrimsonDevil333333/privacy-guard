/**
 * Key and Secret Patterns 🔐
 * Specialized regex for detecting API keys, tokens, and secrets.
 */

const KEY_PATTERNS = {
  awsAccessKey: /\bAKIA[0-9A-Z]{16}\b/g,
  awsSecretKey: /\b[a-zA-Z0-9+/]{40}\b/g, // Caution: high false positive, needs context
  githubToken: /\bgh[p|o|r|s|u]_[a-zA-Z0-9]{36,251}\b/g,
  slackToken: /\bxox[baprs]-[0-9a-zA-Z]{10,48}\b/g,
  privateKey: /-----BEGIN (RSA|OPENSSH|DSA|EC|PGP) PRIVATE KEY-----[\s\S]+?-----END \1 PRIVATE KEY-----/g,
  stripeSecret: /\bsk_live_[0-9a-zA-Z]{24}\b/g,
  genericSecret: /\b(?:key|secret|token|password|auth|api_key|apikey)(?:[\s\w-]*)[=:][\s\w-]*["']?([a-zA-Z0-9-]{16,})["']?\b/gi
};

module.exports = { KEY_PATTERNS };
