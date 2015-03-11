var arrayStructures = ["Atómica", "Colección", "Lineal", "Jerárquica","En red"];
var arrayAgregations = ["Nivel 1 - Medias y medias integradas", "Nivel 2 - Objetos de aprendizaje", 
"Nivel 3 - Secuencias didácticas", "Nivel 4 - Cursos, planes y programas de formación"];
var arrayStatus = ["Borrador", "Final", "Revisado", "No disponible"]
var arrayRoles = ["Autor", "Editor de publicación", "Iniciador", "Terminador","Revisor", "Editor de contenido",
"Diseñador gráfico","Desarrollador técnico", "Proveedor de contenidos","Revisor técnico", "Revisor educativo", "Guionista",
"Diseñador educativo", "Experto en la materia"];
var arrayTechnicalType = ["Sistema operativo", "Navegador"];
var arrayNamesOS = ["PC-dos", "MS-Windows", "Linux", "MacOS", "Unix", "Multi-so", "Ninguno"];
var arrayNameBrowser = ["Cualquiera", "Mozilla Firefox", "Netscape Communicator", "MS Internet Explorer", 
"Opera", "Amaya"];
var arrayInterType = ["Activo", "Expositivo", "Combinado"];
var arrayResourceType = ["Fotografía", "Ilustración", "Vídeo", "Animación","Música", "Efecto sonoro", "Locución", "Audio compuesto", 
"Texto narrativo", "Hipertexto", "Grafismo", "Media integrado", "Base de datos", "Tabla", "Gráfico" , "Mapa conceptual", "Mapa de navegación", 
"Presentación multimedia", "Tutorial", "Diccionario digital", "Enciclopedia digital", "Publicación digital periódica",
"Web/portal temático o corporativo", "Wiki", "Weblog", "Herramienta de creación/edición multimedia", "Herramienta de creación/edición web",
"Herramienta de ofimática", "Herramienta de programación", "Herramienta de análisis/organización de información/conocimiento", 
"Herramienta de apoyo a procesos/procedimientos", "Herramienta de gestión de aprendizaje/trabajo individual/cooperativo/colaborativo",
"Servicio de creación/edición multimedia", "Servicio de creación/edición web",
"Servicio de ofimática", "Servicio de programación", "Servicio de análisis/organización de información/conocimiento", 
"Herramienta de apoyo a procesos/procedimientos", "Servicio de gestión de aprendizaje/trabajo individual/cooperativo/colaborativo",
"Lecturas guiadas", "Lección magistral", "Comentario de texto-imagen", "Actividad de discusión", "Ejercicio o problema cerrado",
"Caso contextualizado", "Problema abierto" , "Escenario real o virtual de aprendizaje" , "Juego didáctico", "Webquest", 
"Experimento", "Proyecto real", "Simulación", "Cuestionario","Examen", "Autoevaluación"];
var arrayInteractivityLevel = ["Muy bajo", "Bajo", "Medio", "Alto", "Muy alto"];
var arraySemanticDensity = ["Muy baja", "Baja", "Media", "Alta", "Muy alta"];
var arrayEndUser = ["Alumno", "Alumno con necesidades educativas especiales", "Alumno con altas capacidades intelectuales",
"Alumno con integración tardía en sistema educativo", "Alumno con otras necesidades específicas de apoyo educativo","Público en general",
"Individual", "Grupal", "Docente", "Tutor", "Familia", "Documentalista", "Informático", "Administrador", "Experto en educación", "Experto en la materia"];
var arrayContext = ["Aula", "Laboratorio", "Entorno real", "Domicilio", "Combinado", "Docente", "Tutor", "Familia", "Compañero", "Independiente", 
"Asistencia Mixta", "Presencial", "Semipresencial", "Distancia"];
var arrayDifficulty = ["Muy fácil", "Fácil", "Medio", "Difícil", "Muy difícil"];
var arrayCognitiveProcess = ["Analizar", "Aplicar","Colaborar","Comparar","Compartir", "Competir","Comprender"
,"Comprobar","Comunicar", "Contextualizar","Controlar","Cooperar","Crear","Decidir", "Definir","Describir"
,"Discutir","Diseñar","Evaluarse", "Explicar","Extrapolar","Innovar","Investigar","Juzgar","Motivar","Observar"
,"Organizar","Organizarse","Planificar","Practicar","Producir","Reconocer","Recordar", "Redactar","Reflexionar"
,"Relacionar","Representar", "Resolver","Simular","Sintetizar", "Valorar"];
var arrayCost = ["Sí", "No"];
var arrayAuthorRights = ["Licencia propietaria", "Licencia libre EUPL", "Licencia libre GPL", "Licencia libre dual GPL y EUPL",
"Otras licencias libres", "Dominio público", "No corresponde", "Licencia propietaria intelectual", "Creative commons: reconocimiento", "Creative commons: reconocimiento - sin obra derivada"
,"Creative commons: reconocimiento - sin obra derivada - no comercial", "Creative commons: reconocimiento - no comercial",
"Creative commons: reconocimiento - no comercial - compartir igual", "Creative commons: reconocimiento - compartir igual", 
"Licencia GFDL"];
var arrayAccesstype = ["Universal", "No universal"];
var arrayRelationType = ["Es parte de", "Tiene parte", "Es versión de", "Tiene versión", "Es formato de", "Tiene formato",
"Referencia", "Es referenciado por", "Se basa en", "Es base para", "Requiere", "Es requerido por"];
var arrayPurposes = ["Disciplina", "Idea", "Prerrequisito", "Objetivo educativo", "Restricciones de accesibilidad",
"Nivel educativo", "Nivel de habilidad", "Nivel de seguridad", "Competencia"];
var arrayGUINameElementsDublin = ['title','subject','description','type','source','relation','coverage','creator','publisher',
'contributor','rights','date','formatData','identifier','language'];
var arrayGUINameElementsLOM = [['cat_', ['catalog_', 'entry_'] , 'addCatalog_'],['tit_', ['title_', 'titleLang_'] , 'addtitle_'], 
,['idiom_', ['mainLang_'] , 'addLanguage_'], ['descGeneral_', ['Description_', 'descGeneralLang_'], 'addGeneralDesc_'], 
['keywordGeneral_', ['keywordGeneral1_', 'keywordGeneralLang_'], 'addKeywordGeneral_'], ['coverage_', ['coverage1_', 'coverageLang_'], 'addCoverage_'], 
['structuresGeneral_1'], ['aggregationLevels_1'], ['versionlifecycle_', ['versionlifecycle1_', 'lifeCycleLang_'] , 'addLifeCycleVersion_'], 
['statusLifeCycle_1_1'], ['contrLyfeCycle_', ['rolesLifeCycle_', 'nameContribLifeCycle_', 'organContribLifeCycle_', 'emailContribLifeCycle_', 'dateContribLifeCycle_', 
['DIVdescContribLifeCycle_1_', ['DescriptionContribLifeCycle_1_', 'ContribLifeCycleLang_1_'], 'addContribLifeCycle_1_']], 'addContribLifeCycle_'],
['catMetadata_', ['metametadataCatalog_', 'metametadataEntry_'] , 'addMetametadataCatalog_'], ['schemaMetametadataValue_1'],['langMetametadataValue_1'], 
['contrMetametadata_', ['rolesMetametadata_', 'nameContribMetametadata_', 'organContribMetametadata_', 'emailContribMetametadata_', 'dateContribMetametadata_', 
['DIVdescContribMetametadata_1_', ['DescriptionContribMetametadata_1_', 'ContribMetametadataLang_1_'], 'addContribMetametadata_1_']],'addContribMetametadata_'],
['formatTechnical_', ['formatTechnicalValue_'], 'addFormatTechnical_'], ['sizeTechnicalValue_1'], ['locationTechnical_', ['locationTechnicalValue_'],'addTechnicalLoc_'],
['requirementsTechnical_', ['typeTechnicalReq_','nameTechnicalReq_','minVerTechnicalReq_','versmaxTechnicalReq_'],'addReqTechnical_'], ['installRemTech_',['installRemTechValue_', 'LangRemTech_'],
'addRemTech_'], ['requirementsRemTech_', ['requirementsRemTechValue_', 'LangOtherTech_'], 'addOtherTech_'], ['durationYearsDurTech_1'], ['durationMonthsDurTech_1'],
['durationDaysDurTech_1'], ['durationHoursDurTech_1'],['durationminutesDurTech_1'], ['durationsecondsDurTech_1'], ['descdurationDurTech_', ['DescriptionDurTech_', 'languageDescDurTech_'],
'addDescDurTech_'], ['intTypeEducationalValue_1'], ['resourceTypeEducational_', ['resourceTypeEducationalValue_'], 'addresourceTypeEducational_'], ['levelIntEducationalValue_1'],
['levelDensEducationalValue_1'], ['endUserEducational_', ['endUserEducationalValue_'], 'addEndUserEducational_'], ['contextEducational_', ['contextEducationalValue_'], 'addContextEducational_'],
['rangeAgeEducational_', ['rangeAgeEducationalValue_','languageRangeEducational_'], 'addrangeAgeEducational_'], ['difficultyEducationalValue_1'], ['durationYearsEducational_1'],
['durationMonthsEducational_1'], ['durationDaysEducational_1'], ['durationHoursEducational_1'],['durationminutesEducational_1'],['durationsecondsEducational_1'],['descLearningTimeEducational_', 
['DescriptionLearningEducational_', 'langDurationEducational_'], 'adddescDuracionEducational_'], ['descEducationUse_', ['descEducationUseValue_','langDescrEducational_'], 
'addDescrEducational_'], ['languageEducationalUseValue_1'], ['processcogEducational_', ['processcogEducationalValue_'], 'addProcessCogEducational_'],
['costRightsValue_1'], ['copyrightRightsValue_1'], ['descRights_', ['descRightsValue_', 'descRightsLang_'], 'addDescRights_'], ['accessTypeRights_1'],['DescriptionAccessRights_1'],
['langAccessRights_1'], ['relationRelations_', ['relationRelationsValue_', 'catalogRelations_', 'entryRelations_', 'DescriptionRelationRelations_', 'relationRelationsLang_'], 'addRelationRelations_'],
['annotationAnnotations_', ['nameAnnotations_', 'organAnnotations_', 'emailAnnotations_' , 'dateAnnotations_', 'DescriptionDateAnnotations_', 'langDateAnnotations_','DescriptionAnnotations_', 
 'LangAnnotations_'], 'addAnnotationAnnotations_'], ['classificationsClassification_', ['typePurposeClassification_', 'DescriptionTaxonClassification_','tituloLangTaxonClassification_',
 'KeywordTaxonClassification_','titleLangKeywordTaxonClassification_',['DIVpathClassification_1_', ['sourceNameClassification_1_', 'langClassification_1_','nameTaxonClassification_1_',
  'idTaxonClassification_1_'], 'addpathClassification_1_']], 'addPurposeClassification_']];

/**
 * @class DialogMetadata
 * @classdesc This class is responsible for creating elements of the Metadata Dialog. 
 */
function DialogMetadata(){

    var dialog = CBDialog.createDiv("dialog");
    dialog.append(CBDialog.createList([["#dublincore", "Dublin Core"],["#accordion", "LOM-ES"]]));

    var dialogDublin = CBDialog.createDiv("dublincore")
    .append(CBDialog.createFieldsetWithElements("Content", [['Text', "Title:", "metadata-text"], ['Input', "title","metadata-box"],
       ['Text', "Subject:", "metadata-text"], ['Input', "subject","metadata-box"], ['Text', "Description:", "metadata-text"], ['Input', "description","metadata-box"],
       ['Text', "Type:", "metadata-text"], ['Input', "type","metadata-box"],['Text', "Source:", "metadata-text"], ['Input', "source","metadata-box"],
       ['Text', "Relation:", "metadata-text"], ['Input', "relation","metadata-box"],['Text', "Coverage:", "metadata-text"], ['Input', "coverage","metadata-box"]]))
    .append(CBDialog.createFieldsetWithElements("Intellectual property", [['Text', "Creator:", "metadata-text"], ['Input', "creator","metadata-box"],
      ['Text', "Publisher:", "metadata-text"], ['Input', "publisher","metadata-box"],['Text', "Contributor:", "metadata-text"], ['Input', "contributor","metadata-box"],
      ['Text', "Rights:", "metadata-text"], ['Input', "rights","metadata-box"]]))
    .append(CBDialog.createFieldsetWithElements("Instantiation", [['Text', "Date:", "metadata-text"], ['Date', "date","metadata-box"],
      ['Text', "Format:", "metadata-text"], ['Input', "formatData","metadata-box"],['Text', "Identifier:", "metadata-text"], ['Input', "identifier","metadata-box"],
      ['Text', "Language:", "metadata-text"], ['SelectLanguage', "language","metadata-box"]]));

    var dialogLOM = CBDialog.createDiv("accordion")
    .append(CBDialog.createHeader("General"))
    .append(CBDialog.createDiv("general")
      .append(CBDialog.createFieldsetWithDivElements("Identifier", "cat_1", [["Span", "Catalog", "spanCatalog_1", "metadata-text"],
        ['Input', "catalog_1","metadata-box-half"], ["Span", "Entry", "spanEntry_1", "metadata-text-right"],
        ['Input', "entry_1","metadata-box-half"], ["AddButton", "addCatalog_1", "ui-icon-locked", "cat_1"],
        ["DeleteButton", "deleteCatalog_1", "ui-icon-locked", "cat_1"]]))
      .append(CBDialog.createFieldsetWithDivElements("Title", "tit_1", [['Input', "title_1","metadata-box-half-plus"],
        ["Span", "Language", "spanLanguage_1", "metadata-text-right"],
        ['SelectLanguage', "titleLang_1","metadata-box-half"], ["AddButton", "addtitle_1", "ui-icon-locked", "tit_1"],
        ["DeleteButton", "deletetitle_1", "ui-icon-locked", "tit_1"]]))
      .append(CBDialog.createFieldsetWithDivElements("Language", "idiom_1", [['SelectLanguage', "mainLang_1","metadata-box-long"],
        ["AddButton", "addLanguage_1", "ui-icon-locked", "idiom_1"], ["DeleteButton", "deleteLanguage_1", "ui-icon-locked", "idiom_1"]]))
      .append(CBDialog.createFieldsetWithDivElements("Description", "descGeneral_1", [['Input', "Description_1","metadata-box-half-plus"],
        ["Span", "Language", "spanLanguage_1", "metadata-text-right"],
        ['SelectLanguage', "descGeneralLang_1","metadata-box-half"], ["AddButton", "addGeneralDesc_1", "ui-icon-locked", "descGeneral_1"],
        ["DeleteButton", "deleteGeneralDesc_1", "ui-icon-locked", "descGeneral_1"]]))
      .append(CBDialog.createFieldsetWithDivElements("Keyword", "keywordGeneral_1", [['Input', "keywordGeneral1_1","metadata-box-half-plus"],
        ["Span", "Language", "spanLanguage_1", "metadata-text-right"],['SelectLanguage', "keywordGeneralLang_1","metadata-box-half"], ["AddButton", "addKeywordGeneral_1", "ui-icon-locked", "keywordGeneral_1"],
        ["DeleteButton", "deleteKeywordGeneral_1", "ui-icon-locked", "keywordGeneral_1"]]))
      .append(CBDialog.createFieldsetWithDivElements("Coverage", "coverage_1", [['Input', "coverage1_1","metadata-box-half-plus"],
        ["Span", "Language", "spanLanguage_1", "metadata-text-right"],['SelectLanguage', "coverageLang_1","metadata-box-half"], ["AddButton", "addCoverage_1", "ui-icon-locked", "coverage_1"],
        ["DeleteButton", "deleteCoverage_1", "ui-icon-locked", "coverage_1"]]))
      .append(CBDialog.createFieldsetWithDivElements("Structure", "structureGeneral_1", [['Select', "structuresGeneral_1",arrayStructures, "metadata-box-all"]]))
      .append(CBDialog.createFieldsetWithDivElements("Aggregation Level", "aggregationLevel_1", [['Select', "aggregationLevels_1",arrayAgregations, "metadata-box-all"]])))

    .append(CBDialog.createHeader("Life cycle"))
    .append(CBDialog.createDiv("lifecycle")
      .append(CBDialog.createFieldsetWithDivElements("Version", "versionlifecycle_1", [["Input", "versionlifecycle1_1", "metadata-box-half-plus"],
        ["Span", "Language", "spanLanguage_1", "metadata-text-right"], ['SelectLanguage', "lifeCycleLang_1","metadata-box-half"],
        ["AddButton", "addLifeCycleVersion_1", "ui-icon-locked", "versionlifecycle_1"], ["DeleteButton", "deleteLifeCycleVersion_1", "ui-icon-locked", "versionlifecycle_1"]]))
      .append(CBDialog.createFieldsetWithDivElements("Status", "statusLifeCycle_1", [['Select', "statusLifeCycle_1_1",arrayStatus, "metadata-box-all"]]))
      .append(CBDialog.createFieldsetWithDivElements("Contribution", "contrLyfeCycle_1", [["Span", "Role", "spanRole_1", "metadata-text"],["Select", "rolesLifeCycle_1", arrayRoles, "metadata-box"],
        ["AddButton", "addContribLifeCycle_1", "ui-icon-locked", "contrLyfeCycle_1"], ["DeleteButton", "deleteContribLifeCycle_1", "ui-icon-locked", "contrLyfeCycle_1"],
        ["Span", "Name", "spanName_1", "metadata-text"],["Input", "nameContribLifeCycle_1", "metadata-box"],["Span", "Organization", "spanOrgan_1", "metadata-text"],
        ["Input", "organContribLifeCycle_1", "metadata-box"],["Span", "Email", "spanemail_1", "metadata-text"],["Input", "emailContribLifeCycle_1", "metadata-box"],
        ["Span", "Date", "spanDate_1", "metadata-text"],["Date", "dateContribLifeCycle_1", "metadata-box"],["Div", "DIVdescContribLifeCycle_1_1", [["Span", "Description", "spanDescription_1_1", "metadata-text"],
        ["Input", "DescriptionContribLifeCycle_1_1", "metadata-box-half"], ["Span", "Language", "spanLanguage_1_1", "metadata-text-right"],
        ['SelectLanguage', "ContribLifeCycleLang_1_1","metadata-box-half"], ["AddButtonDiv", "addContribLifeCycle_1_1", "ui-icon-locked", "DIVdescContribLifeCycle_1_1"],
        ["DeleteButtonDiv", "deleteContribLifeCycle_1_1", "ui-icon-locked", "DIVdescContribLifeCycle_1_1"]]]])))

    .append(CBDialog.createHeader("Meta-Metadata"))
    .append(CBDialog.createDiv("metametadata")
      .append(CBDialog.createFieldsetWithDivElements("Identifier", "catMetadata_1", [["Span", "Catalog", "spanCatalog_1", "metadata-text"],
        ['Input', "metametadataCatalog_1","metadata-box-half"], ["Span", "Entry", "spanEntry_1", "metadata-text-right"],
        ['Input', "metametadataEntry_1","metadata-box-half"], ["AddButton", "addMetametadataCatalog_1", "ui-icon-locked", "catMetadata_1"],
        ["DeleteButton", "deleteMetametadataCatalog_1", "ui-icon-locked", "catMetadata_1"]]))
      .append(CBDialog.createFieldsetWithDivElements("Metadata Schema", "schemaMetametadata_1", [['Input', "schemaMetametadataValue_1","metadata-box-all"]]))
      .append(CBDialog.createFieldsetWithDivElements("Language", "langMetametadata_1", [['SelectLanguage', "langMetametadataValue_1","metadata-box-all"]]))
      .append(CBDialog.createFieldsetWithDivElements("Contribution", "contrMetametadata_1", [["Span", "Role", "spanRole_1", "metadata-text"],["Select", "rolesMetametadata_1", arrayRoles, "metadata-box"],
        ["AddButton", "addContribMetametadata_1", "ui-icon-locked", "contrMetametadata_1"], ["DeleteButton", "deleteContribMetametadata_1", "ui-icon-locked", "contrMetametadata_1"],
        ["Span", "Name", "spanName_1", "metadata-text"],["Input", "nameContribMetametadata_1", "metadata-box"],["Span", "Organization", "spanOrgan_1", "metadata-text"],
        ["Input", "organContribMetametadata_1", "metadata-box"],["Span", "Email", "spanemail_1", "metadata-text"],["Input", "emailContribMetametadata_1", "metadata-box"],
        ["Span", "Date", "spanDate_1", "metadata-text"],["Date", "dateContribMetametadata_1", "metadata-box"],["Div", "DIVdescContribMetametadata_1_1", [["Span", "Description", "spanDescription_1_1", "metadata-text"],
        ["Input", "DescriptionContribMetametadata_1_1", "metadata-box-half"], ["Span", "Language", "spanLanguage_1_1", "metadata-text-right"],
        ['SelectLanguage', "ContribMetametadataLang_1_1","metadata-box-half"], ["AddButtonDiv", "addContribMetametadata_1_1", "ui-icon-locked", "DIVdescContribMetametadata_1_1"],
        ["DeleteButtonDiv", "deleteContribMetametadata_1_1", "ui-icon-locked", "DIVdescContribMetametadata_1_1"]]]])))

    .append(CBDialog.createHeader("Technical"))
    .append(CBDialog.createDiv("technical")
      .append(CBDialog.createFieldsetWithDivElements("Format", "formatTechnical_1", [['Input', "formatTechnicalValue_1","metadata-box-long"],
      ["AddButton", "addFormatTechnical_1", "ui-icon-locked", "formatTechnical_1"], ["DeleteButton", "deleteFormatTechnical_1", "ui-icon-locked", "formatTechnical_1"]]))
      .append(CBDialog.createFieldsetWithDivElements("Size", "sizeTechnical_1", [['Input', "sizeTechnicalValue_1","metadata-box-all"]]))
      .append(CBDialog.createFieldsetWithDivElements("Location", "locationTechnical_1", [['Input', "locationTechnicalValue_1","metadata-box-long"],
      ["AddButton", "addTechnicalLoc_1", "ui-icon-locked", "locationTechnical_1"],["DeleteButton", "deleteTechnicalLoc_1", "ui-icon-locked", "locationTechnical_1"]]))
      .append(CBDialog.createFieldsetWithDivElements("Requirements", "requirementsTechnical_1", [["Span", "Type", "spanType_1", "metadata-text"],
        ["SelectWithDependency", "typeTechnicalReq_1", arrayTechnicalType, "metadata-box-half", "changeNames(this)"],
        ["AddButton", "addReqTechnical_1", "ui-icon-locked", "requirementsTechnical_1"], ["DeleteButton", "deleteReqTechnical_1", "ui-icon-locked", "requirementsTechnical_1"],
        ["Span", "Name", "spanName_1", "metadata-text-right"],["Select", "nameTechnicalReq_1",arrayNamesOS, "metadata-box-half"],["Span", "Min. Version", "spanVersMin_1", "metadata-text"],
        ["InputWithBr", "minVerTechnicalReq_1", "metadata-box"],
        ["Span", "Max Version", "spanVersMax_1", "metadata-text"],["Input", "versmaxTechnicalReq_1", "metadata-box"]]))
      .append(CBDialog.createFieldsetWithDivElements("Installation Remarks", "installRemTech_1", [['Input', "installRemTechValue_1","metadata-box-half-plus"],
        ["Span", "Language", "spanLanguage_1", "metadata-text-right"],['SelectLanguage', "LangRemTech_1","metadata-box-half"],
        ["AddButton", "addRemTech_1", "ui-icon-locked", "installRemTech_1"],["DeleteButton", "deleteRemTech_1", "ui-icon-locked", "installRemTech_1"]]))
      .append(CBDialog.createFieldsetWithDivElements("Other Platform Requirements", "requirementsRemTech_1", [['Input', "requirementsRemTechValue_1","metadata-box-half-plus"],
        ["Span", "Language", "spanLanguage_1", "metadata-text-right"],['SelectLanguage', "LangOtherTech_1","metadata-box-half"],
        ["AddButton", "addOtherTech_1", "ui-icon-locked", "requirementsRemTech_1"],["DeleteButton", "deleteOtherTech_1", "ui-icon-locked", "requirementsRemTech_1"]]))
      .append(CBDialog.createFieldsetWithDivElements("Duration", "durationDurTech_1", [["Span", "Years", "spanYears_1", "metadata-text"],["Input", "durationYearsDurTech_1", "metadata-box-half"],
        ["Span", "Months", "spanMonths_1", "metadata-text-right"],["InputWithBr", "durationMonthsDurTech_1", "metadata-box-half"],
        ["Span", "Days", "spanDays_1", "metadata-text"],["Input", "durationDaysDurTech_1", "metadata-box-half"],
        ["Span", "Hours", "spanHours_1", "metadata-text-right"],["InputWithBr", "durationHoursDurTech_1", "metadata-box-half"],
        ["Span", "Minutes", "spanMinutes_1", "metadata-text"],["Input", "durationminutesDurTech_1", "metadata-box-half"],
        ["Span", "Seconds", "spanSeconds_1", "metadata-text-right"],["InputWithBr", "durationsecondsDurTech_1", "metadata-box-half"],
        ["Div", "descdurationDurTech_1", [["Span", "Description", "spanDescription_1", "metadata-text"],
        ["Input", "DescriptionDurTech_1", "metadata-box-half"], ["Span", "Language", "spanLanguage_1", "metadata-text-right"],
        ['SelectLanguage', "languageDescDurTech_1","metadata-box-half"], ["AddButton", "addDescDurTech_1", "ui-icon-locked", "descdurationDurTech_1"],
        ["DeleteButtonDiv", "deleteDescDurTech_1", "ui-icon-locked", "descdurationDurTech_1"]]]])))

    .append(CBDialog.createHeader("Educational"))
    .append(CBDialog.createDiv("educationaluse")
      .append(CBDialog.createFieldsetWithDivElements("Interactivity type", "intTypeEducational_1", [['Select', "intTypeEducationalValue_1", arrayInterType,"metadata-box-all"]]))
      .append(CBDialog.createFieldsetWithDivElements("Learning Resource Type", "resourceTypeEducational_1", [['Select', "resourceTypeEducationalValue_1",arrayResourceType ,"metadata-box-long"],
        ["AddButton", "addresourceTypeEducational_1", "ui-icon-locked", "resourceTypeEducational_1"],["DeleteButton", "deleteresourceTypeEducational_1", "ui-icon-locked", "resourceTypeEducational_1"]]))
      .append(CBDialog.createFieldsetWithDivElements("Interactivity level", "levelInterEducational_1", [['Select', "levelIntEducationalValue_1", arrayInteractivityLevel,"metadata-box-all"]]))
      .append(CBDialog.createFieldsetWithDivElements("Semantic density", "levelDensEducational_1", [['Select', "levelDensEducationalValue_1", arraySemanticDensity,"metadata-box-all"]]))
      .append(CBDialog.createFieldsetWithDivElements("Intended end user role", "endUserEducational_1", [['Select', "endUserEducationalValue_1",arrayEndUser ,"metadata-box-long"], 
        ["AddButton", "addEndUserEducational_1", "ui-icon-locked", "endUserEducational_1"],["DeleteButton", "deleteEndUserEducational_1", "ui-icon-locked", "endUserEducational_1"]]))
      .append(CBDialog.createFieldsetWithDivElements("Context", "contextEducational_1", [['Select', "contextEducationalValue_1",arrayContext ,"metadata-box-long"], 
        ["AddButton", "addContextEducational_1", "ui-icon-locked", "contextEducational_1"],["DeleteButton", "deleteContextEducational_1", "ui-icon-locked", "contextEducational_1"]]))
      .append(CBDialog.createFieldsetWithDivElements("Typical age range", "rangeAgeEducational_1", [['Input', "rangeAgeEducationalValue_1","metadata-box-half-plus"],
        ["Span", "Language", "spanLanguageRangeEducational_1", "metadata-text-right"],['SelectLanguage', "languageRangeEducational_1","metadata-box-half"],
        ["AddButton", "addrangeAgeEducational_1", "ui-icon-locked", "rangeAgeEducational_1"],["DeleteButton", "deleterangeAgeEducational_1", "ui-icon-locked", "rangeAgeEducational_1"]]))
      .append(CBDialog.createFieldsetWithDivElements("Difficulty", "difficultyEducational_1", [['Select', "difficultyEducationalValue_1", arrayDifficulty,"metadata-box-all"]]))
      .append(CBDialog.createFieldsetWithDivElements("Typical learning time", "learningTimeEducational_1", 
        [["Span", "Years", "spanYears_1", "metadata-text"],["Input", "durationYearsEducational_1", "metadata-box-half"],
        ["Span", "Months", "spanMonths_1", "metadata-text-right"],["InputWithBr", "durationMonthsEducational_1", "metadata-box-half"],
        ["Span", "Days", "spanDays_1", "metadata-text"],["Input", "durationDaysEducational_1", "metadata-box-half"],
        ["Span", "Hours", "spanHours_1", "metadata-text-right"],["InputWithBr", "durationHoursEducational_1", "metadata-box-half"],
        ["Span", "Minutes", "spanMinutes_1", "metadata-text"],["Input", "durationminutesEducational_1", "metadata-box-half"],
        ["Span", "Seconds", "spanSeconds_1", "metadata-text-right"],["InputWithBr", "durationsecondsEducational_1", "metadata-box-half"],
        ["Div", "descLearningTimeEducational_1", [["Span", "Description", "spanDescriptionLearningEducational_1", "metadata-text"],
        ["Input", "DescriptionLearningEducational_1", "metadata-box-half"], ["Span", "Language", "spanLanguage_1", "metadata-text-right"],
        ['SelectLanguage', "langDurationEducational_1","metadata-box-half"], ["AddButton", "adddescDuracionEducational_1", "ui-icon-locked", "descLearningTimeEducational_1"],
        ["DeleteButtonDiv", "deletedescDuracionEducational_1", "ui-icon-locked", "descLearningTimeEducational_1"]]]]))
      .append(CBDialog.createFieldsetWithDivElements("Description", "descEducationUse_1", [['Input', "descEducationUseValue_1","metadata-box-half-plus"],
        ["Span", "Language", "spanLanguage_1", "metadata-text-right"],['SelectLanguage', "langDescrEducational_1","metadata-box-half"],
        ["AddButton", "addDescrEducational_1", "ui-icon-locked", "descEducationUse_1"],["DeleteButton", "deleteDescrEducational_1", "ui-icon-locked", "descEducationUse_1"]]))
      .append(CBDialog.createFieldsetWithDivElements("Language", "languageEducationalUse_1", [['SelectLanguage', "languageEducationalUseValue_1","metadata-box-all"]]))
      .append(CBDialog.createFieldsetWithDivElements("Cognitive process", "processcogEducational_1", [['Select', "processcogEducationalValue_1", arrayCognitiveProcess,"metadata-box-long"],
        ["AddButton", "addProcessCogEducational_1", "ui-icon-locked", "processcogEducational_1"],["DeleteButton", "deleteProcessCogEducational_1", "ui-icon-locked", "processcogEducational_1"]])))

     .append(CBDialog.createHeader("Rights"))
     .append(CBDialog.createDiv("rights")
      .append(CBDialog.createFieldsetWithDivElements("Cost", "costRights_1", [['Select', "costRightsValue_1", arrayCost,"metadata-box-all"]]))
      .append(CBDialog.createFieldsetWithDivElements("Copyright and other restrictions", "copyrightRights_1", [['Select', "copyrightRightsValue_1", arrayAuthorRights,"metadata-box-all"]]))
      .append(CBDialog.createFieldsetWithDivElements("Description", "descRights_1", [['Input', "descRightsValue_1","metadata-box-half-plus"],
        ["Span", "Language", "spanLanguage_1", "metadata-text-right"],['SelectLanguage', "descRightsLang_1","metadata-box-half"],
        ["AddButton", "addDescRights_1", "ui-icon-locked", "descRights_1"],["DeleteButton", "deleteRights_1", "ui-icon-locked", "descRights_1"]]))
      .append(CBDialog.createFieldsetWithDivElements("Access", "accessRights_1", [["Span", "Access Type", "spanAccess_1", "metadata-text"],
        ['Select', "accessTypeRights_1",arrayAccesstype,"metadata-box-long-wtext"], ["Span", "Description", "spanDescription_1", "metadata-text"],
        ['Input', "DescriptionAccessRights_1", "metadata-box-half-wbuttons"], ["Span", "Language", "spanLanguage_1", "metadata-text-right"],
        ['SelectLanguage', "langAccessRights_1","metadata-box-half-wbuttons"]])))

     .append(CBDialog.createHeader("Relation"))
      .append(CBDialog.createDiv("relation")
        .append(CBDialog.createFieldsetWithDivElements("Relations", "relationRelations_1", [["Span", "Kind", "spanKindRel_1", "metadata-text"],
          ['Select', "relationRelationsValue_1",arrayRelationType,"metadata-box"], ["AddButton", "addRelationRelations_1", "ui-icon-locked", "relationRelations_1"],
          ["DeleteButton", "deleteRelationRelations_1", "ui-icon-locked", "relationRelations_1"], ["Span", "Catalog", "spanCatalog_1", "metadata-text"],
          ["Input", "catalogRelations_1", "metadata-box"] , ["Span", "Entry", "spanEntry_1", "metadata-text"],["Input", "entryRelations_1", "metadata-box"],
          ["Span", "Description", "spanDescription_1", "metadata-text"],["Input", "DescriptionRelationRelations_1", "metadata-box-half"],
          ["Span", "Language", "spanLanguage_1", "metadata-text-right"], ['SelectLanguage', "relationRelationsLang_1","metadata-box-half"]
          ])))

     .append(CBDialog.createHeader("Annotation"))
      .append(CBDialog.createDiv("annotation")
        .append(CBDialog.createFieldsetWithDivElements("Annotations", "annotationAnnotations_1", [["Span", "Name", "spanName_1", "metadata-text"],
          ['Input', "nameAnnotations_1", "metadata-box"], ["AddButton", "addAnnotationAnnotations_1", "ui-icon-locked", "annotationAnnotations_1"],
          ["DeleteButton", "deleteAnnotations_1", "ui-icon-locked", "annotationAnnotations_1"], ["Span", "Organization", "spanOrgan_1", "metadata-text"],
          ['Input', "organAnnotations_1","metadata-box"], ["Span", "Email", "spanemail_1", "metadata-text"],
          ["Input", "emailAnnotations_1", "metadata-box"] , ["Span", "Date", "spanDate_1", "metadata-text"],["Date", "dateAnnotations_1", "metadata-box"],
          ["Span", "Date Descr.", "spanDescriptionDate_1", "metadata-text"],["Input", "DescriptionDateAnnotations_1", "metadata-box-half"],
          ["Span", "Date Language", "spanLanguage_1", "metadata-text-right"], ['SelectLanguage', "langDateAnnotations_1","metadata-box-half"],
          ["Span", "Description", "spanDescription_1", "metadata-text"], ['Input', "DescriptionAnnotations_1","metadata-box-half"],
          ["Span", "Language", "spanLanguageDesc_1", "metadata-text-right"],['SelectLanguage', "LangAnnotations_1","metadata-box-half"]])))

    .append(CBDialog.createHeader("Classification"))
      .append(CBDialog.createDiv("classification")
        .append(CBDialog.createFieldsetWithDivElements("Clasificaciones", "classificationsClassification_1", [["Span", "Purpose", "spanPurpose_1", "metadata-text"],
          ['Select', "typePurposeClassification_1",arrayPurposes,  "metadata-box"], ["AddButton", "addPurposeClassification_1", "ui-icon-locked", "classificationsClassification_1"],
          ["DeleteButtonWithBr", "deletePurposeClassification_1", "ui-icon-locked", "classificationsClassification_1"], ["Span", "Description", "spanDescriptionTaxon_1_1", "metadata-text"],
          ['Input', "DescriptionTaxonClassification_1","metadata-box-half"], ["Span", "Language", "spanLanguageTaxon_1", "metadata-text-right"],
          ["SelectLanguageWithBr", "tituloLangTaxonClassification_1", "metadata-box-half"] , ["Span", "Keyword", "spanKeywordTaxon_1", "metadata-text"],
          ["Input", "KeywordTaxonClassification_1", "metadata-box-half"], ["Span", "Language", "spanLanguageKeywordTaxon_1", "metadata-text-right"],
          ["SelectLanguageWithBr", "titleLangKeywordTaxonClassification_1", "metadata-box-half"],["DivWithBr", "DIVpathClassification_1_1", [["Span", "Source", "spanSource_1_1", "metadata-text"],
          ["Input", "sourceNameClassification_1_1", "metadata-box-half"], ["Span", "Language", "spanLanguage_1_1", "metadata-text-right"],
          ['SelectLanguage', "langClassification_1_1","metadata-box-half"], ["AddButtonDiv", "addpathClassification_1_1", "ui-icon-locked", "DIVpathClassification_1_1"],
          ["DeleteButton", "deletepathClassification_1_1", "ui-icon-locked", "DIVpathClassification_1_1"], ["Span", "Taxon", "spanTaxon_1_1", "metadata-text"],
          ["Input", "nameTaxonClassification_1_1", "metadata-box-half"],["Span", "Id", "spanIdTaxon_1_1", "metadata-text-right"],["Input", "idTaxonClassification_1_1", "metadata-box-half"]]]])));

    dialogLOM.accordion({
      heightStyle: "content",
      active: "false",
      collapsible: true,
    });

    dialog.append(dialogDublin)
    .append(dialogLOM);

    $("#format").selectmenu();
    $('body').append(dialog);
    $("#dialog").tabs({show: { effect: "fadeIn", duration: 500 }});

  }

/**
 * This method is responsible for showing this dialog and load data into it
 */
DialogMetadata.prototype.showDialog = function showDialog(){
    
    $("#dialog").dialog({
      autoOpen: true,
      title:"Metadata",
      modal: true,
      width:900,
      height:720,
      resizable:false,
      hide:{effect:"fadeOut", duration:500},
      show:{effect:"fadeIn", duration:500},
      buttons: {
        "Save": function (){
          saveData();
          $("#dialog").dialog('destroy').remove()
        },
        "Cancel": function(){
          $("#dialog").dialog('destroy').remove()
        }
      }
    });

    loadData();
}


 /**
 * This method returns the number of subelements of one element
 * @param  {String[]} array with subelements
 * @numElements {String} Number of subelements
 */

function getNumElements(element){
  var numElements = 0;
  if(element[0].indexOf("DIV") != -1)
  {
    $.each(Project.Info.LOM, function (intValue, currentelement){
      $.each(Project.Info.LOM[intValue] , function (intValue1, currentelement1){
        if(intValue1.indexOf(element[0]) >=0){ numElements++;}
      });
    });
  }
  else
  {
    $.each(Project.Info.LOM, function (intValue, currentelement){
      if(intValue.indexOf(element[0]) >=0){ numElements++;}
    });
  }
  return numElements;
}

/**
 * This method is responsible for loading data into Dialog and control values of dependant comboboxes
 */
function loadData(){

  if(Project.Info.DublinCore != null)
  {
      arrayGUINameElementsDublin.forEach(function(element){
          $("#"+element).val(Project.Info.DublinCore[element]);
      });
      arrayGUINameElementsLOM.forEach(function(element){
        if(element.length > 1)
        {
            for(i=1;i<=getNumElements(element);i++)
            {
              if(getNumElements(element) > 1 && i < getNumElements(element)) 
                $("#"+element[2] + i).click(); 

              element[1].forEach(function(element1){
                if(element1[0].length > 1)
                {
                      for(j=1;j<=getNumElements(element1);j++)
                      {
                          if(getNumElements(element1) > 1 && j < getNumElements(element1))
                           $("#"+element1[2].split("_")[0] + "_" + i + "_" + j).click(); 
                          
                          element1[1].forEach(function(element2)
                          {
                              $("#" + element2.split("_")[0] + "_" + i+ "_" +j).val(Project.Info.LOM[element[0]+i][element1[0].split("_")[0] + "_" + i + "_" +j][element2.split("_")[0] + "_" + i + "_" +j]);  
                          });
                       }
                }
                else
                  $("#" + element1+i).val(Project.Info.LOM[element[0] + i][element1+i]);  
              });  
            }    
        }
        else
        {
          $("#"+element).val(Project.Info.DublinCore[element]);
        }
      });

      $.each(Project.Info.LOM, function (intValue, currentelement){
        if(intValue.indexOf('requirementsTechnical_') >=0){ 
            var index = intValue.split("_")[1]
            changeNames($('#typeTechnicalReq_'+index), 'nameTechnicalReq_'+index, Project.Info.LOM['requirementsTechnical_'+index]['nameTechnicalReq_'+index]);      
        }
      });

    }
    else
    {
      CBUtil.createNameSpace('Project.Info.DublinCore');
      CBUtil.createNameSpace('Project.Info.LOM');
    }
}

/**
 * This method is responsible for saving data from Dialog.
 */
function saveData(){

  arrayGUINameElementsDublin.forEach(function(element){    
    Project.Info.DublinCore[element] = $("#"+element).val();
  });

  arrayGUINameElementsLOM.forEach(function(element){    
    if(element.length > 1)
    {
      var cont = $('[id^=' + element[0]).length;
      for(i=1; i<=cont;i++)
      {
        Project.Info.LOM[element[0]+i] = {};
        element[1].forEach(function(element1){
          if(element1[0].length > 1)
          {
            var cont2 = $('[id^=' + element1[0].split("_")[0] + "_" + element1[0].split("_")[1] + "_").length;
            for(j=1; j<=cont2;j++)
            {
              Project.Info.LOM[element[0]+i][element1[0].split("_")[0] + "_" + i + "_" +j] = {};
              element1[1].forEach(function(element2){
                Project.Info.LOM[element[0]+i][element1[0].split("_")[0] + "_" + i + "_" +j][element2.split("_")[0] + "_" + i + "_" +j] =  $("#"+element2.split("_")[0] + "_" + i+ "_" +j).val();
              });
            };
          }
          else{
            Project.Info.LOM[element[0]+i][element1+i] =  $("#"+element1+i).val();
          }
        });
      }
    }
    else{
      Project.Info.DublinCore[element] = $("#"+element).val();
    }
  });

}

/**
 * This method is responsible for changing values of the Name type depending on the Technical type
 * @param  {Object} element with value changed
 */
function changeNames(element){

  var type = $(element).val();
  var suffix = $(element).attr("id").split("_")[1];

  var selectElement = $("#nameTechnicalReq_" + suffix);
  selectElement.empty();

  if(type != "")
  {
    if(type == arrayTechnicalType[0]){
      arrayNamesOS.forEach(function(element){
        selectElement.append(new Option(element));
      })
    }
    else
    {
      arrayNameBrowser.forEach(function(element){
        selectElement.append(new Option(element));
      })
    }

  };

  if(arguments[1] != null)
  {
    $("#"+arguments[1]).val(arguments[2]);
  }
}

