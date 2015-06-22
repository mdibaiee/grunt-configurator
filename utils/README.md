grunt-configurator
=====

Configuring Grunt takes a lot of developers' time, which includes searching online
for the correct option name, correct syntax, etc.

grunt-configurator is a cli tool to configure Grunt for your project by answering
simple questions about your configuration.

Usage
====

Install using npm
```bash
npm install -g grunt-configurator

grunt-configurator myProjectFolder --plugins contrib-copy babel
```

Plugin maintainers
====
If you are a Grunt plugin maintainer, don't worry! Integrating your plugin with
grunt-configurator is extremely easy.

A sample plugin configuration for `grunt-babel`:
```json
{
  "name": "babel",
  "files": true,
  "options": [
    "sourceMap",
    "modules"
  ]
}
```

Create a pull request, we'll review and merge as soon as possible.

Bugs
====
We're still in alpha, found a bug? Please fill an issue.
