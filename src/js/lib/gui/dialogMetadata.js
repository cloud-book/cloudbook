/**
 * @class DialogMetadata
 * @classdesc This class is responsible for creating elements of a Dialog. 
 */
function DialogMetadata(){

    var arrayEstructuras = ["Atómica", "Colección", "Lineal", "Jerárquica","En red"];
    var arrayAgregaciones = ["Nivel 1 - Medias y medias integradas", "Nivel 2 - Objetos de aprendizaje", 
    "Nivel 3 - Secuencias didácticas", "Nivel 4 - Cursos, planes y programas de formación"];
    var arrayEstatus = ["Borrador", "Final", "Revisado", "No disponible"]
    var arrayRoles = ["Autor", "Editor de publicación", "Iniciador", "Terminador","Revisor", "Editor de contenido",
    "Diseñador gráfico","Desarrollador técnico", "Proveedor de contenidos","Revisor técnico", "Revisor educativo", "Guionista",
    "Diseñador educativo", "Experto en la materia"];
    var arrayTiposTecnicos = ["Sistema operativo", "Navegador"];
    var arrayNombresTecnicosSO = ["PC-dos", "MS-Windows", "Linux", "MacOS", "Unix", "Multi-so", "Ninguno"];
    var arrayNombresTecnicosNavegador = ["Cualquiera", "Mozilla Firefox", "Netscape Communicator", "MS Internet Explorer", 
    "Opera", "Amaya"];
    var arrayTipoInteractividad = ["Activo", "Expositivo", "Combinado"];
    var arrayTipoRecurso = ["Fotografía", "Ilustración", "Video", "Animación","Música", "Efecto sonoro", "Locución", "Audio compuesto", 
    "Texto narrativo", "Hipertexto, grafismo", "Media integrado", "Base de datos", "Tabla", "Gráfico,mapa conceptual", "Mapa de navegación ", 
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
    var arrayNivelInteractividad = ["Muy bajo", "Bajo", "Medio", "Alto", "Muy alto"];
    var arrayDensidadSemantica = ["Muy baja", "Baja", "Media", "Alta", "Muy alta"];
    var arrayDestinatarioTipo = ["Alumno", "Alumno con necesidades educativas especiales", "Alumno con altas capacidades intelectuales",
    "Alumno con integración tardía en sistema educativo", "Alumno con otras necesidades específicas de apoyo educativo",
    "público en general"];
    var arrayDestinatarioAgrupamiento = ["Individual", "Grupal"];
    var arrayDestinatarioEducador = ["Docente", "Tutor", "Familia"];
    var arrayDestinatarioExpertos = ["Documentalista", "Informático", "Administrador", "Experto en educación", "Experto en la materia"];
    var arrayContextoLugar = ["Aula", "Laboratorio", "Entorno real", "Domicilio", "Mixto"];
    var arrayContextoAsistencia = ["Docente", "Tutor", "Familia", "Compañero", "Independiente", "Mixta"];
    var arrayContextoModalidad = ["Presencial", "Semipresencial", "Distancia"];
    var arrayDificultad = ["Muy fácil", "Fácil", "Medio", "Difícil", "Muy difícil"];
    var arrayProcesoCognitivo = ["Analizar", "Aplicar","Colaborar","Comparar","Compartir", "Competir","Comprender"
    ,"Comprobar","Comunicar", "Contextualizar","Controlar","Cooperar","Crear","Decidir", "Definir","Describir"
    ,"Discutir","Diseñar","Evaluarse", "Explicar","Extrapolar","Innovar","Investigar","Juzgar","Motivar","Observar"
    ,"Organizar","Organizarse","Planificar","Practicar","Producir","Reconocer","Recordar", "Redactar","Reflexionar"
    ,"Relacionar","Representar", "Resolver","Simular","Sintetizar", "Valorar"];
    var arrayCoste = ["Sí", "No"];
    var arrayDerechosAutor = ["Licencia propietaria", "Licencia libre EUPL", "Licencia libre GPL", "Licencia libre dual GPL y EUPL",
    "Otras licencias libres", "Dominio público", "No corresponde", "Creative commons: reconocimiento", "Creative commons: reconocimiento - sin obra derivada"
    ,"Creative commons: reconocimiento - sin obra derivada - no comercial", "Creative commons: reconocimiento - no comercial",
    "Creative commons: reconocimiento - no comercial - compartir igual", "Creative commons: reconocimiento - compartir igual", 
    "Licencia GFDL"];
    var arrayTiposAcceso = ["Universal", "No universal"];
    var arrayTipoRelacion = ["Es parte de", "Tiene parte", "Es versión de", "Tiene versión", "Es formato de", "Tiene formato",
    "Referencia", "Es referenciado por", "Se basa en", "Es base para", "Requiere", "Es requerido por"];
    var arrayPropositos = ["Disciplina", "Idea", "Prerrequisito", "Objetivo educativo", "Restricciones de accesibilidad",
    "Nivel educativo", "Nivel de habilidad", "Nivel de seguridad", "Competencia"];

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
    .append(CBDialog.createHeader("General (Obligatorio)"))
    .append(CBDialog.createDiv("general")
      .append(CBDialog.createFieldsetWithDivElements("Identificador", "cat_1", [["Span", "Catálogo: ", "spanCatalogo_1", "metadata-text"],
        ['Input', "catalogo_1","metadata-box-half"], ["Span", "Entrada: ", "spanEntrada_1", "metadata-text-right"], 
        ['Input', "entrada_1","metadata-box-half"], ["AddButton", "addCatalog_1", "ui-icon-locked", "cat_1"],
        ["DeleteButton", "deleteCatalog_1", "ui-icon-locked", "cat_1"]]))
      .append(CBDialog.createFieldsetWithDivElements("Título", "tit_1", [['Input', "titulo_1","metadata-box-half-plus"], 
        ["Span", "Idioma: ", "spanIdioma_1", "metadata-text-right"], 
        ['SelectLanguage', "tituloLang_1","metadata-box-half"], ["AddButton", "addTitulo_1", "ui-icon-locked", "tit_1"],
        ["DeleteButton", "deleteTitulo_1", "ui-icon-locked", "tit_1"]]))
      .append(CBDialog.createFieldsetWithDivElements("Idioma", "idiom_1", [['SelectLanguage', "tituloLang_1","metadata-box-long"], 
        ["AddButton", "addIdioma", "ui-icon-locked", "idiom_1"], ["DeleteButton", "deleteIdioma_1", "ui-icon-locked", "idiom_1"]]))
      .append(CBDialog.createFieldsetWithDivElements("Descripción", "descUsoEducativo_1", [['Input', "descripcion_1","metadata-box-half-plus"], 
        ["Span", "Idioma: ", "spanIdioma_1", "metadata-text-right"], 
        ['SelectLanguage', "tituloLang_1","metadata-box-half"], ["AddButton", "addDesc_1", "ui-icon-locked", "descUsoEducativo_1"],
        ["DeleteButton", "deleteDesc_1", "ui-icon-locked", "descUsoEducativo_1"]]))
      .append(CBDialog.createFieldsetWithDivElements("Palabra clave", "clave_1", [['Input', "clave1_1","metadata-box-half-plus"], 
        ["Span", "Idioma: ", "spanIdioma_1", "metadata-text-right"], 
        ['SelectLanguage', "tituloLang_1","metadata-box-half"], ["AddButton", "addClave_1", "ui-icon-locked", "clave_1"],
        ["DeleteButton", "deleteClave_1", "ui-icon-locked", "clave_1"]]))
      .append(CBDialog.createFieldsetWithDivElements("Ámbito", "cobertura_1", [['Input', "cobertura1_1","metadata-box-half-plus"], 
        ["Span", "Idioma: ", "spanIdioma_1", "metadata-text-right"], 
        ['SelectLanguage', "tituloLang_1","metadata-box-half"], ["AddButton", "addCobertura_1", "ui-icon-locked", "cobertura_1"],
        ["DeleteButton", "deleteCobertura_1", "ui-icon-locked", "cobertura_1"]]))
      .append(CBDialog.createFieldsetWithDivElements("Estructura", "estructura_1", [['Select', "estructuras_1",arrayEstructuras, "metadata-box-all"]]))
      .append(CBDialog.createFieldsetWithDivElements("Nivel de agregación", "agregacion_1", [['Select', "agregaciones_1",arrayAgregaciones, "metadata-box-all"]])))

    .append(CBDialog.createHeader("Ciclo de vida"))
    .append(CBDialog.createDiv("ciclovida")
      .append(CBDialog.createFieldsetWithDivElements("Versión", "version_1", [["Input", "version1_1", "metadata-box-half-plus"],
        ["Span", "Idioma: ", "spanIdioma_1", "metadata-text-right"], ['SelectLanguage', "tituloLang_1","metadata-box-half"], 
        ["AddButton", "addVersion_1", "ui-icon-locked", "version_1"], ["DeleteButton", "deleteVersion_1", "ui-icon-locked", "version_1"]]))
      .append(CBDialog.createFieldsetWithDivElements("Estatus", "estatus_1", [['Select', "valoresestatus_1",arrayEstatus, "metadata-box-all"]]))
      .append(CBDialog.createFieldsetWithDivElements("Contribución", "contr_1", [["Span", "Rol: ", "spanRol_1", "metadata-text"],["Select", "roles_1", arrayRoles, "metadata-box"],
        ["AddButton", "addContrib_1", "ui-icon-locked", "contr_1"], ["DeleteButton", "deleteContrib_1", "ui-icon-locked", "contr_1"], 
        ["Span", "Nombre: ", "spanNombre_1", "metadata-text"],["Input", "nombre_1", "metadata-box"],["Span", "Organización: ", "spanOrgan_1", "metadata-text"], 
        ["Input", "organ_1", "metadata-box"],["Span", "E-mail: ", "spanemail_1", "metadata-text"],["Input", "correoe_1", "metadata-box"],
        ["Span", "Fecha: ", "spanfecha_1", "metadata-text"],["Date", "fechaCont", "metadata-box"],["Div", "desccontr_1_1", [["Span", "Descripción: ", "spanDescripcion_1_1", "metadata-text"],
        ["Input", "descripcion_1_1", "metadata-box-half"], ["Span", "Idioma: ", "spanIdioma_1_1", "metadata-text-right"],
        ['SelectLanguage', "tituloLang_1_1","metadata-box-half"], ["AddButtonDiv", "addDesc_1_1", "ui-icon-locked", "desccontr_1_1"], 
        ["DeleteButtonDiv", "deleteDesc_1_1", "ui-icon-locked", "desccontr_1_1"]]]])))

    .append(CBDialog.createHeader("Meta-Metadatos"))
    .append(CBDialog.createDiv("metametadatos")
      .append(CBDialog.createFieldsetWithDivElements("Identificador", "catMeta_1", [["Span", "Catálogo: ", "spanCatalogo_1", "metadata-text"],
        ['Input', "catalogo_1","metadata-box-half"], ["Span", "Entrada: ", "spanEntrada_1", "metadata-text-right"], 
        ['Input', "entrada_1","metadata-box-half"], ["AddButton", "addCatalog_1", "ui-icon-locked", "catMeta_1"],
        ["DeleteButton", "deleteCatalog_1", "ui-icon-locked", "catMeta_1"]]))
      .append(CBDialog.createFieldsetWithDivElements("Esquema de metadatos", "esquemamet_1", [['Input', "esquema_1","metadata-box-all"]]))
      .append(CBDialog.createFieldsetWithDivElements("Idioma", "idioma_1", [['SelectLanguage', "tituloLang_1","metadata-box-all"]]))
      .append(CBDialog.createFieldsetWithDivElements("Contribución", "contrmeta_1", [["Span", "Rol: ", "spanRol_1", "metadata-text"],["Select", "roles_1", arrayRoles, "metadata-box"],
        ["AddButton", "addContrib_1", "ui-icon-locked", "contrmeta_1"], ["DeleteButton", "deleteContrib_1", "ui-icon-locked", "contrmeta_1"], 
        ["Span", "Nombre: ", "spanNombre_1", "metadata-text"],["Input", "nombre_1", "metadata-box"],["Span", "Organización: ", "spanOrgan_1", "metadata-text"], 
        ["Input", "organ_1", "metadata-box"],["Span", "E-mail: ", "spanemail_1", "metadata-text"],["Input", "correoe_1", "metadata-box"],
        ["Span", "Fecha: ", "spanfecha_1", "metadata-text"],["Date", "fechaCont", "metadata-box"],["Div", "desccontrmeta_1", [["Span", "Descripción: ", "spanDescripcion_1_1", "metadata-text"],
        ["Input", "descripcion_1_1", "metadata-box-half"], ["Span", "Idioma: ", "spanIdioma_1_1", "metadata-text-right"],
        ['SelectLanguage', "tituloLang_1_1","metadata-box-half"], ["AddButtonDiv", "addDesc_1_1", "ui-icon-locked", "desccontrmeta_1"], 
        ["DeleteButtonDiv", "deleteDesc_1_1", "ui-icon-locked", "desccontrmeta_1"]]]])))

    .append(CBDialog.createHeader("Técnica"))
    .append(CBDialog.createDiv("tecnica")
      .append(CBDialog.createFieldsetWithDivElements("Formato", "formato_1", [['Input', "formato1_1","metadata-box-long"], 
      ["AddButton", "addDesc_1", "ui-icon-locked", "formato_1"], ["DeleteButton", "deleteDesc_1", "ui-icon-locked", "formato_1"]]))
      .append(CBDialog.createFieldsetWithDivElements("Tamaño", "tamaño_1", [['Input', "tamaño1_1","metadata-box-all"]]))
      .append(CBDialog.createFieldsetWithDivElements("Localización", "localizacion_1", [['Input', "localizacion1_1","metadata-box-long"], 
      ["AddButton", "addLoc_1", "ui-icon-locked", "localizacion_1"],["DeleteButton", "deleteLoc_1", "ui-icon-locked", "localizacion_1"]]))
      .append(CBDialog.createFieldset("Requisitos")
        .append(CBDialog.createDiv("requisitos_1")
          .append(CBDialog.createSpan("Tipo: ", "spanTipo_1", "metadata-text"))
          .append(CBDialog.createSelect("tipoTecnico_1", arrayTiposTecnicos, "metadata-box-half").on('change', function (){
                var selectElement = $("#nombreTecnico_1");
                selectElement.empty();
                var array;
                if(this.value == arrayTiposTecnicos[0])
                  array = arrayNombresTecnicosSO;
                else
                  array = arrayNombresTecnicosNavegador;

                array.forEach(function(element){
                  selectElement.append(new Option(element));
                })
          }))
          .append(CBDialog.createAddButton("addLoc_1","ui-icon-locked", "requisitos_1"))
          .append(CBDialog.createDeleteButton("deleteLoc_1","ui-icon-locked","requisitos_1"))      
          .append(CBDialog.createSpan("Nombre: ", "spanNombre_1", "metadata-text-right"))
          .append(CBDialog.createSelect("nombreTecnico_1", arrayNombresTecnicosSO, "metadata-box-half"))
          .append(CBDialog.createSpan("Versión mínima: ", "spanVersMin_1", "metadata-text"))
          .append(CBDialog.createInput("versmin_1","metadata-box"))
          .append(CBDialog.createSpan("Versión máxima: ", "spanVersMax_1", "metadata-text"))
          .append(CBDialog.createInput("versmax_1","metadata-box"))
        )
      )
      .append(CBDialog.createFieldsetWithDivElements("Pautas de instalación", "pautasinst_1", [['Input', "pautasinst1_1","metadata-box-half-plus"], 
        ["Span", "Idioma: ", "spanIdioma_1", "metadata-text-right"],['SelectLanguage', "tituloLang_1","metadata-box-half"], 
        ["AddButton", "addPautasInst_1", "ui-icon-locked", "pautasinst_1"],["DeleteButton", "deletePautasInst_1", "ui-icon-locked", "pautasinst_1"]]))
      .append(CBDialog.createFieldsetWithDivElements("Otros requisitos de plataforma", "requisitosins_1", [['Input', "requisitosins1_1","metadata-box-half-plus"], 
        ["Span", "Idioma: ", "spanIdioma_1", "metadata-text-right"],['SelectLanguage', "tituloLang_1","metadata-box-half"], 
        ["AddButton", "addRequisitosInst_1", "ui-icon-locked", "requisitosins_1"],["DeleteButton", "deleteRequisitosInst_1", "ui-icon-locked", "requisitosins_1"]]))
      .append(CBDialog.createFieldsetWithDivElements("Duración", "duracion_1", [["Span", "Años: ", "spanAños_1", "metadata-text"],["Input", "duracionaños_1", "metadata-box-half"],
        ["Span", "Meses: ", "spanMeses_1", "metadata-text-right"],["InputWithBr", "duracionmeses_1", "metadata-box-half"],
        ["Span", "Días: ", "spanDias_1", "metadata-text"],["Input", "duraciondias_1", "metadata-box-half"],
        ["Span", "Horas: ", "spanHoras_1", "metadata-text-right"],["InputWithBr", "duracionhoras_1", "metadata-box-half"],
        ["Span", "Minutos: ", "spanMinutos_1", "metadata-text"],["Input", "duracionminutos_1", "metadata-box-half"],
        ["Span", "Segundos: ", "spanSegundos_1", "metadata-text-right"],["InputWithBr", "duracionsegundos_1", "metadata-box-half"],
        ["Div", "descduracion_1", [["Span", "Descripción: ", "spanDescripcion_1", "metadata-text"],
        ["Input", "descripcion_1", "metadata-box-half"], ["Span", "Idioma: ", "spanIdioma_1", "metadata-text-right"],
        ['SelectLanguage', "addDescDuracion_1","metadata-box-half"], ["AddButton", "addDescDuracion_1", "ui-icon-locked", "descduracion_1"], 
        ["DeleteButtonDiv", "deleteDescDuracion_1", "ui-icon-locked", "descduracion_1"]]]])))

    .append(CBDialog.createHeader("Uso educativo"))
    .append(CBDialog.createDiv("usoeducativo")
      .append(CBDialog.createFieldsetWithDivElements("Tipo de interactividad", "formato_1", [['Select', "formato_1", arrayTipoInteractividad,"metadata-box-all"]]))
      .append(CBDialog.createFieldsetWithDivElements("Tipo de recurso educativo", "tipoRecur_1", [['Select', "tipoRecur_1",arrayTipoRecurso ,"metadata-box-long"], 
        ["AddButton", "addTipoRecur_1", "ui-icon-locked", "tipoRecur_1"],["DeleteButton", "deleteTipoRecur_1", "ui-icon-locked", "tipoRecur_1"]]))
      .append(CBDialog.createFieldsetWithDivElements("Nivel de interactividad", "nivelInter_1", [['Select', "nivelInt_1", arrayNivelInteractividad,"metadata-box-all"]]))
      .append(CBDialog.createFieldsetWithDivElements("Densidad semántica", "nivelDens_1", [['Select', "nivelDensSem_1", arrayDensidadSemantica,"metadata-box-all"]]))
      .append(CBDialog.createFieldsetWithDivElements("Destinatario", "dest_1", [["Span", "Tipo aprendiz: ", "spanTipoAprendiz_1", "metadata-text"],
        ['Select', "TipoAprendiz_1",arrayDestinatarioTipo,"metadata-box-half-wbuttons"], ["Span", "Agrupamiento: ", "spanAgrupamiento_1", "metadata-text-right"], 
        ['Select', "Agrupamiento_1", arrayDestinatarioAgrupamiento,"metadata-box-half-wbuttons"], ["Span", "Educador: ", "spanEducador_1", "metadata-text"], 
        ['Select', "Educador_1", arrayDestinatarioEducador,"metadata-box-half-wbuttons"], ["Span", "Expertos: ", "spanExpertos_1", "metadata-text-right"], 
        ['Select', "Expertos_1", arrayDestinatarioExpertos,"metadata-box-half-wbuttons"]]))
      .append(CBDialog.createFieldsetWithDivElements("Lugar de utilización", "lugarutil_1", [["Span", "Lugar: ", "spanLugar_1", "metadata-text"],
        ['Select', "Lugar_1",arrayContextoLugar,"metadata-box-half-wbuttons"], ["Span", "Asistencia: ", "spanAsistencia_1", "metadata-text-right"], 
        ['Select', "Asistencia_1", arrayContextoAsistencia,"metadata-box-half-wbuttons"], ["Span", "Modalidad: ", "spanModalidad_1", "metadata-text"], 
        ['Select', "Educador_1", arrayDestinatarioEducador,"metadata-box-half-wbuttons"]]))
      .append(CBDialog.createFieldsetWithDivElements("Rango típico de edad", "rangoEdad_1", [['Input', "rangoEdadval_1","metadata-box-half-plus"], 
        ["Span", "Idioma: ", "spanIdioma_1", "metadata-text-right"],['SelectLanguage', "tituloLang_1","metadata-box-half"], 
        ["AddButton", "addRangoEdad_1", "ui-icon-locked", "rangoEdad_1"],["DeleteButton", "deleteRangoEdad_1", "ui-icon-locked", "rangoEdad_1"]]))
      .append(CBDialog.createFieldsetWithDivElements("Dificultad", "dificultad_1", [['Select', "dificultadDest_1", arrayDificultad,"metadata-box-all"]]))
      .append(CBDialog.createFieldsetWithDivElements("Tiempo típico de aprendizaje", "tiempoAprendizaje_1", [["Span", "Años: ", "spanAños_1", "metadata-text"],["Input", "duracionaños_1", "metadata-box-half"],
        ["Span", "Meses: ", "spanMeses_1", "metadata-text-right"],["InputWithBr", "duracionmeses_1", "metadata-box-half"],
        ["Span", "Días: ", "spanDias_1", "metadata-text"],["Input", "duraciondias_1", "metadata-box-half"],
        ["Span", "Horas: ", "spanHoras_1", "metadata-text-right"],["InputWithBr", "duracionhoras_1", "metadata-box-half"],
        ["Span", "Minutos: ", "spanMinutos_1", "metadata-text"],["Input", "duracionminutos_1", "metadata-box-half"],
        ["Span", "Segundos: ", "spanSegundos_1", "metadata-text-right"],["InputWithBr", "duracionsegundos_1", "metadata-box-half"],
        ["Div", "descAprendizaje_1", [["Span", "Descripción: ", "spanDescripcion_1", "metadata-text"],
        ["Input", "descripcion_1", "metadata-box-half"], ["Span", "Idioma: ", "spanIdioma_1", "metadata-text-right"],
        ['SelectLanguage', "addDescDuracion_1","metadata-box-half"], ["AddButton", "addDescDuracion_1", "ui-icon-locked", "descAprendizaje_1"], 
        ["DeleteButtonDiv", "deleteDescDuracion_1", "ui-icon-locked", "descAprendizaje_1"]]]]))
      .append(CBDialog.createFieldsetWithDivElements("Descripción", "descUsoEducativo_1", [['Input', "descripcion_1","metadata-box-half-plus"], 
        ["Span", "Idioma: ", "spanIdioma_1", "metadata-text-right"],['SelectLanguage', "tituloLang_1","metadata-box-half"], 
        ["AddButton", "addDesc_1", "ui-icon-locked", "descUsoEducativo_1"],["DeleteButton", "deleteDesc_1", "ui-icon-locked", "descUsoEducativo_1"]]))
      .append(CBDialog.createFieldsetWithDivElements("Idioma", "idiom_1", [['SelectLanguage', "tituloLang_1","metadata-box-all"]]))
      .append(CBDialog.createFieldsetWithDivElements("Proceso cognitivo", "procesocog_1", [['Select', "procesoCognitivo_1", arrayProcesoCognitivo,"metadata-box-long"], 
        ["AddButton", "addProcesoCog_1", "ui-icon-locked", "procesocog_1"],["DeleteButton", "deleteProcesoCog_1", "ui-icon-locked", "procesocog_1"]])))

     .append(CBDialog.createHeader("Derechos"))
     .append(CBDialog.createDiv("derechos")
      .append(CBDialog.createFieldsetWithDivElements("Coste", "coste_1", [['Select', "costeCombo_1", arrayCoste,"metadata-box-all"]])) 
      .append(CBDialog.createFieldsetWithDivElements("Derechos de autor y otras restricciones", "derechosautor_1", [['Select', "derechosautorCombo_1", arrayDerechosAutor,"metadata-box-all"]])) 
      .append(CBDialog.createFieldsetWithDivElements("Descripción", "descDerechos_1", [['Input', "descripcion_1","metadata-box-half-plus"], 
        ["Span", "Idioma: ", "spanIdioma_1", "metadata-text-right"],['SelectLanguage', "tituloLang_1","metadata-box-half"], 
        ["AddButton", "addDesc_1", "ui-icon-locked", "descDerechos_1"],["DeleteButton", "deleteDesc_1", "ui-icon-locked", "descDerechos_1"]]))
      .append(CBDialog.createFieldsetWithDivElements("Acceso", "acceso_1", [["Span", "Tipo de acceso: ", "spanTipoAcceso_1", "metadata-text"],
        ['Select', "tipoacceso_1",arrayTiposAcceso,"metadata-box-long-wtext"], ["Span", "Descripción: ", "spanDescripcion_1", "metadata-text"], 
        ['Input', "descripcion_1", "metadata-box-half-wbuttons"], ["Span", "Idioma: ", "spanIdioma_1", "metadata-text-right"], 
        ['SelectLanguage', "tituloLang_1","metadata-box-half-wbuttons"]])))

     .append(CBDialog.createHeader("Relación"))
      .append(CBDialog.createDiv("relacion")
        .append(CBDialog.createFieldsetWithDivElements("Relaciones", "relacion_1", [["Span", "Tipo Relación: ", "spanTipoRel_1", "metadata-text"],
          ['Select', "tipoRelacionCombo_1",arrayTipoRelacion,"metadata-box"], ["AddButton", "addRecurso_1", "ui-icon-locked", "relacion_1"],
          ["DeleteButton", "deleteRecurso_1", "ui-icon-locked", "relacion_1"], ["Span", "Tipo Recurso: ", "spanTipoRec_1", "metadata-text"],
          ['Select', "tipoRec_1",arrayTipoRecurso,"metadata-box"], ["Span", "Catálogo: ", "spanCatalogo_1", "metadata-text"],
          ["Input", "catalogo_1", "metadata-box"] , ["Span", "Entrada: ", "spanEntrada_1", "metadata-text"],["Input", "entrada_1", "metadata-box"], 
          ["Span", "Descripción: ", "spanDescripcion_1", "metadata-text"],["Input", "descripcion_1", "metadata-box-half"],
          ["Span", "Idioma: ", "spanIdioma_1", "metadata-text-right"], ['SelectLanguage', "tituloLang_1","metadata-box-half"] 
          ])))

     .append(CBDialog.createHeader("Anotación")) 
      .append(CBDialog.createDiv("anotacion")
        .append(CBDialog.createFieldsetWithDivElements("Anotaciones", "anotacion_1", [["Span", "Nombre: ", "spanNombre_1", "metadata-text"],
          ['Input', "nombre_1", "metadata-box"], ["AddButton", "addAnotacion_1_1", "ui-icon-locked", "anotacion_1"],
          ["DeleteButton", "deleteAnotacion_1_1", "ui-icon-locked", "anotacion_1"], ["Span", "Organización: ", "spanOrgan_1", "metadata-text"],
          ['Input', "organ_1","metadata-box"], ["Span", "E-mail: ", "spanemail_1", "metadata-text"],
          ["Input", "correoe_1", "metadata-box"] , ["Span", "Fecha: ", "spanfecha_1", "metadata-text"],["Date", "fechaCont", "metadata-box"], 
          ["Span", "Descr. Fecha: ", "spanDescripcionFecha_1", "metadata-text"],["Input", "descripcionFecha_1", "metadata-box-half"],
          ["Span", "Idioma Fecha: ", "spanIdioma_1", "metadata-text-right"], ['SelectLanguage', "tituloLang_1","metadata-box-half"],
          ["Span", "Descripción: ", "spanDescripcion_1", "metadata-text"], ['Input', "descripcion_1","metadata-box-half"],
          ["Span", "Idioma: ", "spanIdiomaDesc_1", "metadata-text-right"],['SelectLanguage', "tituloLangDesc_1","metadata-box-half"]])))

    .append(CBDialog.createHeader("Clasificación"))
      .append(CBDialog.createDiv("clasificacion")
        .append(CBDialog.createFieldsetWithDivElements("Clasificaciones", "clasificaciones_1", [["Span", "Propósito: ", "spanProposito_1", "metadata-text"],
          ['Select', "tipoProposito_1",arrayPropositos,  "metadata-box"], ["AddButton", "addClasif_1", "ui-icon-locked", "clasificaciones_1"],
          ["DeleteButtonWithBr", "deleteClasif_1", "ui-icon-locked", "clasificaciones_1"], ["Span", "Descripción: ", "spanDescripcionTaxon_1_1", "metadata-text"],
          ['Input', "descripcionTaxon_1","metadata-box-half"], ["Span", "Idioma: ", "spanIdiomaTaxon_1", "metadata-text-right"],
          ["SelectLanguageWithBr", "tituloLangTaxon_1", "metadata-box-half"] , ["Span", "Palabra clave: ", "spanPalabraClaveTaxon_1", "metadata-text"],
          ["Input", "PalabraClaveTaxon_1", "metadata-box-half"], ["Span", "Idioma: ", "spanIdiomaPalabraclaveTaxon_1", "metadata-text-right"],
          ["SelectLanguageWithBr", "tituloLangPalabraclaveTaxon_1", "metadata-box-half"],
          ["DivWithBr", "ruta_1_1", [["Span", "Fuente: ", "spanFuente_1_1", "metadata-text"],
          ["Input", "nombreFuente_1_1", "metadata-box-half"], ["Span", "Idioma: ", "spanIdioma_1_1", "metadata-text-right"],
          ['SelectLanguage', "tituloLang_1_1","metadata-box-half"], ["AddButtonDiv", "addRuta_1_1", "ui-icon-locked", "ruta_1_1"], 
          ["DeleteButton", "deleteRuta_1_1", "ui-icon-locked", "ruta_1_1"], ["Span", "Nombre Taxón: ", "spanTaxon_1_1", "metadata-text"],
          ["Input", "nombreTaxon_1_1", "metadata-box-half"],["Span", "Id Taxón: ", "spanIdTaxon_1_1", "metadata-text-right"], 
          ["Input", "idTaxon_1_1", "metadata-box-half"]]]])));

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
 * This method is responsible for showing this dialog
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
        "Aceptar": function (){
          console.log($('#coverage').val());
        },
        "Cancelar": function(){
          $("#dialog").dialog("close");
        }
      }
    });
}

/**
 * This method is responsible for changing values of a select depending on another
 */
DialogMetadata.prototype.changeNames = function changeNames(){
  var arrayTiposTecnicos = ["Sistema operativo", "Navegador"];
  var arrayNombresTecnicosSO = ["PC-dos", "MS-Windows", "Linux", "MacOS", "Unix", "Multi-so", "Ninguno"];
  var arrayNombresTecnicosNavegador = ["Cualquiera", "Mozilla Firefox", "Netscape Communicator", "MS Internet Explorer", 
  "Opera", "Amaya"];

  var tipo = $(this).val();
  var selectElement = $("#nombreTecnico_1");

  if(tipo != "")
  {
    if(tipo == arrayTiposTecnicos[0]){
      arrayNombresTecnicosSO.forEach(function(element){
        selectElement.append(new Option(element));
      })
    }
    else
    {
      arrayNombresTecnicosNavegador.forEach(function(element){
        selectElement.append(new Option(element));
      })
    }

  }

   if(selectElement)
   values.forEach(function(element){
    selectElement.append(new Option(element));
    })
}

