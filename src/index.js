#!/usr/bin/env node

/**
 * PrivacyGuard API 🛡️
 * High-performance PII anonymization service.
 */

require('dotenv').config();
const fastify = require('fastify')({ logger: false });
const chalk = require('chalk');
const { scrub } = require('./scrubber');

const PORT = process.env.PORT || 3000;

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
    version: '1.1.0',
    status: 'Operational 🛡️',
    uptime: `${((Date.now() - stats.startTime) / 1000).toFixed(0)}s`,
    endpoints: {
      anonymize: 'POST /anonymize',
      stats: 'GET /stats'
    }
  };
});

// Stats endpoint
fastify.get('/stats', async () => {
  return stats;
});

// Anonymization endpoint
fastify.post('/anonymize', async (request, reply) => {
  const { text, mode, placeholder } = request.body || {};

  if (!text) {
    return reply.status(400).send({ error: 'No text provided for anonymization.' });
  }

  const start = process.hrtime();
  const { result, count, types } = scrub(text, { mode, placeholder, verbose: false });
  const end = process.hrtime(start);
  
  const processingTimeMs = (end[0] * 1000 + end[1] / 1000000).toFixed(2);

  // Update Global Stats
  stats.totalRequests++;
  stats.totalScrubbedItems += count;

  console.log(chalk.green(`🛡️  Processed request in ${processingTimeMs}ms (Items: ${count})`));

  return {
    originalLength: text.length,
    scrubbedLength: result.length,
    processingTimeMs,
    scrubbedCount: count,
    detectedTypes: types,
    result
  };
});

// Start the engine
const start = async () => {
  try {
    await fastify.listen({ port: PORT, host: '0.0.0.0' });
    console.log('\n' + chalk.bold.cyan('🛡️  PRIVACY-GUARD API v1.1.0'));
    console.log(chalk.dim('The secure bridge for PII-free data\n'));
    console.log(`${chalk.blue('● Status:')} ${chalk.green('Ready')}`);
    console.log(`${chalk.blue('● Local :')} http://localhost:${PORT}`);
    console.log(`${chalk.blue('● Vibe  :')} ${chalk.yellow('Security-First')}\n`);
  } catch (err) {
    console.error(chalk.red('❌ Failed to start PrivacyGuard:'), err);
    process.exit(1);
  }
};

start();
