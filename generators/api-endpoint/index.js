'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');

module.exports = class extends Generator {
  prompting() {
    const prompts = [];

    if (!this.options.package) {
      prompts.push({
        type: 'input',
        name: 'package',
        message: 'Please enter the ' + chalk.blue('package') + ' the class will be created in'
      });
    }
    if (!this.options.path) {
      prompts.push({
        type: 'input',
        name: 'path',
        message: 'Please enter the ' + chalk.blue('path') + ' to the endpoint'
      });
    }
    if (!this.options.package) {
      prompts.push({
        type: 'input',
        name: 'message',
        message: 'Please enter the ' + chalk.blue('message') + ' displayed to the user'
      });
    }

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {
    const javaSrcPath = this.options.package.split('.').join('/');
    this.fs.copyTpl(
      this.templatePath('ControllerTemplate.java'),
      this.destinationPath(this.options.module + '/src/main/java/' + javaSrcPath + '/' + this.options.className + '.java'),
      {
        package: this.options.package,
        path: this.options.path,
        message: this.options.message
      }
    );
    this.fs.copyTpl(
      this.templatePath('ControllerITTemplate.java'),
      this.destinationPath(this.options.module + '/src/test/java/' + javaSrcPath + '/' + this.options.className + 'IT.java'),
      {
        package: this.options.package,
        path: this.options.path,
        message: this.options.message
      }
    );
  }
};
