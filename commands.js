import cli from 'commander';
import pkg from './package.json';
import chalk from 'chalk';
import npm from './utils/npm';
import ask from './utils/ask';
import registerTasks from './utils/register-tasks';
import write from './utils/write';
import path from 'path';
import suspend from 'suspend';
import assign from 'object-assign';

const resume = suspend.resume;

cli.version(pkg.version)
   .option('-l, --list <plugins>', 'List of plugins to install and configure',
           plugins => plugins.split(' '))
   .option('--save', 'see npm --save')
   .option('--save-dev', 'see npm --save-dev')
   .option('--save-optional', 'see npm --save-optional')
   .arguments('<dir>', 'Create Gruntfile.js')
   .action(dir => {
     const cwd = path.resolve(dir);
     const save = Object.keys(cli).find(key => key.includes('save'));
     const plugins = cli.list;
     const gruntedPlugins = plugins.map(plugin => `grunt-${plugin}`);

     npm({plugins: gruntedPlugins.concat('grunt'),
          save, cwd},
          suspend(function* () {
            const config = {};

            for (let plugin of plugins) {
              const pluginConfig = yield ask(plugin, resume());

              assign(config, pluginConfig);
            }

            const tasks = yield registerTasks(resume());

            console.log(config);

            write(config, gruntedPlugins, tasks, dir);
          }));

   });

cli.parse(process.argv);
