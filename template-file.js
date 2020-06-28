const fs = require('fs');
const path = require('path');
const {ext} = require('./template-constants');

const template = require('./template-main');

module.exports = exports = function templateFileHandler ( filename ) {
  var hasExt = ~( filename.indexOf( ext ) );
  var filename = ( hasExt ) ? filename : [ filename, ext ].join('');
  var filepath = path.resolve( process.cwd(), filename );
  var content = fs.readFileSync( filepath, 'utf-8' );

  return template( content );
};
