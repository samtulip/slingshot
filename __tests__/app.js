'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const cheerio = require('cheerio');
const fs = require('fs');
const properties = {
  groupId: 'com.test',
  artifactId: 'test',
  javaVersion: '1.8'
};

describe('generator-slingshot:app', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts(properties);
  });

  it('creates files', () => {
    assert.file(['pom.xml']);
    const $ = cheerio.load(
      fs.readFileSync('pom.xml'), {
        xmlMode: true
      });
    assert.equal($('groupId').text(), properties.groupId, 'Group ID not successfully inserted');
    assert.equal($('artifactId').text(), properties.artifactId + '-parent', 'Artifact ID ID not successfully inserted');
    $('properties').children().each(function (index, element) {
      if (index === 0 || index === 1) {
        assert.equal($(element).text(), properties.javaVersion, 'Java Version not successfully inserted on ' + element.name);
      }
    });
  });
});
