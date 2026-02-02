const axios = require('axios');
const chalk = require('chalk');

async function sendWebhook(url, data) {
  if (!url) return;
  
  try {
    await axios.post(url, {
      timestamp: new Date().toISOString(),
      event: 'PII_DETECTED',
      ...data
    });
    console.log(chalk.magenta(`📡 Webhook alert sent to: ${url}`));
  } catch (err) {
    console.error(chalk.red(`❌ Webhook failed:`), err.message);
  }
}

module.exports = { sendWebhook };
