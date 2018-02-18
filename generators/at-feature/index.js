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
    this.log(yosay('Generating a ' + chalk.yellow('feature') + '\n\n'));

    const prompts = [
      {
        type: 'input',
        name: 'feature',
        message: 'Please enter a ' + chalk.blue('feature') + ' name'
      }
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  configuring() {

  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('featureTemplate.feature'),
      this.destinationPath(this.config.get('base.artifactId') + '-at/src/test/resources/features/' + this.props.feature + '.feature'),
      {}
    );
  }
};
