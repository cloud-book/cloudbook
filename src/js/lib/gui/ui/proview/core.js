function ProView(){

}

ProView.prototype.initSectionsPro = function initSectionsPro() {
  var list = $(document.createElement('ul')).addClass("connectedSortable");
  $(Cloudbook.UI.navsections).html(list).attr('data-cbsectionid','root');
};



module.exports = ProView;