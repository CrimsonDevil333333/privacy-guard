/**
 * PrivacyGuard Core Scrubber 🛡️
 * Handles the detection and replacement of PII using optimized patterns.
 */

const { KEY_PATTERNS } = require('./patterns/keys');

const PII_PATTERNS = {
  email: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
  phone: /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g,
  creditCard: /\b(?:\d{4}[ -]?){3}\d{4}\b/g,
  ssn: /\b\d{3}-\d{2}-\d{4}\b/g,
  ipv4: /\b(?:\d{1,3}\.){3}\d{1,3}\b/g,
  url: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g,
  iban: /\b[A-Z]{2}\d{2}[A-Z0-9]{11,30}\b/g,
  bsn: /\b\d{8,9}\b/g,
  ...KEY_PATTERNS
};

/**
 * Partially masks a string (e.g., satyaa@example.com -> s****a@example.com)
 * @param {string} match - The string to mask
 * @param {string} type - The type of PII
 */
function partialMask(match, type) {
  if (type === 'email') {
    const [user, domain] = match.split('@');
    return `${user[0]}${'*'.repeat(user.length - 2)}${user[user.length - 1]}@${domain}`;
  }
  if (type === 'phone' || type === 'creditCard') {
    return `${match.substring(0, 4)}${'*'.repeat(match.length - 8)}${match.substring(match.length - 4)}`;
  }
  return `${match.substring(0, 3)}****`;
}

/**
 * Anonymizes text based on recognized patterns.
 * @param {string} text - The input string to scrub.
 * @param {Object} options - Configuration for masking.
 * @returns {Object} - Result containing scrubbed text and metadata.
 */
function scrub(text, options = {}) {
  if (!text || typeof text !== 'string') return { result: text, count: 0, types: [] };

  let scrubbed = text;
  let count = 0;
  const types = new Set();
  const placeholder = options.placeholder || '[REDACTED]';
  const mode = options.mode || 'redact'; // 'redact', 'partial', 'tag'

  for (const [key, pattern] of Object.entries(PII_PATTERNS)) {
    scrubbed = scrubbed.replace(pattern, (match) => {
      count++;
      types.add(key);
      
      if (options.verbose) {
        console.log(`🛡️  Scrubbed ${key}: ${match.substring(0, 3)}...`);
      }

      if (mode === 'tag') return `[${key.toUpperCase()}]`;
      if (mode === 'partial') return partialMask(match, key);
      return placeholder;
    });
  }

  return { 
    result: scrubbed, 
    count, 
    types: Array.from(types) 
  };
}

module.exports = { scrub, PII_PATTERNS };
