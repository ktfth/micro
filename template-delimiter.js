const {s, e, mic} = require('./template-constants');

module.exports = exports = function templateDelimiterHandler ( content, pointer ) {
  var out = [];
  var start = s;
  var end = e;
  var pointer = ( pointer || 0 );

  out.push( content.indexOf( start, pointer ) );
  out.push( content.indexOf( end, pointer + 1 ) );
  out.push( content.slice( out[0] + start.length, out[1] ) );

  return out;
};
