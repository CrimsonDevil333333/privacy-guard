const { GoogleGenerativeAI } = require("@google/generative-ai");
const chalk = require('chalk');

async function redactIntent(text, apiKey) {
  if (!apiKey) return text;
  
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Act as a PII and sensitive data scrubber. Identify and redact any specific project names, personal secrets, or sensitive business intents in the following text. Replace them with [INTENT_REDACTED]. Return only the scrubbed text.
    
Text: "${text}"`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  } catch (err) {
    console.error(chalk.red("❌ AI Redaction failed:"), err.message);
    return text;
  }
}

module.exports = { redactIntent };
