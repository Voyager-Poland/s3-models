const fs = require('fs');
const path = require('path');

const distPath = path.join(__dirname, '../dist');
const packageJsonPath = path.join(distPath, 'package.json');
const packageJson = require(packageJsonPath);

console.log('Starting update-package-json script');
console.log('distPath:', distPath);
console.log('packageJsonPath:', packageJsonPath);

// Update package.json
const updatedPackageJson = {
  ...packageJson,
  files: [
    "fesm2022",
    "lib",
    "LICENSE",
    "README.md",
    "index.d.ts",
    "public-api.d.ts"
  ]
};

fs.writeFileSync(packageJsonPath, JSON.stringify(updatedPackageJson, null, 2));
console.log('package.json updated successfully');

// Copy LICENSE, README.md, index.d.ts, and public-api.d.ts to dist
const filesToCopy = ['LICENSE', 'README.md', 'index.d.ts', 'public-api.d.ts'];
filesToCopy.forEach(file => {
  const src = path.join(__dirname, '..', file);
  const dest = path.join(distPath, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`Copied file from ${src} to ${dest}`);
  } else {
    console.warn(`File ${file} does not exist and will not be copied.`);
  }
});

console.log('Finished update-package-json script');

