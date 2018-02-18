'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  initializing() {
    if (!this.config.get('at.config.class')) {
      this.env.error('No AT module present. Aborting! Please generate AT module with slingshot:module-at');
    }
  }

  prompting() {
    this.log(yosay('Generating a ' + chalk.yellow('Step Definition')));

    const prompts = [
      {
        type: 'input',
        name: 'package',
        message: 'Please enter a ' + chalk.blue('package'),
        default: this.config.get('base.groupId')
      },
      {
        type: 'input',
        name: 'classname',
        message: 'Please enter a ' + chalk.blue('classname')
      }
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  configuring() {

  }

  writing() {
    const javaSrcPath = this.props.package.split('.').join('/');
    this.fs.copyTpl(
      this.templatePath('StepDefinitionTemplate.java'),
      this.destinationPath(this.config.get('base.artifactId') + '-at/src/main/java/' + javaSrcPath + '/' + this.props.classname + '.java'),
      {
        package: this.props.package,
        configClassLocation: this.config.get('at.config.class'),
        className: this.props.classname
      }
    );
  }
};
