const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

function loadPlugins(piiPatterns) {
  const pluginsDir = path.join(__dirname, '../plugins');
  if (!fs.existsSync(pluginsDir)) return piiPatterns;

  const files = fs.readdirSync(pluginsDir);
  files.forEach(file => {
    if (file.endsWith('.js')) {
      try {
        const plugin = require(path.join(pluginsDir, file));
        if (plugin.patterns) {
          Object.assign(piiPatterns, plugin.patterns);
          console.log(chalk.blue(`🔌 Loaded plugin patterns from: ${file}`));
        }
      } catch (err) {
        console.error(chalk.red(`❌ Failed to load plugin ${file}:`), err.message);
      }
    }
  });
  return piiPatterns;
}

module.exports = { loadPlugins };
