const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Define banned patterns based on DESIGN_IMPLEMENTATION_PLAN.md
const BANNED_PATTERNS = [
  /bg-indigo-\d+/g,
  /bg-purple-\d+/g,
  /bg-slate-\d+/g,
  /bg-gradient-to-[a-z]+ from-indigo-\d+/g,
  /shadow-lg/g,
  /shadow-xl/g,
  /shadow-2xl/g,
  /rounded-xl/g,
  /rounded-2xl/g,
  /rounded-3xl/g,
  /backdrop-blur/g,
  /font-bold/g,
  /font-semibold/g,
  /tracking-tight/g,
  /text-indigo-\d+/g,
  /border-indigo-\d+/g,
];

const SEARCH_DIR = path.join(__dirname, '../src');

function getAllFiles(dirPath, arrayOfFiles) {
  let dirFiles = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];
  dirFiles.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        arrayOfFiles.push(path.join(dirPath, "/", file));
      }
    }
  });
  return arrayOfFiles;
}

let driftCount = 0;
const files = getAllFiles(SEARCH_DIR);

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  let fileHasDrift = false;

  BANNED_PATTERNS.forEach(pattern => {
    const matches = content.match(pattern);
    if (matches) {
      matches.forEach(match => {
        // We might want to skip "rounded-full" since it's allowed for circular buttons, 
        // but we'll add other strict checks.
        fileHasDrift = true;
        driftCount++;
      });
    }
  });

  if (fileHasDrift) {
    console.log(`Drift found in: ${file.replace(SEARCH_DIR, 'src')}`);
  }
});

console.log(`\nTotal static drift signals found: ${driftCount}`);
if (driftCount > 0) {
  console.log('Please resolve these design drift signals to adhere to DESIGN.md.');
  // process.exit(1); // Don't fail the build yet until refactoring is complete
} else {
  console.log('No design drift signals found! Excellent job adhering to DESIGN.md.');
}
