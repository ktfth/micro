const templateCompileHandler = require('./template-compile');
const templateRunHandler = require('./template-run');
const templateRenderHandler = require('./template-render');

module.exports = exports = function templateMainHandler ( content ) {
  var self = {};
  var ctx = {};

  ctx.content = content;

  self.compile = templateCompileHandler.bind( ctx );
  self.run = templateRunHandler.bind( ctx );
  self.render = templateRenderHandler.bind( ctx );

  return self;
};
