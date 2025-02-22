const fs = require('fs');
const path = require('path');

const packageJsonPath = path.join(__dirname, '../dist/package.json');
const packageJson = require(packageJsonPath);

const updatedPackageJson = {
  ...packageJson,
  files: [
    "dist"
  ]
};

fs.writeFileSync(packageJsonPath, JSON.stringify(updatedPackageJson, null, 2));
