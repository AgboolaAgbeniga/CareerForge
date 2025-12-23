const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

try {
  // Get contributor names from git log
  const gitOutput = execSync('git log --format="%aN"', { encoding: 'utf8' });

  // Split by newlines, filter empty lines, trim whitespace, and get unique names
  const contributors = [...new Set(
    gitOutput
      .split('\n')
      .filter(name => name.trim() !== '')
      .map(name => name.trim())
  )];

  // Create contributors data
  const contributorsData = {
    lastUpdated: new Date().toISOString(),
    contributors: contributors
  };

  // Write to contributors.json
  const outputPath = path.join(__dirname, '..', 'contributors.json');
  fs.writeFileSync(outputPath, JSON.stringify(contributorsData, null, 2));

  console.log(`✅ Generated contributors.json with ${contributors.length} contributors`);
  console.log('Contributors:', contributors.join(', '));
} catch (error) {
  console.error('❌ Error generating contributors:', error.message);
  process.exit(1);
}