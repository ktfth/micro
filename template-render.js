const templateRunHandler = require('./template-run');
const templateCompileHandler = require('./template-compile');

module.exports = exports = function templateRenderHandler ( ctx, expression ) {
  var self = this;
  var input = templateRunHandler.call( self, ctx );
  var ctx = { content: expression };
  var out = templateCompileHandler.call( ctx, input );

  return out;
};
