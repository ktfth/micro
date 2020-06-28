module.exports = exports = function templateReplaceHandler ( content, ctx ) {
  var out = content;
  var keys = Object.keys( ctx );

  function keyMapHandler ( item, idx, c ) {
    var self = this;

    while ( out.match( item ) ) {
      out = out.replace( item, self[ item ] );
    }
  }
  keys.map( keyMapHandler.bind( ctx ) );

  return out;
};
