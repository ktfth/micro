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

function templateRenderHandler ( ctx, expression ) {
  var self = this;
  var input = templateRunHandler.call( self, ctx );
  var ctx = { content: expression };
  var out = templateCompileHandler.call( ctx, input );

  return out;
}

function templateMainHandler ( content ) {
  var self = {};
  var ctx = {};

  ctx.content = content;

  self.compile = templateCompileHandler.bind( ctx );
  self.run = templateRunHandler.bind( ctx );
  self.render = templateRenderHandler.bind( ctx );

  return self;
}
template = templateMainHandler;

function templateFileHandler ( filename ) {
  var hasExt = ~( filename.indexOf( ext ) );
  var filename = ( hasExt ) ? filename : [ filename, ext ].join('');
  var filepath = path.resolve( process.cwd(), filename );
  var content = fs.readFileSync( filepath, 'utf-8' );

  return template( content );
}
root.file = templateFileHandler;

// static methods
template.Instance = root.Instance;
template.delimiter = root.delimiter;
template.replace = root.replace;
template.file = root.file;

module.exports = exports = template;
