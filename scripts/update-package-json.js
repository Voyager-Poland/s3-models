const fs = require('fs');
const path = require('path');

const distPath = path.join(__dirname, '../dist');
const packageJsonPath = path.join(distPath, 'package.json');
const packageJson = require(packageJsonPath);

// Update package.json
const updatedPackageJson = {
  ...packageJson,
  files: [
    "dist/fesm2022",
    "dist/lib"
  ]
};

// Write updated package.json
fs.writeFileSync(packageJsonPath, JSON.stringify(updatedPackageJson, null, 2));

// Move directories to root of dist
const moveDir = (src, dest) => {
  if (fs.existsSync(src)) {
    fs.renameSync(src, dest);
  }
};

moveDir(path.join(distPath, 'dist/fesm2022'), path.join(distPath, 'fesm2022'));
moveDir(path.join(distPath, 'dist/lib'), path.join(distPath, 'lib'));
