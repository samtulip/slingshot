'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const cheerio = require('cheerio');

module.exports = class extends Generator {
  initializing() {
    var that = this;
    const $ = cheerio.load(this.fs.read(this.destinationPath('pom.xml')), {
      xmlMode: true
    });
    const moduleName = this.config.get('base.artifactId') + '-application';
    $('modules').children().each(function (index, element) {
      if ($(element).text() === moduleName) {
        that.env.error('API Module previously generated. Aborting.');
      }
    });
  }

  prompting() {
    this.log(yosay('Generating an ' + chalk.blue('API') + '\n\n' +
        chalk.red('This will update your parent pom file to add the module!')));
  }

  configuring() {
    this.composeWith(require.resolve('../module-at'));
    this.composeWith(require.resolve('../api-endpoint'), {
      package: this.config.get('base.groupId') + '.api',
      className: 'WelcomeController',
      path: '/',
      message: 'Welcome to my api!',
      module: this.config.get('base.artifactId') + '-application',
      testModule: this.config.get('base.artifactId') + '-at'
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('apiPom.xml'),
      this.destinationPath(this.config.get('base.artifactId') + '-application/pom.xml'),
      {
        artifactId: this.config.get('base.artifactId'),
        groupId: this.config.get('base.groupId')
      }
    );

    const javaSrcPath = this.config.get('base.groupId').replace('.', '/');

    this.fs.copyTpl(
      this.templatePath('Main.java'),
      this.destinationPath(this.config.get('base.artifactId') + '-application/src/main/java/' + javaSrcPath + '/spring/boot/Main.java'),
      {
        groupId: this.config.get('base.groupId')
      }
    );

    this.fs.copyTpl(
      this.templatePath('Config.java'),
      this.destinationPath(this.config.get('base.artifactId') + '-application/src/main/java/' + javaSrcPath + '/Config.java'),
      {
        groupId: this.config.get('base.groupId')
      }
    );

    const $ = cheerio.load(this.fs.read(this.destinationPath('pom.xml')), {
      xmlMode: true
    });
    $('modules').append('<module>' + this.config.get('base.artifactId') + '-application</module>');
    this.fs.write(this.destinationPath('pom.xml'), $.html());

    this.fs.copy(
      this.templatePath('Dockerfile'),
      this.destinationPath(this.config.get('base.artifactId') + '-application/src/main/docker/Dockerfile')
    );
  }
};
