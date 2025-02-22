const { execSync } = require('child_process');
const path = require('path');

const distPath = path.join(__dirname, '../dist');
const npmToken = process.env.NODE_AUTH_TOKEN;

if (!npmToken) {
  console.error('Error: NODE_AUTH_TOKEN is not set');
  process.exit(1);
}

console.log('Changing directory to dist');
process.chdir(distPath);

console.log('Publishing package to npm');
execSync('npm publish --access public', {
  stdio: 'inherit',
  env: {
    ...process.env,
    NODE_AUTH_TOKEN: npmToken
  }
});

console.log('Package published successfully');
