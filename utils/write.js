import suspend from 'suspend';
import fs from 'fs';

const resume = suspend.resume;

export default suspend(function* (json, plugins, tasks, dir) {
  plugins = plugins.map(plugin => `grunt.loadNpmTask("${plugin}")`);

  json = JSON.stringify(json, undefined, 2)
             .split('\n').slice(1).map(line => '  ' + line).join('\n');

  tasks = tasks.map(task => `grunt.registerTask("${task.name}", ["${task.tasks.join('", "')}"])`);

  const content = `module.exports = function(grunt) {
  grunt.initConfig({\n${json});

  ${plugins.join('\n  ')}

  ${tasks.join('\n  ')}
}`;

  yield fs.writeFile(dir + '/Gruntfile.js', content);

  console.log(chalk.green.bold('Wrote', dir + '/Gruntfile.js'));
});
