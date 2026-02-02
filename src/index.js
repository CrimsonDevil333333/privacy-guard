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

// Root info
fastify.get('/', async () => {
  return {
    name: 'PrivacyGuard API',
    version: '1.0.0',
    status: 'Operational 🛡️',
    endpoints: {
      anonymize: 'POST /anonymize'
    }
  };
});

// Anonymization endpoint
fastify.post('/anonymize', async (request, reply) => {
  const { text, detailed, placeholder } = request.body || {};

  if (!text) {
    return reply.status(400).send({ error: 'No text provided for anonymization.' });
  }

  const start = process.hrtime();
  const result = scrub(text, { detailed, placeholder, verbose: true });
  const end = process.hrtime(start);
  
  const processingTimeMs = (end[0] * 1000 + end[1] / 1000000).toFixed(2);

  console.log(chalk.green(`🛡️  Processed request in ${processingTimeMs}ms`));

  return {
    originalLength: text.length,
    scrubbedLength: result.length,
    processingTimeMs,
    result
  };
});

// Start the engine
const start = async () => {
  try {
    await fastify.listen({ port: PORT, host: '0.0.0.0' });
    console.log('\n' + chalk.bold.cyan('🛡️  PRIVACY-GUARD API v1.0.0'));
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
