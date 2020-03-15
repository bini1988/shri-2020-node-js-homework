const { exec } = require('child_process');

module.exports = (cmd) => {
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout) => {
      if (error) { reject(error); }
      resolve(stdout);
    });
  });
};
