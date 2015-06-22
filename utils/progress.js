import chalk from 'chalk';

export default class Progress {
  constructor() {
    this.id = setInterval(() => {
      process.stdout.write(chalk.gray('.'));
    }, 3000);
  }

  destroy() {
    clearInterval(this.id);
  }
}
