/**
 * This class is created to separate storage to application logic. This function must ensure
 * that there is no buffer overflow.
 */
function StorageManager(){
	Project.Data._rawsections = {};
}

/**
 * Get cbsection with first level sections.  
 * @return {CBSection} section with first level sections.
 */
StorageManager.prototype.getRoot = function() {
	return Project.Data._rawsections['1'];
};

/**
 * Set cbsection with first level sections.  
 * @param {CBSection} section section with first level sections.
 */
StorageManager.prototype.setRoot = function(section) {
	Project.Data._rawsections['1'] = section;
	return '1';
};
/**
 * Get cbsection from storage with cbsectionid. 
 * @param  {String} cbsecid Section identifier
 * @return {CBSection}         CloudBook section
 */
StorageManager.prototype.getSectionById = function(cbsecid) {
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


/**
 * This namespace has singleton instance of StorageManager class
 * @namespace controller
 * @memberOf application
 */
CBUtil.createNameSpace('application.storagemanager');
application.storagemanager = CBUtil.singleton(StorageManager);