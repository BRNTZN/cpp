var fs = require("fs");
var path = require("path");
var currentPath = path.resolve();
const { exec } = require('child_process');
console.log("Watching " + currentPath + " for changes...");
fs.watch(currentPath, function (event, filename) {
    if (event == "change" && filename) onChange(event, filename);
});

function onChange(event, filename) {
  console.log('Change detected in ' + filename);
  executeFile("script.bat").then(function(result) {
    console.log(result.stdout);
    console.error(result.stderr);
  });
}

function executeFile(file) {
  return new Promise((resolve, reject) => {
    exec(file, (err, stdout, stderr) => {
      if (err) {
        reject(err);
      } else {
        resolve({
          stdout: stdout.toString(),
          stderr: stderr.toString()
        });
      }
    });
  });
}
