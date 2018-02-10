'use strict';
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  writing() {
    const javaSrcPath = this.config.get('base.groupId').replace('.', '/');
    this.fs.copyTpl(
      this.templatePath('ControllerTemplate.java'),
      this.destinationPath(this.config.get('base.artifactId') + '-api/src/main/java/' + javaSrcPath + '/api/WelcomeController.java'),
      {
        groupId: this.config.get('base.groupId'),
        message: this.options.message
      }
    );
  }
};
