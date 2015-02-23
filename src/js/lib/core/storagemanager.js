function StorageManager(){
	Project.Data._rawsections = {};
	Project.Data.Sections = null;
}

StorageManager.prototype.getRoot = function() {
	return Project.Data.Sections;
};

StorageManager.prototype.getSectionById = function(cbsecid) {
	return Project.Data._rawsections[cbsecid];
};

StorageManager.prototype.setSectionById = function(section,cbsecid) {
	Project.Data._rawsections[cbsecid] = section;
};
