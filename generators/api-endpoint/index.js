'use strict';
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
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
      this.destinationPath(this.options.testModule + '/src/test/java/' + javaSrcPath + '/' + this.options.className + 'IT.java'),
      {
        package: this.options.package,
        path: this.options.path,
        message: this.options.message
      }
    );
  }
};
