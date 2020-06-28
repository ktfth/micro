var root = this;
var template = null;
// core modules
var vm = require('vm');
var fs = require('fs');
var path = require('path');
var util = require('util');
// identifiers
const {s, e, ext} = require('./template-constants');

class Template {
  constructor(expression) {
    this.expression = expression;
  }

  delimiter(pointer=0) {
    return templateDelimiterHandler(this.expression, pointer);
  }

  replace(ctx) {
    return templateReplaceHandler(this.expression, ctx);
  }

  compile(ctx) {
    return template(this.expression).compile(ctx);
  }

  run(ctx) {
    return template(this.expression).run(ctx);
  }

  render(ctx, renderExpression) {
    return template(this.expression).render(ctx, renderExpression);
  }

  renderFile(filename, ctx, renderExpression) {
    return template.file(filename).render(ctx, renderExpression);
  }
}
root.Instance = Template;

const templateDelimiterHandler = require('./template-delimiter');
root.delimiter = templateDelimiterHandler;

const templateReplaceHandler = require('./template-replace');
root.replace = templateReplaceHandler;

const templateCompileHandler = require('./template-compile');

const templateRunHandler = require('./template-run');

const templateRenderHandler = require('./template-render');

const templateMainHandler = require('./template-main');
template = templateMainHandler;

const templateFileHandler = require('./template-file');
root.file = templateFileHandler;

// static methods
template.Instance = root.Instance;
template.delimiter = root.delimiter;
template.replace = root.replace;
template.file = root.file;

module.exports = exports = template;
