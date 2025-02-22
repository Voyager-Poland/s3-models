const fs = require('fs');
const path = require('path');
const { updatePackageJson } = require('./update-package-json-functions');
const { moveDir, copyFiles } = require('./file-operations');

const distPath = path.join(__dirname, '../dist');
const packageJsonPath = path.join(distPath, 'package.json');
const packageJson = require(packageJsonPath);

console.log('Starting update-package-json script');
console.log('distPath:', distPath);
console.log('packageJsonPath:', packageJsonPath);

// Update package.json
updatePackageJson(packageJsonPath, packageJson);

// Ensure directories exist before moving
const fesm2022Src = path.join(distPath, 'fesm2022');
const libSrc = path.join(distPath, 'lib');
console.log('Checking if directories exist before moving:');
console.log('fesm2022:', fs.existsSync(fesm2022Src));
console.log('lib:', fs.existsSync(libSrc));

// Log contents of dist directory
console.log('Contents of dist directory before moving:');
console.log(fs.readdirSync(distPath));

// Move directories to root of dist
moveDir(fesm2022Src, fesm2022Src);
moveDir(libSrc, libSrc);

// Ensure directories exist after moving
console.log('Checking if directories exist after moving:');
console.log('fesm2022:', fs.existsSync(fesm2022Src));
console.log('lib:', fs.existsSync(libSrc));

// Log contents of dist directory
console.log('Contents of dist directory after moving:');
console.log(fs.readdirSync(distPath));

// Copy LICENSE, README.md, index.d.ts, and public-api.d.ts to dist
const filesToCopy = ['LICENSE', 'README.md', 'index.d.ts', 'public-api.d.ts'];
filesToCopy.forEach(file => {
  const srcPath = path.join(__dirname, file);
  if (fs.existsSync(srcPath)) {
    copyFiles([file], __dirname, distPath);
  } else {
    console.warn(`File ${file} does not exist and will not be copied.`);
  }
});

console.log('Finished update-package-json script');
