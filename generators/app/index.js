'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay('Ready to get to work?'));

    const prompts = [
      {
        type: 'input',
        name: 'groupId',
        message: 'Please enter a ' + chalk.blue('group id')
      },
      {
        type: 'input',
        name: 'artifactId',
        message: 'Please enter an ' + chalk.blue('artifact id')
      },
      {
        type: 'input',
        name: 'javaVersion',
        message: 'Please enter the ' + chalk.blue('Java version')
      }
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  configuring() {
    var javaVersion = this.props.javaVersion;
    if (javaVersion > 2) {
      javaVersion = '1.' + javaVersion;
    }

    this.config.set('base.groupId', this.props.groupId);
    this.config.set('base.artifactId', this.props.artifactId);
    this.config.set('base.dockerImageName', this.props.artifactId.toLowerCase());
    this.config.set('base.javaVersion', javaVersion);
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('parentPom.xml'),
      this.destinationPath('pom.xml'),
      {
        artifactId: this.config.get('base.artifactId'),
        dockerImageName: this.config.get('base.dockerImageName'),
        groupId: this.config.get('base.groupId'),
        javaVersion: this.config.get('base.javaVersion')
      }
    );
  }
};
