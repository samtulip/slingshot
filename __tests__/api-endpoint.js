'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-slingshot:app', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/api-endpoint'))
      .withOptions({
        package: 'my.path',
        path: 'pathy',
        message: 'hello',
        className: 'MyController',
        module: 'api'
      });
  });

  it('creates files', () => {
    assert.file(['api/src/main/java/my/path/MyController.java']);
  });
});
