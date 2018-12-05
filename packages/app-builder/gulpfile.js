const { src, dest, series } = require('gulp');
const { resolve } = require('path');
const { spawn } = require('child_process');
const del = require('del');
const config = require('./config.json');

const APP_SHELL = './config/angular-app-shell';
const destDir = resolve(config.appShell)

function clean() {
  return del([destDir]);
}

function copy() {
  const srcDir = resolve(APP_SHELL);
  return src([`${srcDir}/**/*`, `${srcDir}/.npmrc*`])
    .pipe(dest(destDir));
}

function install() {
  return new Promise((resolve, reject) => {
    const installing = spawn('yarn install', {
      shell: true,
      cwd: destDir,
    });

    installing.stdout.on('data', (data) => {
      process.stdout.write(data);
    });
    installing.on('error', err => reject(err));
    installing.on('exit', () => {
      console.log('Installing the dependencies completed! ✅');
      resolve();
    });
  });
}

exports.clean = clean;
exports.copy = copy;
exports.install = install;
exports.default = series(clean, copy, install);