const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const distPath = path.join(__dirname, '../dist');
const npmToken = process.env.NODE_AUTH_TOKEN;

if (!npmToken) {
  console.error('Error: NODE_AUTH_TOKEN is not set');
  process.exit(1);
}

console.log('Copying package.json from dist to root');
const packageJsonSrc = path.join(distPath, 'package.json');
const packageJsonDest = path.join(__dirname, '..', 'package.json');
fs.copyFileSync(packageJsonSrc, packageJsonDest);

console.log('Moving contents of dist to root');
fs.readdirSync(distPath).forEach(file => {
  const srcPath = path.join(distPath, file);
  const destPath = path.join(__dirname, '..', file);
  fs.renameSync(srcPath, destPath);
});

console.log('Publishing package to npm');
execSync('npm publish --access public', {
  stdio: 'inherit',
  env: {
    ...process.env,
    NODE_AUTH_TOKEN: npmToken
  }
});

console.log('Package published successfully');
