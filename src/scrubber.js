/**
 * PrivacyGuard Core Scrubber 🛡️
 * Handles the detection and replacement of PII using optimized patterns.
 */

const PII_PATTERNS = {
  email: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
  phone: /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g,
  creditCard: /\b(?:\d{4}[ -]?){3}\d{4}\b/g,
  ssn: /\b\d{3}-\d{2}-\d{4}\b/g,
  ipv4: /\b(?:\d{1,3}\.){3}\d{1,3}\b/g,
  url: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g
};

/**
 * Anonymizes text based on recognized patterns.
 * @param {string} text - The input string to scrub.
 * @param {Object} options - Configuration for masking.
 * @returns {string} - The scrubbed text.
 */
function scrub(text, options = {}) {
  if (!text || typeof text !== 'string') return text;

  let scrubbed = text;
  const placeholder = options.placeholder || '[REDACTED]';

  for (const [key, pattern] of Object.entries(PII_PATTERNS)) {
    scrubbed = scrubbed.replace(pattern, (match) => {
      if (options.verbose) {
        console.log(`🛡️  Scrubbed ${key}: ${match.substring(0, 3)}...`);
      }
      return options.detailed ? `[${key.toUpperCase()}]` : placeholder;
    });
  }

  return scrubbed;
}

module.exports = { scrub, PII_PATTERNS };
