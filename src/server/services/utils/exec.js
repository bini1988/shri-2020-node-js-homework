const { exec } = require('child_process');

/**
 * @param {string} cmd Исполняемая команда
 * @param {string} cwd Рабочая директория
 */
function execute(cmd, cwd) {
  return new Promise((resolve, reject) => {
    exec(cmd, { cwd }, (error, stdout, stderr) => {
      if (error) { reject(error); }
      resolve(stdout || stderr);
    });
  });
}

module.exports = execute;
