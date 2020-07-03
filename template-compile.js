let root = this;
const {s, e, ext} = require('./template-constants');

root.delimiter = require('./template-delimiter');
root.replace = require('./template-replace');

module.exports = exports = function templateCompileHandler ( ctx ) {
  var self = this;
  var out = self.content;
  var piece = null;
  var delimitation = null;
  var content = null;
  var start = s;
  var end = e;

  while ( root.delimiter( out )[0] !== -1 ) {
    delimitation = root.delimiter( out );
    content = delimitation[2];
    delimitation[2] = root.replace.call(self, content, ctx );

    out = out.replace( start + content + end, delimitation[2] );
  }

  return out;
};
