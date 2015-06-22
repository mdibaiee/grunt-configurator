import chalk from 'chalk';
import fs from 'fs';
import askFiles from './file-plugins';
import path from 'path';
import suspend from 'suspend';
import prompt from 'prompt';

const resume = suspend.resume;

export default suspend(function* (plugin, cb) {
  const dir = path.resolve(`plugins/${plugin}.json`);

  const content = yield fs.readFile(dir, resume());

  const info = JSON.parse(content);
  console.log(chalk.cyan.bold(`Configuring Plugin ${info.name}`));

  const config = {};

  askConfig(info, config, suspend(function* askAgain() {
    console.log(chalk.cyan(`[${info.name}] Do you want to add another target?`));
    const answer = yield prompt.get({
      properties: {
        next: {
          type: 'string',
          pattern: /yes|no/,
          default: 'no'
        }
      }
    }, resume());

    if (answer.next === 'yes') {
      askConfig(info, config, suspend(askAgain));
    } else {
      cb(null, {
        [info.name]: config
      });
    }
  }));
});

const askConfig = suspend(function* askConfig(info, config, cb) {
  console.log(chalk.cyan.bold(`[${info.name}] Enter target name`));

  const answer = yield prompt.get({
    properties: {
      target: {
        type: 'string',
        default: 'main'
      }
    }
  }, resume());

  const record = config[answer.target] = {};

  if (info.files) {
    let files = yield askFiles(info, resume());

    record.files = files;
  }

  cb(null, record);
});
