var util = require('util');

function CBMultimedia(objectdata){
  objectdata = typeof objectdata !== 'undefined' ? objectdata : {position : [200,200], size:[0,0]};
  objectdata.idtype = typeof objectdata.idtype !== 'undefined' ? objectdata.idtype : "CBMultimedia";
  ImageBox.super_.call(this,objectdata);
}
//@ sourceURL=cbmultimedia.js