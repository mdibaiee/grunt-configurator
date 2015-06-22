import chalk from 'chalk';
import prompt from 'prompt';
import suspend from 'suspend';
import normalize from './normalize';

const resume = suspend.resume;

prompt.message = '';
prompt.delimiter = '';

export default suspend(function* (info, cb) {
  prompt.start();

  console.log(chalk.cyan.bold(`\n[${info.name}] Options`));

  const options = yield prompt.get(info.options, resume());
  normalize(options);

  cb(null, options);
});
