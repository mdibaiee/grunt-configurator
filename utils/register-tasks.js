import suspend from 'suspend';
import chalk from 'chalk';
import prompt from 'prompt';
import normalize from './normalize';

const resume = suspend.resume;

export default suspend(function* (cb) {
  const tasks = [];

  ask(tasks, cb);
});

const ask = suspend(function* (tasks, cb) {
  console.log(chalk.cyan('Task properties'));

  let task = yield prompt.get(['name', 'tasks'], resume());

  normalize(task, {
    tasks: 'list'
  });
  tasks.push(task);

  console.log(chalk.cyan('Do you want to register another task?'));
  const answer = yield prompt.get({
    properties: {
      next: {
        default: 'no'
      }
    }
  }, resume());

  if (answer.next === 'yes') {
    ask(tasks, cb);
  } else {
    cb(null, tasks);
  }
});
