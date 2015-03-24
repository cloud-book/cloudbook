/**
 * Base object to create sections . This object storate others sections and cbobjects elements 
 * @class CBSection
 * @param {Object} dataobject
 * @param {CBSection[]} dataobject.sections Subsections inside this section
 * @param {CBObject[]} dataobject.content Elements available in this section
 * @param {String} dataobject.type Type of object. This info is usefull to restore when load project
 * @param {String} dataobject.name Secion name.
 * @param {String} objectdata.numbering Number of section. This number is similar to 1.1.3. Numeration
 */
function CBSection(dataobject){

	dataobject = typeof dataobject !== 'undefined' ? dataobject : {};
	this.sections = typeof dataobject.sections !== 'undefined' ? dataobject.sections : [];
	this.content = typeof dataobject.content !== 'undefined' ? dataobject.content : [];
	this.idtype = "section.base";
	this.name = typeof dataobject.name !== 'undefined' ? dataobject.name : CBI18n.gettext("Section");
	this.numbering = typeof dataobject.numbering !== 'undefined' ? dataobject.numbering : "1";
}

module.exports = CBSection;