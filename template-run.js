const vm = require('vm');
const templateCompileHandler = require('./template-compile');

module.exports = exports = function templateRunHandler ( ctx ) {
  var self = this;
  var input = templateCompileHandler.call( self, ctx );
  var ctx = vm.createContext( ctx );
  var cache = 'micro.vm';
  var VM = vm.runInContext( input, ctx, cache );

  ctx._compiled = input;

  return ctx;
};
