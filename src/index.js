#!/usr/bin/env node

/**
 * PrivacyGuard API 🛡️
 * High-performance PII anonymization service.
 */

require('dotenv').config();
const fastify = require('fastify')({ logger: false });
const chalk = require('chalk');
const { scrub } = require('./scrubber');
const { redactIntent } = require('./ai-redactor');
const { sendWebhook } = require('./webhooks');

const PORT = process.env.PORT || 3000;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const ALERT_WEBHOOK_URL = process.env.ALERT_WEBHOOK_URL;

// Internal Stats
const stats = {
  totalRequests: 0,
  totalScrubbedItems: 0,
  startTime: Date.now()
};

// Root info
fastify.get('/', async () => {
  return {
    name: 'PrivacyGuard API',
    version: '1.3.0',
    status: 'Operational 🛡️',
    uptime: `${((Date.now() - stats.startTime) / 1000).toFixed(0)}s`,
    features: {
      aiRedaction: !!GEMINI_API_KEY,
      webhooks: !!ALERT_WEBHOOK_URL
    }
  };
});

// Anonymization endpoint
fastify.post('/anonymize', async (request, reply) => {
  const { text, mode, placeholder, useAI } = request.body || {};

  if (!text) {
    return reply.status(400).send({ error: 'No text provided.' });
  }

  const start = process.hrtime();
  
  // 1. Regex Scrubbing (Fast)
  let { result, count, types } = scrub(text, { mode, placeholder });

  // 2. Optional AI Intent Redaction
  if (useAI && GEMINI_API_KEY) {
    result = await redactIntent(result, GEMINI_API_KEY);
  }

  const end = process.hrtime(start);
  const processingTimeMs = (end[0] * 1000 + end[1] / 1000000).toFixed(2);

  // 3. Stats & Alerts
  stats.totalRequests++;
  stats.totalScrubbedItems += count;

  if (count > 0 && ALERT_WEBHOOK_URL) {
    sendWebhook(ALERT_WEBHOOK_URL, { count, types, processingTimeMs });
  }

  return {
    originalLength: text.length,
    scrubbedLength: result.length,
    processingTimeMs,
    scrubbedCount: count,
    detectedTypes: types,
    result
  };
});

const start = async () => {
  try {
    await fastify.listen({ port: PORT, host: '0.0.0.0' });
    console.log('\n' + chalk.bold.cyan('🛡️  PRIVACY-GUARD API v1.3.0'));
    console.log(`${chalk.blue('● Status:')} ${chalk.green('Ready')}`);
    console.log(`${chalk.blue('● AI    :')} ${GEMINI_API_KEY ? chalk.green('Enabled') : chalk.dim('Disabled')}`);
    console.log(`${chalk.blue('● Alerts:')} ${ALERT_WEBHOOK_URL ? chalk.green('Active') : chalk.dim('None')}\n`);
  } catch (err) {
    process.exit(1);
  }
};

start();
