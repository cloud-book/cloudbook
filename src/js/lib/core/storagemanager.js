/**
 * This class is created to separate storage to application logic. This function must ensure
 * that there is no buffer overflow.
 * @class StorageManager
 */
function StorageManager(){
	Project.Data._rawsections = {};
	Project.Data._rawobjects = {};
}

/**
 * Get cbsection with first level sections.  
 * @return {CBSection} section with first level sections.
 */
StorageManager.prototype.getRoot = function() {
	return Project.Data._rawsections['root'];
};

/**
 * Set cbsection with first level sections.  
 * @param {CBSection} section section with first level sections.
 */
StorageManager.prototype.setRoot = function(section) {
	Project.Data._rawsections['root'] = section;
	return 'root';
};
/**
 * Get cbsection from storage with cbsectionid. 
 * @param  {String} cbsecid Section identifier
 * @return {CBSection}         CloudBook section
 */
StorageManager.prototype.getSectionById = function(cbsecid) {
	if (Project.Data._rawsections[cbsecid] === undefined){
		return undefined;
	}
	return Project.Data._rawsections[cbsecid];
};

/**
 * Set section into identifier indicate.
 * @param {CBSection} section Cloudbook section
 * @param {String} cbsecid Identifier when stored section
 */
StorageManager.prototype.setSectionById = function(section,cbsecid) {
	Project.Data._rawsections[cbsecid] = section;
	return cbsecid;
};

StorageManager.prototype.deleteSectionById = function deleteSectionById(cbsectionid) {
	delete Project.Data._rawsections[cbsectionid];
};

StorageManager.prototype.getCBObjectById = function getCBObjectById(cbobjectid) {
	if (Project.Data._rawobjects[cbobjectid] === undefined){
		return undefined;
	}
	return Project.Data._rawobjects[cbobjectid];
};

StorageManager.prototype.setCBObjectById = function setCBObjectById(cbocject,cbobjectid) {
	Project.Data._rawobjects[cbobjectid] = cbocject;
	return cbobjectid;
};

StorageManager.prototype.deleteCBObjectById = function deleteCBObjectById(cbobjectid) {
	if (Project.Data._rawobjects[cbobjectid] === undefined){
		return undefined;
	}
	Project.Data._rawobjects[cbobjectid] = null;
	delete Project.Data._rawobjects[cbobjectid];
	return cbobjectid;
};


StorageManager.prototype.getRootObject = function getRootObject() {
	return Object.keys(Project.Data._rawobjects);
};
/**
 * This namespace has singleton instance of StorageManager class
 * @namespace storagemanager
 * @memberOf application
 */
CBUtil.createNameSpace('application.storagemanager');
application.storagemanager = CBUtil.singleton(StorageManager);