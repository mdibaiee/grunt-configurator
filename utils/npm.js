import chalk from 'chalk';
import child from 'child_process';
import Progress from './progress';
import suspend from 'suspend';

const resume = suspend.resume;

export default suspend(function* ({save, plugins, cwd}, cb) {
  console.log(chalk.green.bold('Installing NPM modules  '),
               chalk.gray(plugins.join(', ')));

  const progress = new Progress();

  yield child.exec(`npm i --${save} ${plugins.join(' ')}`, {cwd}, resume());
  console.log(chalk.gray.italic('Success'));

  progress.destroy();

  cb(null);
});
