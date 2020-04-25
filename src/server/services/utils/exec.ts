import { exec } from 'child_process';

/**
 * @param {string} cmd Исполняемая команда
 * @param {string} cwd Рабочая директория
 */
export default function execute(cmd: string, cwd?: string) {
  return new Promise<string>((resolve, reject) => {
    exec(cmd, { cwd }, (error, stdout, stderr) => {
      if (error) { reject(error); }
      resolve(stdout || stderr);
    });
  });
}
