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
    const moduleName = this.config.get('base.artifactId') + '-at';
    $('modules').children().each(function (index, element) {
      if ($(element).text() === moduleName) {
        that.env.error('AT Module previously generated. Aborting.');
      }
    });
  }

  prompting() {
    this.log(yosay('Generating an ' + chalk.blue('AT') + '\n\n' +
        chalk.red('This will update your parent pom file to add the module!')));
  }

  configuring() {

  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('atPom.xml'),
      this.destinationPath(this.config.get('base.artifactId') + '-at/pom.xml'),
      {
        artifactId: this.config.get('base.artifactId'),
        groupId: this.config.get('base.groupId')
      }
    );

    const $ = cheerio.load(this.fs.read(this.destinationPath('pom.xml')), {
      xmlMode: true
    });
    $('modules').append('<module>' + this.config.get('base.artifactId') + '-at</module>');
    this.fs.write(this.destinationPath('pom.xml'), $.html());
  }
};
