const fs = require('fs');
const path = require('path');

function cleanFolderRecursively(folder) {
  let files = fs.readdirSync(folder);
  if (files.length > 0) {
    files.forEach(function (file) {
      const fullPath = path.join(folder, file);
      const isDir = fs.statSync(fullPath).isDirectory();
      if (isDir) {
        cleanFolderRecursively(fullPath);
      } else {
        console.log(`[Clean] Remove ${fullPath}`);
        fs.rmSync(fullPath);
      }
    });

    // re-evaluate files; after deleting subfolder
    // we may have parent folder empty now
    files = fs.readdirSync(folder);
  }

  if (files.length == 0) {
    fs.rmdirSync(folder);
    console.log(`[Clean] Remove ${folder}`);
  }
}

const buildPath = 'dist';

console.log(`[Clean] Cleaning ${buildPath} folder...`);

if (fs.existsSync(buildPath)) cleanFolderRecursively(buildPath);

console.log(`[Clean] Successfully clean ${buildPath} folder!`);

console.log();
