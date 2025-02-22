const fs = require('fs');
const path = require('path');

const moveDir = (src, dest) => {
  if (src === dest) {
    console.log(`Source and destination are the same: ${src}. Skipping move operation.`);
    return;
  }
  console.log(`Moving directory from ${src} to ${dest}`);
  console.log(`Checking if source directory exists: ${src}`);
  console.log(fs.existsSync(src));
  if (fs.existsSync(src)) {
    fs.renameSync(src, dest);
    console.log(`Moved directory from ${src} to ${dest}`);
  } else {
    console.log(`Source directory ${src} does not exist`);
  }
  console.log(`Checking if destination directory exists: ${dest}`);
  console.log(fs.existsSync(dest));
};

const copyFiles = (files, srcDir, destDir) => {
  files.forEach(file => {
    const src = path.join(srcDir, '..', file);
    const dest = path.join(destDir, file);
    console.log(`Copying file from ${src} to ${dest}`);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
      console.log(`Copied file from ${src} to ${dest}`);
    } else {
      console.log(`Source file ${src} does not exist`);
    }
  });
};

module.exports = { moveDir, copyFiles };
