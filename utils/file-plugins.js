import chalk from 'chalk';
import prompt from 'prompt';
import suspend from 'suspend';
import normalize from './normalize';

const resume = suspend.resume;

prompt.message = '';
prompt.delimiter = '';

export default function(info, cb) {
  let files = [];
  let index = 0;
  prompt.start();

  console.log(chalk.cyan.bold('\nFiles'));
  ask(info, index, files, cb);
}

const ask = suspend(function* (info, index, files, cb) {
  console.log(chalk.yellow(`[${info.name}] File Record ${index}`));

  console.log(chalk.cyan(`[${info.name}] Do you want expanded file features?`));
  let answer = yield prompt.get({
    properties: {
      expand: {
        type: 'string',
        default: 'yes',
        pattern: /yes|no/
      }
    }
  }, resume());

  let file = yield (answer.expand === 'yes'
                                                ? askExpanded(info, resume())
                                                : askSimple(info, resume()));

  files.push(file);

  console.log(chalk.cyan(`[${info.name}] Do you want to add another file record?`));
  answer = yield prompt.get({
    properties: {
      next: {
        type: 'string',
        default: 'no',
        pattern: /yes|no/
      }
    }
  }, resume());

  if (answer.next === 'yes') {
    ask(index + 1, files, cb);
  } else {
    cb(null, files);
  }
});

const askSimple = suspend(function* askSimple(info, cb) {
  console.log(chalk.cyan(`[${info.name}] File record properties`));
  let file = yield prompt.get(['src', 'dest'], resume());

  cb(null, file);
});

const askExpanded = suspend(function* askExpanded(info, cb) {
  console.log(chalk.cyan(`[${info.name}] File record properties`));

  const properties = ['src', 'dest', 'cwd', 'filter', 'flatten'];
  const file = yield prompt.get(properties, resume());

  normalize(file);
  file.expand = true;

  cb(null, file);
});
