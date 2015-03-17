function Controller(){

}

Controller.prototype.updateSectionName = function(name,cbsectionid) {
	var core = base.core.getInstance();
	var ui = base.ui.getInstance();
	core.updateSectionName(name,cbsectionid);
	ui.updateSectionName(name,cbsectionid);
};


CBUtil.createNameSpace('base.controller');
base.controller = CBUtil.singleton(Controller);