const fs = require('fs');
const path = require('path');

const packageJsonPath = path.join(__dirname, '../dist/package.json');
const packageJson = require(packageJsonPath);

const updatedPackageJson = {
  ...packageJson,
  files: [
    "dist",
    "dist/package.json",
    "README.md",
    "LICENSE"
  ],
  repository: {
    type: "git",
    url: "git+https://github.com/Voyager-Poland/s3-models.git"
  },
  author: "Andrzej Świstowski <andrzej.swistowski@voyager.pl>",
  license: "MIT"
};

fs.writeFileSync(packageJsonPath, JSON.stringify(updatedPackageJson, null, 2));
