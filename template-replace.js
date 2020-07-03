module.exports = exports = function templateReplaceHandler ( content, ctx ) {
  var self = this;
  var out = content;
  var keys = Object.keys( ctx );

  function keyMapHandler ( item, idx, c ) {
    var that = this;
    var rItem = new RegExp(item, 'g');
    var matches = [...out.matchAll(rItem)];
    var s = 0;
    var end = 0;

    if (matches !== null) {
      for (var i = 0; i < matches.length; i += 1) {
        out = out.replace( item, that[ item ] );
      }
    }
  }
  keys.map( keyMapHandler.bind( ctx ) );

  return out;
};
