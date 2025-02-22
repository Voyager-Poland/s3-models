const fs = require('fs');

const updatePackageJson = (packageJsonPath, packageJson) => {
  console.log('Updating package.json at:', packageJsonPath);
  const updatedPackageJson = {
    ...packageJson,
    files: [
      "fesm2022",
      "lib"
    ]
  };

  fs.writeFileSync(packageJsonPath, JSON.stringify(updatedPackageJson, null, 2));
  console.log('package.json updated successfully');
};

module.exports = { updatePackageJson };
