/**
 * jsGeork JavaScript Library v0.0.6
 * http://jsgeork.geork.com/
 *
 * Copyright (c) 2014, www.geork.com, Jordi Cavallé | jsgeork.geork.com/licencia.txt |
 * Todos los derechos reservados.
 *
 * Fecha: 19 Abril 2014
 *
 * @file jsGeork JavaScript Library
 * @version 0.0.6
 * @author Jordi Cavallé
 * @copyright Jordi Cavallé 2014
*/
(function ($, document, window) {

    'use strict';

    //--- variables privadas ------------------------------------------------
    var version = "0.0.6",
        libName = "jsGeork", //nombre de la biblioteca y del objeto global
        debug = false,
        langs = {
            "es": {
                "weighting": "Ponderación",
                "total": "Total",
                "question": "Pregunta",
                "success": "Acierto",
                "points": "Puntos",
                "notanswered": "No contestado",
                "result": "Nota",
                "dates": "Fecha",
                "option": "Opción",
                "newtest": "Repetir",
                "refresh": "Actualizar",
                "delstorage": "Borrar todo",
                "prevres": "Resultados previos",
                "average": "Media",
                "check": "Comprueba",
                "hint": "Indicio",
                "attempts": "intentos",
                "corrects": "correctos",
                "previous": "Anterior",
                "next": "Siguiente",
                "onlynumbers": "Solo números",
                "infbienvenida": "Bienvenido a la biblioteca ",
                "infversion": "La versión de la biblioteca es ",
                "infobjgbl": "La biblioteca se llama utilizando el objeto global ",
                "infjq": "Antes de su utilización debe cargarse la biblioteca jQuery.",
                "infme": "Módulo con información sobre la biblioteca.",
                "fillthegapinp": "Rellene el hueco introduciendo la solución",    //accesibilidad para los huecos
                "fillthegapsel": "Rellene el hueco seleccionando la respuesta",
                "inpnumfill": "Introduzca un número en el cuadro de entrada",
                "inptxtfill": "Introduzca un texto en el cuadro de entrada",
                "inpfill": "Introduzca un valor en el cuadro de entrada",
                "gapko": "&#160;&#160;?&#160;&#160;",
                "titlecheck": "Pulse para comprobar las respuestas",
                "titlehint": "Pulse para obtener una ayuda",
                "titlenext": "Pulse para pasar a la siguiente actividad",
                "titleprev": "Pulse para pasar a la actividad anterior",
                "titlenewtest": "Pulse para realizar de nuevo el test",
                "titlerefresh": "Pulse para actualizar la tabla",
                "titledelsto": "Pulse para borrar el almacenamiento",
                "fscore": "Nota obtenida $score$ sobre un total de $total$",
                "actscore": "$score$ puntos obtenidos en la actividad $act$, $%$ de los $ptot$ puntos en juego, sobre los $total$ puntos que vale la prueba",
                "actdone": " actividades realizadas.",
                "actnosubmit": "Actividad por realizar.",
                "lasttime": "Hora de la última actualización",
                "ok": "Correcto",
                "ko": "Error"
            },
            "ct": {
                "weighting": "Ponderació",
                "total": "Total",
                "question": "Pregunta",
                "success": "Encert",
                "points": "Punts",
                "notanswered": "No contestat",
                "result": "Nota",
                "dates": "Data",
                "option": "Opció",
                "newtest": "Repetir",
                "refresh": "Actualitzar",
                "delstorage": "Borrar tot",
                "prevres": "Resultats previs",
                "average": "Mitja",
                "check": "Comprova",
                "hint": "Indici",
                "attempts": "intents",
                "corrects": "correctes",
                "previous": "Anterior",
                "next": "Sigüent",
                "onlynumbers": "Només números",
                "infbienvenida": "Benvingut a la biblioteca ",
                "infversion": "La versió de la biblioteca és ",
                "infobjgbl": "La biblioteca es crida utilitzant l'objecte global ",
                "infjq": "Abans de la seva utilització s'ha de carregar la biblioteca jQuery.",
                "infme": "Mòdul amb informació sobre la biblioteca.",
                "fillthegapinp": "Ompli el forat introduint la solució", //acessibilitat
                "fillthegapsel": "Ompli el forat seleccionant la resposta",
                "inpnumfill": "Introduïu un número en el quadre d'entrada",
                "inptxtfill": "Introduïu un text en el quadre d'entrada",
                "inpfill": "Introduïu un valor en el quadre d'entrada",
                "gapko": "&#160;&#160;?&#160;&#160;",
                "titlecheck": "Premi per comprovar les respostes",
                "titlehint": "Feu clic per obtenir una ajuda",
                "titlenext": "Feu clic per passar a la següent activitat",
                "titleprev": "Feu clic per passar a l'activitat anterior",
                "titlenewtest": "Premi per realitzar de nou el test",
                "titlerefresh": "Premi per actualitzar la taula",
                "titledelsto": "Premi per esborrar l'emmagatzematge",
                "fscore": "Nota obtinguda $score$ sobre un total de $total$",
                "actscore": "$score$ punts obtinguts en l'activitat $act$, $%$ dels $ptot$ punts en joc, sobre $total$ punts que val la prova",
                "actdone": " activitats realitzades.",
                "actnosubmit": "Activitat per realitzar.",
                "lasttime": "Hora de l'última actualització",
                "ok": "Correcte",
                "ko": "Error"
            }
        },
        lang = langs.es || {},
        //estilos CSS utilizados
        styles = {
            "act": "CSSActivity", //estilo para el bloque de las actividades
            "actfield": "CSSActFieldset", //estilo para los fielset de las actividades
            "testhint": "CSSActivityHint", //estilo para la ayuda con los aciertos en las actividades tipo multi
            "testsolok": "CSSActivitySolOk", //estilo para el bloque con atributo data-info-ok="idact" que se muestra cuando se resuelve bien
            "testsolko": "CSSActivitySolKo", //estilo para el bloque con atributo data-info-ko="idact" que se muestra cuando se resuelve mal
            "testok": "CSSActivityOk", //estilo que se suma al CSSActivityHint cuando se ha acertado
            "btn": "CSSActivityButton", //botones
            "btntblstore": "CSSStoreButton", //botones de las tablas con los resultados previos (Borrar todo)
            "btntblresults": "CSSTblTestButton", //botones de las tablas con los resultados de los tests
            "btntblrefresh": "CSSTblRefreshButton", //botones de las tablas con los resultados de las actividades
            "testptsi": "CSSActivityOptPtsI", //estilo para las opciones seleccionadas con un valor menor de 50
            "testptss": "CSSActivityOptPtsS",  //estilo para las opciones seleccionadas con un valor entre 50 y 59
            "testptsb": "CSSActivityOptPtsB",  //estilo para las opciones seleccionadas con un valor entre 60 y 69
            "testptsn": "CSSActivityOptPtsN",  //estilo para las opciones seleccionadas con un valor entre 70 y 89
            "testptse": "CSSActivityOptPtsE",  //estilo para las opciones seleccionadas con un valor entre 90 y 100
            "hexent": "glyphs", //estilos para incluir las entidades hexadecimales
            "divout": "CSSDivOut",  //bloque de salida
            //-------------------------------------
            "inftxtpm": "CSSInfoTextPemPms", //estilos para los divs con el contenido data-info-bottom="" de las actividades single y multi
            "inftxtpgf": "CSSInfoTextPgf", //estilos para los divs con el contenido data-info-bottom="" de las actividades gapfill
            "inftxtpip": "CSSInfoTextPip", //estilos para los divs con el contenido data-info-bottom="" de las actividades input
            "inftxtptt": "CSSInfoTextPtt", //estilos para los divs con el contenido data-info-bottom="" de los test
            "optok": "CSSActivityOptOk", //estilos para las opciones cuando están acertadas
            "optko": "CSSActivityOptKo", //estilos para las opciones cuando están falladas
            //-------------------------------------
            "inptxt": "CSSActInputText", //estilo para los inputs para entrar texto
            "inpnum": "CSSActInputNumber", //estilo para los inputs para entrar números
            "inptxtko": "CSSActInputTextKo", //estilo para cuando los inputs de texto se han fallado
            "inptxtok": "CSSActInputTextOk", //estilo para cuando los inputs de texto se han acertado
            "inpnumko": "CSSActInputNumberKo", //estilo para cuando los inputs de números se han acertado
            "inpnumok": "CSSActInputNumberOk", //estilo para cuando los inputs de números se han fallado
            "inphint": "CSSActInputHint",    //estilo para el div con el hint en las actividades input
            "inpbtnhint": "CSSActInputBtnHint",    //estilo para el botón hint en las actividades input
            "inpinf": "CSSActInputInfo", //estilo para el div de salida los intentos y los aciertos en las actividades input y gapfill
            //-------------------------------------
            "gapinp": "CSSActGapInput", //estilo para los inputs de las actividades de rellenar huecos
            "gapwords": "CSSActGapFillShowWords", //estilo para el div con las palabras alternativas de las actividades tipo gapfill
            "gapok": "CSSActGapFillOk", //estilo para los gaps acertados cuando quedan intentos
            "gapko": "CSSActGapFillKo", //estilo para los gaps fallados cuando quedan intentos
            "gapokend": "CSSActGapFillOkEnd", //estilo para los gaps acertados cuando se han agotado los intentos
            "gapkoend": "CSSActGapFillKoEnd", //estilo para los gaps fallados cuando se han agotado los intentos
            "gapout": "CSSActGapFillOut", //estilo en el div de salida con los intentos y los aciertos de las actividades tipo gapfill
            "gapoutendok": "CSSActGapFillOutEndOk", //estilo en el div de salida con los intentos y los aciertos de las actividades tipo gapfill cuando no quedan intentos y se ha acertado
            "gapoutendko": "CSSActGapFillOutEndKo", //estilo en el div de salida con los intentos y los aciertos de las actividades tipo gapfill cuando no quedan intentos y se ha fallado
            "gapbtnhint": "CSSActGapFillBtnHint",    //estilo para el botón hint en las actividades gapfill
            "stofill": "CSSActGapFillFromStorage", //estilo que indica que el valor del input se ha cargado ya que el storage indica que se había resuelto antes la actividad bien
            //-------------------------------------
            "stodiv": "CSSActivityStorageDiv", //div en el que se incluye la tabla con los resultados previos cargados del storage
            "stotbl": "CSSActivityStorageTbl", //tabla con los resultados previos cargados del storage
            "stotrpair": "CSSActivityStorageTrPair", //fila par de la tabla con los resultados previos cargados del storage
            "stotrodd": "CSSActivityStorageTrOdd", //fila impar de la tabla con los resultados previos cargados del storage
            "stotrtot": "CSSActivityStorageTrTot", //fila del total de la tabla con los resultados previos cargados del storage
            "stotota": "CSSActivityStorageTrTotA",  //columna con la palabra 'Media' de la tabla con los resultados previos cargados del storage
            "stototb": "CSSActivityStorageTrTotB",  //columna con la media de la tabla con los resultados previos cargados del storage
            "stofilled": "CSSActivityOptFilledFromStorage", //estilo que indica que el valor de la opción se ha cargado ya que el storage indica que se había resuelto antes la actividad bien
            //-------------------------------
            "form": "CSSTestForm", //estilo para las etiquetas form
            "testfield": "CSSTestFieldset", //estilo para los fielset de los test
            "sldctrl": "CSSSlideControls", //estilo para el bloque con los controles para pasar actividades
            "sldprev": "CSSSlideCtrlPrev", //estilo para pasar a la actividad previa cuando flow=slide
            "sldinf": "CSSSlideCtrlInfo", //estilo para los números que indican en que actividad estamos del total (Ej.: 1/3)  cuando flow=slide
            "sldnext": "CSSSlideCtrlNext", //estilo para pasar a la actividad siguiente cuando flow=slide
            "trnctrl": "CSSTrainControls", //estilo para el bloque con los controles para pasar actividades cuando flow=train
            "trnnext": "CSSTrainCtrlNext", //estilo para pasar a la actividad siguiente cuando flow=train
            "trnlast": "CSSTrainCtrlLast", //estilo para chequear la actividad siguiente cuando flow=train
            "testboxsub": "CSSTestBoxSubmit", //estilo para el bloque que incluye el botón de entrega en los tests
            "testbtnsub": "CSSTestBtnSubmit", //estilo para el botón de enregar en los tests
            "trnslider": "CSSTrainSlider", //estilo para el slider cuando flow=train
            "trnsliderprg": "CSSTrainSliderProgress", //estilo para el slider cuando flow=train
            "trnslidertxt": "CSSTrainSliderText", //estilo para el slider cuando flow=train
            //-------------------------------
            "tblres": "CSSTestTableRes", //estilo para la tabla de resultados en los tests
            "tblresth": "CSSTestTableResTh", //estilo para la fila head de la tabla de resultados en los tests
            "tblrestrpair": "CSSTestTableResTrPair", //estilo para las filas par de la tabla de resultados en los tests
            "tblrestrodd": "CSSTestTableResTrOdd", //estilo para las filas impar de la tabla de resultados en los tests
            "tblressl": "CSSTestTableResSL", //estilo para el número de actividad (Ej.: #2) con link de la tabla de resultados en los tests
            "tblresll": "CSSTestTableResLL", //estilo para el nombre de actividad con link de la tabla de resultados en los tests
            "tblrestrtot": "CSSTestTableResTrTot", //estilo para la fila del total de la tabla de resultados en los tests
            "tblrestdnew": "CSSTestTableResTdNew", //estilo para la columna con el botón para un nuevo test de la tabla de resultados en los tests
            "tblrestdrfsh": "CSSTestTableResTdRefresh", //estilo para la columna con el botón para actualizar de la tabla de resultados de las actividades
            "tblrestdtota": "CSSTestTableResTdTotA", //estilo para la columna con la palabra 'Total' de la tabla de resultados en los tests
            "tblrestdtotb": "CSSTestTableResTdTotB", //estilo para la columna con el total de la tabla de resultados en los tests
            //-------------------------------
            "tblrestrnumact": "CSSTestTableResTrNumAct" //estilo para la fila con el nº de actividades entregadas del total de la tabla de resultados en las actividades
        };
    //--- end variables privadas ------------------------------------------------

    //-------------------------------------------------------------------
    // Defino la copia local de jsGeork con un constructor
    function jsGeorkBUILDER() {

    }
    var jsGeork = new jsGeorkBUILDER();
    //Ahora puedo extender el objeto añadiendo propiedades al prototype del constructor
    //-------------------------------------------------------------------

    jsGeorkBUILDER.prototype.jsGeork = function () { return libName + " " + version; };


	
    //-------------------------------------------------------------------
    //modulo Questions para crear preguntas tipo test
    //-------------------------------------------------------------------
    /** @namespace */
    var Questions = (function () {
        
        

        //opciones de los test examen
        var options_ex = {},	//opciones del usuario
		    defaults_ex = {		//valores por defecto
		        "id": "",                   //{String} Atributo id del div en el que se colocará la pregunta. Dentro del div habrá divs auxiliares según el tipo de pregunta.
		        "type": "test",             //{String}[test||pager||checker||eval] "test"=test normal con califacación, "pager"=simplemente muestra las actividades en pantallas sin calificar, "checker"=como pager pero solo permite pasar a la siguiente actividad cuando se ha resuelto la anterior
		        "name": "",                 //{String} Nomnbre del test. Utilizado en las tablas de resultados previos.
		        //"ref": "",                //{String} referencia del problema. No utilizado
		        "formclass": "",            //{String} Clase para la etiqueta form de un test. SI no se especifica su valor es style.form
		        "form": true,               //{Boolean}[true||false] añadir etiqueta form
		        "fieldset": true,           //{Boolean}[true||false] añadir etiqueta fieldset
		        "legend": "",               //{String} texto de la leyenda para el campo fieldset.
		        "caption": "",              //{String} texto del caption de la tabla de resultados
		        "details": "",              //{String} texto del details de la tabla de resultados
		        "summary": "",              //{String} texto del summary de la tabla de resultados
		        "wai-aria": true,           //{Boolean}[true||false] si es true se añadirá código conforme a la especificación WAI-ARIA
		        //"button": lang.check,     //{String} texto del botón de chequeo
		        "icons": "csshexent",       //{String}[''||csshexent] csshexent=deben utilizarse los estilos css con entidades hexadecimales para los iconos
		        "inside": false,            //{Boolean}[true||false] si hay que mover las preguntas dentro del div del test. Quedarán fuera (delante) del formulario y fieldset del test si estos existen
		        "random": false,            //{Boolean}[true||false] si hay que ordenar aleatoriamente las preguntas. Solo se aplica si inside=true.
		        "flow": "",                 //{String}[""||slide||train] 'slide' significa que se mostrará cada actividad como una diapositiva. 'train' muestra cada pregunta una después de otra con una barra de progreso.
		        "slidercolor": "",          //{String}[""||def||def%||none||texto] color del slider. 'def' coloca el color por defecto "#33CC33", 'rate' coloca colores en función del progreso, otro valor pone el color entrado
		        "sliderinfo": "",           //{String} texto del slider. 'def' coloca el texto por defecto "step/total", 'def%' coloca el porcentaje, 'none' no pone ningún texto, otro valor pone el texto entrado
		        "qbase": 10,                //{Number} integer con la base sobre la qualificaión. Valores aceptados: 100, 20, 10, 9, 8, 7, 6, 5
		        "threshold": 50,            //{Number}[0-100] entero con el porcentaje sobre la base a partir de cual se consiera el test ok. Se utiliza para lanzar los eventos onok y onko. Por ejemplo, si score>=(qbase*(threshold/100)) -> lanzar onok, si score<(qbase*(threshold/100))  -> lanzar onko
		        "storage": "local",         //{String}[''||local||session] Si hay que guardar resultados de exámenes.
		        "storagekey": "",           //{String} Clave en la que guardar el storage. Si no se introduce la clave es el id. Si se introduce se guarda la propiedad de un objeto cuyo nombre es el id de la actividad. Por ejemplo, en los test será storagekey={ "id": [{},{},...], "id2": []}
		        "showstorage": true,        //{Boolean}[true||false] Si es true se mostrará en la tabla de resultados
		        "delstorage": true,         //{Boolean}[true||false] Si es true se mostrará en la tabla de resultados el botón para borrar el storage
		        "onready": "",              //{Function} Permite introducir una función que se llamará al terminar de preparar el test
		        "oncheck": "",              //{Function} Permite introducir una función que se añadirá al evento de entregar el test
		        "onok": "",                 //{Function} Permite introducir una función que se llamará cuando el test se considere superado, es decir se llegue al umbral definido en threshold
		        "onko": ""                  //{Function} Permite introducir una función que se llamará cuando el test se considere no superados, es decir no se llegue al umbral definido en threshold
		    };


        

        var options 		= {},	//opciones del usuario
		    defaults 		= {		//valores por defecto
		        "id": "",                       //{String} Atributo id del div en el que se colocará la pregunta. Dentro del div habrá divs auxiliares según el tipo de pregunta.
		        "name": "",                     //{String} Nomnbre de la actividad. Utilizado en las tablas de resultados previos.
		        "type": "single",               //{String}[single||multi||gapfill||input] tipo de pregunta de opciones
		        "fieldset": true,               //{Boolean}[true||false] añadir etiqueta fieldset
		        "legend": "",                   //{String} texto de la leyenda para el campo fieldset.
		        //"button": lang.check,         //{String} texto del botón. No se ponen por defecto para que sean 
		        "wai-aria": true,               //{Boolean}[true||false] si es true se añadirá código conforme a la especificación WAI-ARIA
		        "clase": "",                    //{String} clases css para el contenedor. Si no se especifica su valor es styles.act
		        "list": "",                     //{String}[""||ol||ul] utilizar listas?, cualquier valor distinto de ul equivale a ol
		        "hint": true,                   //{Boolean/String)[true||false||"html5") mostrar aciertos, solo se aplica para type=multi (mostrará aciertos al comprobar) y gapfill (saldrá un botón). En gapfill un valor html5 colocará los hints en el placeholder.
		        //"btnhint": lang.hint,         //{String} Texto del botón de indicio
		        //"opt": [{},{}],               //{Array of objects} las diferentes opciones de respuesta
		        "opt": [],
		        //"boxs": {                     //{Object} guarda las opciones de cada input. Solo se aplica para type=input.
		        //    "box1": {                 //{Array of objects} los diferentes inputbox que deben llenarse. Habrá de dos tipos identificados por la propiedad type [text||number].

		        //       }
		        //},
		        "boxs": {},
		        //--- ini gapfill ------------------------------------------------------
		        //"gaps": {                     //{Object} guarda las opciones de cada hueco. Solo se aplica para type=gapfill.
		        //    "gap1": {                 //{Object} Objeto con las opciones del hueco

		        //    }
		        //},
		        "gaps": {},
		        "attempts": 3,                  //{Number} Intentos para resolver los huecos.
		        //--- end gapfill -----------------------------------------------------
		        "random": false,                //{Boolean}[true||false] opciones de respuestas ordenadas aleatoriamente?
		        "weighting": 100,               //{Number}[0-100] Ponderación o peso de la pregunta en un examen respecto de las otras. De 0-100.
		        "lighting": 0,                  //{Number} [0-100] si se contesta algo y no se acierta. De 0-100, se tomará el valor absoluto.
		        "optsuccess": true,             //{Boolean}[true||false]  si debe mostrarse si una opción es correcta o no
		        "threshold": 100,               //{Number}[0-100] entero con el porcentaje sobre 100 a partir de cual se consiera el test ok. Se utiliza para lanzar los eventos onok y onko. Por ejemplo, si score>=threshold -> lanzar onok, si score<threshold  -> lanzar onko. En las actividades, en principio, solo se considera correcta una actividad si se obtiene el 100%.
		        "icons": "csshexent",           //{String}[''||csshexent] csshexent=deben utilizarse los estilos css con entidades hexadecimales para los iconos
		        "storage": "",                  //{String}[''||local||session] Si hay que guardar resultados anteriores. Se guardan solo si se completa bien la actividad.
		        "storagekey": "",               //{String} Clave en la que guardar el storage. Si no se introduce la clave es el id. Si se introduce se guarda la propiedad de un objeto cuyo nombre es el id de la actividad. Por ejemplo, en los test será storagekey={ "id": [{},{},...], "id2": []}
		        "fillfromstorage": false,       //{Boolean}[true||false] Si es true se mirará en el storage si la actividad ha sido completada antes. En caso afirmativo se llenarán los inputs con la respuesta correcta.
		        "showstorage": true,            //{Boolean}[true||false] Si es true se mostrará en la tabla de resultados
		        "delstorage": true,             //{Boolean}[true||false] Si es true se mostrará en la tabla de resultados el botón para borrar el storage
		        "url": "",                      //{String}   Dirección web o url de la página que contiene la actividad. Utilizado en las tablas que evaluan actividades que están en páginas diferentes a la de la tabla y en las tablas con datos del storage.
		        "onready": "",                  //{Function} Permite introducir una función que se llamará al terminar de preparar la pregunta
		        "oncheck": "",                  //{Function} Permite introducir una función que se añadirá al evento de pulsar en el botón de chequeo
		        "oncomplete": "",               //{Function} Permite introducir una función que solo se ejecutará si se han gastado los intentos. Solo se aplica para type=gapfill y type=input.
		        "onok": "",                     //{Function} Permite introducir una función que se llamará cuando la nota supere o iguale al umbral definido en la propiedad "threshold"
		        "onko": ""                      //{Function} Permite introducir una función que se llamará cuando la nota sea inferior al umbral definido en la propiedad "threshold"
		    };

        var defaults_opt = { //valores por defecto de los objetos opt
            "text": "Option X",                 //{String} texto de la opción
            "answer": "optx",                   //{String} id con la explicación de la opción
            "select": false,                    //{Boolean}[true||false] Si debe seleccionarse la opción. Solo se aplica para type=multi.
            "weight": 0                         //{Number} Peso de la opción. Solo se aplica para type=single.
        };
        var defaults_boxs = { //valores por defecto de los objetos box
            "type":"text",                      //{String}[text||number] Tipo de entrada esperada.
            "values": [],                       //{array of strings||numbers) matriz de strings o números con otras posibles soluciones correctas, además de la que pueda existir dentro del bloque html.
            //"min": null,                        //{Number} valor mínimo aceptado como respuesta válida. Solo aplica en el tipo number de los boxs.
            //"max": null,                        //{Number} valor máximo aceptado como respuesta válida. Solo aplica en el tipo number de los boxs.
            "decimals": "",                     //{Number} número de decimales pedidos. Solo aplica en el tipo number de los boxs. La propiedad decimals solo sirve para indicar al usuario cuantos decimales debe introducir, no para comprobar la solución
            "tofixed": "",                      //{Number} número de decimales a los que hay que redondear los números antes de comprobar la respuesta. Tanto los valores introducidos como la respuesta del usuario serán redondeados al número de decimales entrados.
            //"point": "float",                 //{String}[float||integer||natural] si se piden números enteros
            "accuracy": "",                     //{Number} precisión aceptada para la respuesta. Solo aplica en el tipo number de los boxs.
            "weight": 100,                      //{Number} Peso del box.
            "placeholder": "",                  //{String} Atributo placeholder del input
            "casesensitive": false,             //{Boolean}[true||false] si el hueco es sensible a mayúsculas. . Solo aplica en el tipo number de los boxs.
            "autocomplete": "",                 //{String}[on||off] Si hay que poner el atributo autocomplete en el input
            "adjustgaps": "",                   //{String}[""||none||all||size||maxlength] si los inputbox deben ajustarse a las palabras (la menos restrictiva si hay varias)
            "aria-label": lang.inpfill          //{String} Texto del atributo aria-label="" de la especificación WAI-ARIA.
            //cuando se pulse en hint se mostrará el bloque con data-info-hint=""
            //el botón para comprobar la respuesta se coloca dentro del bloque con atributo data-input-btnchek="" igual al id de la pregunta.
            //el botón para el hint se coloca dentro del bloque con atributo data-input-btnhint="" igual al id de la pregunta.
        };
        var defaults_gaps = { //valores por defecto de los objetos gap
            "words": [],                        //{Array of strings) Otras palabras válidas además de la del hueco.
            "showwords": false,                 //{Boolean}[true||false] si deben mostrarse las alternativas al acertar
            "weight": 100,                      //{Number} Peso del hueco.
            "placeholder": "",                  //{String} atributo placeholder del input
            "casesensitive": false,             //{Boolean}[true||false] si el hueco es sensible a mayúsculas
            "autocomplete": "",                 //{String}[on||off] Si hay que poner el atributo autocomplete en el input
            "adjustgaps": "",                   //{String}[""||none||all||size||maxlength]  si los inputbox deben ajustarse a las palabras (la menos restrictiva si hay varias)
            "aria-label": lang.fillthegapinp    //{String} Texto del atributo aria-label="" de la especificación WAI-ARIA.
        };

        

        /** Carga el objeto idioma
         * @param {String} objErr - Cadena con el identificador del idioma
         * @return {undefined} 
        */
        function setLang(xlang) {
            var objLang;
            if (xlang && langs[xlang]) {
                objLang = langs[xlang];
            } else {
                objLang = langs["es"];
            }
            lang = $.extend({}, objLang);
        }


        /** Objeto para errores personalizados
         * @param {Object} objErr - Objeto con los datos del error
         * @return {undefined} 
        */
        function CustomException(objErr) {
            this.name = objErr.name || "Error";
            this.message = objErr.message;
            this.toString = function () {
                return libName + "\n\n" + this.name + ": " + this.message;
            };
            this.show = function () {
                alert(this.toString());
            };
        }

        /** Busca un error en el id introducido y si lo hay lanza una excepción personalizada
         * @param {String} id - id del elemento html
         * @param {String} caller - quién ha llamado a la función
         * @return {Boolean} [true||false] - devuelve true si hay error
        */
        function errorId(id,caller) {
            var iderr = false;
            var msg = "id error";
            if (id) {
                if (!document.getElementById(id)) { msg = "error, id '" + id + "' not found in document"; iderr = true; }
            } else {
                msg = "error, nul or invalid id";
                iderr = true;
            }
            if (iderr) { throw new CustomException({ name: caller, message: msg }); } //
            return iderr;
        }

        /** Devuelve la fecha y hora actuales en formato JSON
         * @return {Date} - variable con la fecha y la hora
        */
        function getDateTime() {
            var d = new Date();
            if (d.toJSON) {
                d = d.toJSON();
            }
            return d;
            //para devolver a objeto Date usaremos
            //var D = new Date(d);
            //alert(D instanceof Date);
        }

        /** Devuelve la fecha y hora actuales
         * @param {String} D - Cadena con una fecha en formato JSON
         * @return {String} - Cadena con la fecha y la hora
        */
        function formatDateTime(D) {
            var tt = "", dd = "";
            var d = new Date(D);
            if (d instanceof Date) {
                var hh = d.getHours(), mm = d.getMinutes(), ss = d.getSeconds();
                mm = (mm < 10 ? '0' + mm : mm);
                ss = (ss < 10 ? '0' + ss : ss);
                tt = hh + "h:" + mm + "m:" + ss + "s";
                var month = d.getMonth() + 1, day = d.getDate();
                if (isNaN(month) || isNaN(day)) {
                    return D;
                }
                month = (month < 10 ? '0' + month : month);
                //day = (day < 10 ? '0' + day : day);
                dd = day + "/" + month + "/" + d.getFullYear();
                return dd + "  " + tt;
            } else {
                return D;
            }
        }

        /** Obtiene los resultados anteriores del storage, crea una tabla con los mismos y la coloca en el elemento idOut
         * @global
         * @example Ej. getStorage("id_bloque", "local", "", "iden_test_o_prob")
         * @param {String} idOut - id del elemento html en el que colocar la tabla
         * @param {String} tipus - Tipo de html5 storage [local||session]
         * @param {String} stokey - Clave correspondiente a la variable en la que se guarda el storage
         * @param {String||Object} iden - Id u obj de la actividad de la que se quieren los resultados. Si se pasa un obj debe ser pq queremos enlazar la tabla con la actividad. En este caso solo son necesarias las propiedades id y url. Ej. { "id": "", "url": "" }
         * @param {Boolean} arguments[4] - delstorage - Si se quiere el botón para borrar el storage
         * @return {Boolean} [true||false] - devuelve true si hay resultados o false si no los hay
        */
        function getStorage(idOut, tipus, stokey, iden) {
            try {
                var shtml = "",
                    xid   = "";
                var delstorage = arguments[4] || true;
                if (typeof iden === 'object') {
                    xid = iden.id;
                } else {
                    xid = iden;
                }
                shtml = getResults(tipus, stokey, iden, delstorage);
                if (shtml && $("#" + idOut).length) {
                    $("#" + idOut).append(shtml);
                    //añado eventos
                    eventosStorage(tipus, stokey, xid, '#' + idOut + ' ');
                    return true;
                } else {
                    return false;
                }
            } catch (err) {
                if (debug) { alert("getStorage(): " + err); }
            }
        }
		
        /** Coloca los eventos en la tabla con los resultados previos
         * @function
         * @param {String} tipus - Tipo de html5 storage [local||session]
         * @param {String} stokey - Clave correspondiente a la variable en la que se guarda el storage
         * @param {String} iden - id del elemento html en el que colocar la tabla
         * @param {Boolean} idOut - id del bloque que contiene los resultados previos
         * @return {undefined} 
        */
        function eventosStorage(tipus, stokey, iden, idOut) {
            $(idOut + '[data-storage-tblbox="' + iden + '"] button').off("click", function () { deleteResults(tipus, stokey, iden); });
            $(idOut + '[data-storage-tblbox="' + iden + '"] th').off("click keydown", function (e) {
                if (e.keyCode !== 9) {
                    $(idOut + '[data-storage-tblbox="' + iden + '"] table').hide().attr('aria-hidden', true);
                    $(idOut + '[data-storage-tblbox="' + iden + '"] div').show().attr('aria-hidden', false);
                }
            });
            $(idOut + '[data-storage-tblbox="' + iden + '"] div').off("click keydown", function (e) {
                if (e.keyCode !== 9) {
                    $(idOut + '[data-storage-tblbox="' + iden + '"] table').show().attr('aria-hidden', false);
                    $(idOut + '[data-storage-tblbox="' + iden + '"] div').hide().attr('aria-hidden', true);
                }
            });
            $(idOut + '[data-storage-tblbox="' + iden + '"] button').on("click", function () { deleteResults(tipus, stokey, iden); });
            $(idOut + '[data-storage-tblbox="' + iden + '"] th').on("click keydown", function (e) {
                if (e.keyCode !== 9) {
                    $(idOut + '[data-storage-tblbox="' + iden + '"] table').hide().attr('aria-hidden', true);
                    $(idOut + '[data-storage-tblbox="' + iden + '"] div').show().attr('aria-hidden', false).focus();
                }
            });
            $(idOut + '[data-storage-tblbox="' + iden + '"] div').on("click keydown", function (e) {
                if (e.keyCode !== 9) {
                    $(idOut + '[data-storage-tblbox="' + iden + '"] table').show().attr('aria-hidden', false);
                    $(idOut + '[data-storage-tblbox="' + iden + '"] div').hide().attr('aria-hidden', true);
                    $(idOut + '[data-storage-tblbox="' + iden + '"] th').focus();
                }
            });
        }


        /** Guarda en el storage los resultados anteriores
         * @function
         * @param {String} tipus - Tipo de html5 storage [local||session]
         * @param {String} stokey - Clave correspondiente a la variable en la que se guarda el storage
         * @param {String} iden - Id de la actividad de la que se quieren guardar los resultados
         * @param {Object} data - datos a añadir
         * Sobrecarga:
         * @param {Boolean} arguments[4] - sobreescribir, no añadir
         * @return {undefined} 
        */
        function storeResults(tipus, stokey, iden, data) {
            try {
                var xStorage = null,
                    limitstorage = 10; //máximo numero de elementos que se guardan en el storage

                if (tipus === "local" && localStorage) {
                    xStorage = localStorage;
                }
                if (tipus === "session" && sessionStorage) {
                    xStorage = sessionStorage;
                }

                if (xStorage) {
                    var sdata = {},      //para leer los datos actuales
                        tmpdata = [];    //para modificar los datos y actualizarlos
                    //--- leer valores actuales ------------------------------------
                    if (stokey) {
                        //hay que guadar en la clave stokey, leo por tanto dicha clave
                        sdata = JSON.parse(xStorage.getItem(stokey)) || {};
                        tmpdata = sdata[iden] || [];
                    } else {
                        tmpdata = JSON.parse(xStorage.getItem(iden)) || [];
                    }
                    //ya tengo en tmpdata los datos actuales y los puedo modificar
                    if (tmpdata.length >= limitstorage) {
                        tmpdata.shift();
                        tmpdata.push(data);
                    } else {
                        if (arguments[4] && tmpdata.length > 1) {
                            tmpdata.pop(); //sobrescribir si ya hay uno, de esta forma se guarda la primera vez y la última
                        } 
                        tmpdata.push(data); //añadir
                    }
                    //--- guardar valores -----------------------------------
                    if (stokey) {
                        //debo actualizar en sdata la entrada iden
                        sdata[iden] = tmpdata;
                        xStorage.setItem(stokey, JSON.stringify(sdata));
                    } else {
                        xStorage.setItem(iden, JSON.stringify(tmpdata));
                    }

                }
            } catch (err) {
                //la navegación privada en iPad provoca error QuotaExceededError: DOM Exception 22 que debe capturarse
                if (debug) { alert("storeResults(): " + err); }
            }
        }

        /** elimina del storage los resultados anteriores
        * @function
        * @param {String} tipus - Tipo de html5 storage [local||session]
        * @param {String} stokey - Clave correspondiente a la variable en la que se guarda el storage
        * @param {String} iden - Id de la actividad de la que se quieren borrar los resultados
        * @return {undefined} 
        */
        function deleteResults(tipus, stokey, iden) {
            try {
                var xStorage = null;
                if (tipus === "local" && localStorage) {
                    xStorage = localStorage;
                }
                if (tipus === "session" && sessionStorage) {
                    xStorage = sessionStorage;
                }
                if (xStorage) {
                    if (stokey) {
                        //no debo eliminar el item, debo eliminar la propiedad del item
                        var sdata = JSON.parse(xStorage.getItem(stokey)) || {};
                        delete sdata[iden];
                        xStorage.setItem(stokey, JSON.stringify(sdata));
                    } else {
                        xStorage.removeItem(iden);
                    }
                }
                $('[data-storage-tblbox="' + iden + '"]').remove();
            } catch (err) {
                if (debug) { alert("deleteResults(): " + err); }
            }
        }

        /** Obtiene los resultados anteriores del storage y crea una tabla con los mismos
         * @function
         * @param {String} tipus - Tipo de html5 storage [local||session]
         * @param {String} stokey - Clave correspondiente a la variable en la que se guarda el storage
         * @param {String||Object} iden - Id u obj de la actividad de la que se quieren los resultados. Si se pasa un obj debe ser pq queremos enlazar la tabla con la actividad. En este caso solo son necesarias las propiedades id y url. Ej. { "id": "", "url": "" }
         * @param {Boolean} delstorage - Si se quiere el botón para borrar el storage
         * Sobrecarga:
         * @param {String} arguments[4] - si se pasa un 5º argumento con el string "fillfromstorage" devuelve el mismo string o un string vacío si no se ha completado antes la actividad
         * @return {String} shtml - Html table con los resultados obtenidos
        */
        function getResults(tipus, stokey, iden, delstorage) {
            try {
                var shtml = "",
                    data = [],
                    total = 0,
                    xid = "", //id de la actividad como string
                    xurl = "", //url de la página con la actividad de la tabla
                    i = 0,
                    xStorage = null, //establezco el tipo de storage
                    tipoact = "";
                //pongo el id correcto
                if (typeof iden === 'object') {
                    if (iden.id) {
                        xid = iden.id;
                    } else {
                        return ""; //debe existir la id
                    }
                    if (iden.url) {
                        xurl = iden.url;
                    }
                } else {
                    xid = iden;
                }
                if (tipus === "local" && localStorage) {
                    xStorage = localStorage;
                }
                if (tipus === "session" && sessionStorage) {
                    xStorage = sessionStorage;
                }
                if (xStorage) { //si el navegador soporta storage
                    if (stokey) {
                        //el storage se guarda en un objeto en la clave stokey
                        var sdata = JSON.parse(xStorage.getItem(stokey)) || {};
                        if (sdata[xid]) {
                            //dentro del objeto el storage se guarda en la propiedad de nombre el id
                            data = sdata[xid];
                        }
                    } else {
                        //el storage se guarda directamente en la clave de nombre el id
                        var sdata = JSON.parse(xStorage.getItem(xid)) || [];
                        data = sdata;
                    }
                }
                if (!data || data.length == 0) {
                    return "";
                }

                //determino si se trata de un test o de una actividad leyendo la propiedad type
                tipoact=data[0].type;
                if (tipoact === "jsgeork.test") {
                    tipoact = "";
                }

                //--- sobrecarga --------------------------------------
                if (arguments[4] && arguments[4] === "fillfromstorage") {
                    //las actividades individuales guardan 100 cuando se han completado,
                    //aunque ahora mismo, como solo se guardan actividades completadas, simplemente la presencia de la actividad significa que ha sido completada.
                    for (i = 0; i < data.length; ++i) {
                        if (typeof data === 'object') {
                            if (data[i].score == 100) {
                                return arguments[4];
                            } 
                        }
                    }
                    return ""; //se sale de la fución ya que no debe crearse la tabla
                }
                //------------------------------------------------------
            
                var cabecera = data[0].name || lang.prevres,
                    cabecera2 =cabecera;
                if (xurl) {
                    cabecera2 = '<a href="' + xurl + '">' + cabecera2 + '</a>';
                }
                shtml += '<div data-storage-tblbox="' + xid + '">\n'; //en principio settings_ex.id=xid siempre
                shtml += '\t<div tabindex="0" aria-haspopup="true" title="' + lang.prevres + '" class="' + styles.stodiv + '" style="display: none;">[ ' + cabecera + ' ]</div>\n';
                shtml += '\t<table title="' + lang.prevres + '" class="' + styles.stotbl + '">\n';
                shtml += '\t\t<caption title="' + xid + '">' + cabecera2 + '</caption>\n';
                shtml += '\t\t<thead>\n';
                shtml += '\t\t\t<tr><th tabindex="0">' + lang.dates + '</th><th>' + (tipoact ? '%' : lang.result) + '</th></tr>\n';
                shtml += '\t\t</thead>\n';
                shtml += "\t\t<tbody>\n";
                var mbase = 10; //base para la media
                for (i = 0; i < data.length; ++i) {
                    if (typeof data === 'object') {
                        var cssTr = ' class="' + styles.stotrpair + '"';
                        if (i % 2) {
                            cssTr = ' class="' + styles.stotrodd + '"';
                        }
                        var sQbase = "";
                        if (data[i].qbase && data[i].qbase.toString() != "10") {
                            sQbase = "<sub>/" + data[i].qbase.toString() + "</sub>";
                        }
                        shtml += '\t\t\t<tr' + cssTr + '><td>' + formatDateTime(data[i].date) + "</td><td>" + data[i].score + (tipoact ? "" : sQbase) + "</td></tr>\n";
                        mbase = +data[i].qbase; //voy guardando las bases hasta quedarme con la última
                        //el total lo voy calculando en base 10
                        total += parseFloat((data[i].score * 10) / mbase);
                    }
                }
                if (!tipoact) {
                    var media = 0, smedia="";
                    media = Math.round((total / data.length) * 100) / 100; //calculo la media en base 10
                    media = media * mbase / 10;
                    media = parseFloat(Math.round(media * 100) / 100);
                    if (mbase != 10) {
                        smedia = media + '<sub>/' + mbase + '</sub>';
                    } else { smedia = media.toString();}
                    shtml += '\t\t\t<tr class="' + styles.stotrtot + '"><td class="' + styles.stotota + '">' + ((tipus === "session") ? lang.average + " (session)" : lang.average) + ': </td><td class="' + styles.stototb + '">' + smedia + "</td></tr>\n";
                }
                shtml += "\t\t</tbody>\n";
                if (delstorage) {
                    //if (tipus === "local") {
                    //no hace falta borrar si se almacena en session con lo que no añadimos las fila con el botón,
                    //pero la falta de botón crea una duda en el usuario y parece un error. Además siempre puede interesar borrar las entradas para que se cargue vacío.
                    shtml += "\t\t<tfoot>\n";
                    shtml += '\t\t\t<tr><td colspan="2"><button type="button" title="' + lang.titledelsto + '" aria-label="' + lang.titledelsto + '" class="' + styles.btntblstore + '">' + lang.delstorage + '</button></td></tr>\n';
                    shtml += "\t\t</tfoot>\n";
                    //}
                }
            
                shtml += "\t</table>\n";
                shtml += "</div>\n";
                return shtml;
            } catch (err) {
                if (debug) { alert("getResults(): " + err); }
                return "";
            }
        }




        




        //*********************************************************************************
        // ini function setQuestion()
        //*********************************************************************************

        /** Prepara las preguntas. En los test se le pasa como segundo argumento el objeto test
         * @global
         * @param {Object} userOpt - Objeto con las opciones entradas por el usuario
         * Sobrecarga:
         * @param {Object} arguments[1] - test - Objeto con las opciones del test entradas por el usuario
         * @globalobj lastcall - string id de la última actividad que ha llamado a la función.
         * @globalobj update - string id de la última actividad que ha actualizado una variable pública
         * @globalobj attempts - number con el número de intentos o de veces que se pulsa en el botón de chequeo. Se pone a cero cuando se acierta.
         * @globalobj score - number con la nota obtenida en la última actividad realizada.
         * @globalobj objscore = objeto JS con los resultados
         *                      objscore.type               //tipo de actividad
         *                      objscore.id                 //identificador de la actividad
         *                      objscore.name               //nombre de la actividad
         *                      objscore.weighting          //peso de la actividad en un test
         *                      objscore.lighting           //porcentaje que debe quitarse si se falla
         *                      objscore.score              //puntos obtenidos sobre 100
         *                      objscore.date               //fecha y hora en formato JSON
         * @globalobj [act id] = objeto JS con los resultados siendo el nombre de la propiedad el id de la actividad. Se trata de disponer de una copia del objscore sin que sea sobrescribida por otras actividades
         * @return {undefined} 
        */
        function setQuestion(userOpt) {

            //variable para saber si es un test (examen). Si es que sí se pasa en el segundo argumento el objeto settings_ex.
            var test = arguments[1] || false;

            var settings;       //closure del obj con las opciones de la actividad

            var $myDiv,                 //bloque con el id igual al del obj de la actividad (#settings.id)
                miIdEx;                 //id del test si este existe

            
            var attempts = 0, indicios = 0;     //cuenta el número de intentos de una acividad
            var actcomplete = false;            //closure para saber si se debe lanzar el evento oncomplete
            var onok = false;                   //closure para saber si se debe lanzar el evento onok
            var csshexent = true;               //si debe utilizarse el estilo css con entidades hexadecimales

            


            /** crea el código html de las preguntas tipo single y multi
            * @param {Object} objData - Objeto con las opciones entradas por el usuario
            * @return {undefined} 
            */
            function makeHtmlQuestion(objData) {
                var html = "", aria="";
                try {

                    //variable para saber si es un test (examen). Si es que sí se pasa en el segundo argumento el objeto settings_ex.
                    var test = arguments[1] || false;

                    var setSelected = false; //guarda si en el tipo single un radio se ha puesto ya a selected y por tanto no debemos poner ninguno más
                    var labClassOk = ""; //clase que muestra la respuesta de valor 100 cuando ya se ha acertado antes
                    var filledFromStorage = styles.stofilled + (csshexent ? (' ' + styles.hexent) : ''); //nombre de la clase que indica que el valor se ha cargado ya que el storage indica que se había resuelto antes la actividad bien

                    
                    //----------------------------------------------------------
                    //Añadimos los atributos weighting y lighting de la pregunta en el bloque de la pregunta, 
                    //p. ej. <div id="" class="CSSActivity" data-weighting="100" data-lighting="0">
                    var vW = +objData.weighting;
                    if ($.isNumeric(vW) && (vW >= 0) && (vW <= 100)) {
                        vW = Math.abs(vW);
                        vW = Math.round(vW);
                    }
                    $("#" + objData.id).attr("data-weighting", vW);
                    var vL = +objData.lighting;
                    if ($.isNumeric(vL) && (vL >= 0) && (vL <= 100)) {
                        vL = Math.abs(vL);
                        vL = Math.round(vL);
                    }
                    $("#" + objData.id).attr("data-lighting", vL);
                    //----------------------------------------------------------

                    //----------------------------------------------------
                    var sfrm = "";
                    if (test && test.form) { //si forma parte de un test y este tiene el tag form
                        sfrm = ' form="' + test.id + '_frm"';
                    }
                    //envolvemos el interior del bloque con el tag fieldset
                    var bloqueX = $('#' + objData.id);
                    if (objData.fieldset && bloqueX.length) {
                        bloqueX.wrapInner('<fieldset name="' + objData.id + '"' + sfrm + ' class="' + styles.actfield + '"></fieldset>');
                        if (objData.legend) {
                            //pongo el legend en el primer fieldset. Debe ser el último prepend ya que el tag legend debe ir inmediatamente después del fieldset
                            $('fieldset[name="' + objData.id + '"]', bloqueX).prepend('<legend>' + objData.legend + '</legend>');
                        }
                    }
                    //----------------------------------------------------

                    var tmpHTML = "";
                    var order = [];
                    for (var i = 0; i < objData.opt.length; i++) {
                        //pongo el orden de las entradas
                        order.push(i);
                    }
                    if (objData.random) {
                        //desordena aleatoriamente las entradas
                        order.sort(function () { return 0.5 - Math.random(); });
                    }
                    for (i = 0; i < objData.opt.length; i++) {
                        labClassOk = "";
                        if (objData.list) {
                            tmpHTML += "<li>\n";
                        }
                        var tipo = "radio";
                        var attrok = "", attrw = "";
                        //----------------------------------------------------------
                        if (objData.type == "multi") {
                            tipo = "checkbox";
                            attrok = ' data-ok="false"';
                            if (objData.opt[order[i]].select && objData.opt[order[i]].select === true) {
                                //solo se pondrá a true si se entra el boolean 'true' en los datos
                                attrok = ' data-ok="true"';
                                if (setvalue) {
                                    attrok += ' checked="checked"';
                                    labClassOk = ' class="' + filledFromStorage + '"';
                                    //setSelected = true;
                                }
                            }
                        }
                        //----------------------------------------------------------
                        if (objData.type == "single") {
                            //guardamos el peso de cada opción en el atributo data-weight
                            var w = +objData.opt[order[i]].weight;
                            if ($.isNumeric(w) && (w >= 0) && (w <= 100)) {
                                w = Math.abs(w);
                                w = Math.round(w);
                                attrw = ' data-weight="' + w + '"';
                                if (setvalue && w === 100 && !setSelected) {
                                    attrw += ' checked="checked"';
                                    labClassOk = ' class="' + filledFromStorage + '"';
                                    setSelected = true;
                                }
                            }
                        }
                        //----------------------------------------------------------
                        tmpHTML += '<label for="' + objData.id + '_item' + order[i] + '" id="' + objData.id + '_item' + order[i] + '_label"' + labClassOk + '>\n';
                        aria = "";
                        if (settings["wai-aria"]) {
                            if ($('#' + objData.id + '_info_aria').length > 0) {
                                aria = ' aria-describedby="' + objData.id + '_info_aria"';
                            }
                            aria += ' aria-labelledby="' + objData.id + '_item' + order[i] + '_label"';
                        }
                        tmpHTML += '<input type="' + tipo + '" name="' + objData.id + '"' + aria + ' data-answer="' + objData.opt[order[i]].answer + '"' + attrok + attrw + ' id="' + objData.id + '_item' + order[i] + '"' + sfrm + ' />\n';
                        tmpHTML += objData.opt[order[i]].text + '</label>\n';
                        if (objData.list) {
                            tmpHTML += "</li>\n";
                        }
                    } //en bucle for
                    if (objData.list) {
                        //list-style-type: upper-latin; por css
                        if (objData.list == "ul") {
                            tmpHTML = "<ul>\n" + tmpHTML + "</ul>\n";
                        } else {
                            tmpHTML = "<ol>\n" + tmpHTML + "</ol>\n";
                        }
                    }
                    html += tmpHTML;
                    var btntext = lang.check;
                    if (objData.button) {
                        btntext = objData.button;
                    }
                    html += '<button type="button" id="' + objData.id + '_btn" title="' + lang.titlecheck + '"' + (settings["wai-aria"] ? ' aria-label="' + lang.titlecheck + '"' : '') + '  class="' + styles.btn + '">' + btntext + '</button>';
                    html += '<div id="' + objData.id + '_out" class="' + styles.divout + '"></div>\n';
                    //finalmente colocamos el html al final del fieldset si existe o del div
                    if ($('#' + objData.id + ' fieldset').length) {
                        $('#' + objData.id + ' fieldset').append(html);
                    } else {
                        $('#' + objData.id).append(html);
                    }
                    //Explicación para el final de la actividad
                    var opttxt = $('[data-info-bottom="' + objData.id + '"]').html();
                    if (opttxt) {
                        var txtO = '<div id="' + objData.id + '_info_bottom" class="' + styles.inftxtpip + '">' + opttxt + '</div>\n';
                        if ($('#' + objData.id + ' fieldset').length) {
                            $('#' + objData.id + ' fieldset').append(txtO);
                        } else {
                            $('#' + objData.id).append(txtO);
                        }
                    } 
                } catch (err) {
                    if (debug) { alert("makeHtmlQuestion(): " + err); }
                }
                return html;
            }
            //---- end makeHtmlQuestion ------------------------------


            /** modifica en la página el código html para las preguntas tipo input
            * @param {Object} objData - Objeto con las opciones entradas por el usuario
            * Sobrecarga:
            * @param {Object} arguments[1] - test - Objeto con las opciones del test entradas por el usuario
            * @return {undefined}
            */
            function makeHtmlInputs(objData) {

                try {

                    //variable para saber si es un test (examen). Si es que sí se pasa en el segundo argumento el objeto settings_ex.
                    var test = arguments[1] || false;

                    var sfrm = "", arialab = lang.inpfill;
                    if (test && test.form) {
                        sfrm = ' form="' + test.id + '_frm"';
                    }
                    //etiqueta fieldset si existe el bloque con div
                    var bloqueinp = $('#' + objData.id);
                    if (objData.fieldset && bloqueinp.length) {
                        bloqueinp.wrapInner('<fieldset name="' + objData.id + '"' + sfrm + ' class="' + styles.actfield + '"></fieldset>');
                        //Explicación para la actividad
                        var opttxt = $('[data-info-bottom="' + objData.id + '"]').html();
                        if (opttxt) {
                            $('fieldset[name="' + objData.id + '"]', bloqueinp).prepend('<div id="' + objData.id + '_info_bottom" class="' + styles.inftxtpip + '">' + opttxt + '</div>\n');
                        }
                        if (objData.legend) {
                            //pongo el legend en el primer fieldset. Debe ser el último prepend ya que el tag legend debe ir inmediatamente después del fieldset
                            $('fieldset[name="' + objData.id + '"]', bloqueinp).prepend('<legend>' + objData.legend + '</legend>');
                        }  
                    }
                    //en esta actividad hay que poner los inputboxs en los bloques con atributo data-input-make="" 
                    //hay que poner el botón para comprobar en el bloque con atributo data-input-btnchek="" cuyo valor coincida con el del id de la pregunta
                    //hay que poner el botón de hint en el bloque con atributo data-input-btnhint="" cuyo valor coincida con el del id de la pregunta
                    var $elInputs = $('[data-makeqs="' + objData.id + '"]'); //elemento(s) que contiene los inputs
                    //--- bucle por los elementos html que son huecos
                    $('[data-input-make]', $elInputs).each(function (index) {
                        if ($(this).attr("data-input-make").length) { //solo pongo un input si hay la referencia a la propiedad del objeto pasado
                            var objbox = objData.boxs[$(this).attr("data-input-make")]; //el objeto box
                        
                            if (typeof objbox == "undefined" || objbox.type === "text") {
                                //--- inputs texto -------------------------------------------------------------
                                var inpattr = ""; //atributos del input
                                var sword = $(this).text(); //palabra que hay en el hueco
                                if (sword) {
                                    //sword = sword.trim(); //IE8 error
                                    $.trim(sword);
                                }
                                var maxlength = sword.length; //longitud de la palabra que hay en el hueco
                                var altsol = ""; //guardará si existe la primera solución alternativa para utilizarla con fillfromstorage
                                if (objbox) {
                                    for (var i = 0; i < objbox.values.length; ++i) {
                                        if (i === 0) { altsol = objbox.values[i]; }
                                        if (objbox.values[i].length > maxlength) {
                                            //si la palabra alternativa es más larga guardo el valor
                                            maxlength = objbox.values[i].length;
                                        }
                                    }
                                    switch (objbox.adjustgaps) {
                                        case "all":
                                            inpattr += ' maxlength="' + maxlength + '" size="' + maxlength + '"';
                                            break;
                                        case "size":
                                            inpattr += ' size="' + maxlength + '"'; //tamaño del input
                                            break;
                                        case "maxlength":
                                            inpattr += ' maxlength="' + maxlength + '"'; //numero máximo de caracteres permitidos
                                            break;
                                        default: //"none"

                                    }
                                    switch (objbox.autocomplete) {
                                        case "on":
                                            inpattr += ' autocomplete="on"';
                                            break;
                                        case "off":
                                            inpattr += ' autocomplete="off"';
                                            break;
                                    }
                                    if (objbox.placeholder) {
                                        inpattr += ' placeholder="' + objbox.placeholder + '"';
                                    }
                                    if (test && test.form) {
                                        inpattr += sfrm;
                                    }
                                    var w = +objbox.weight;
                                    if ($.isNumeric(w) && (w >= 0) && (w <= 100)) {
                                        w = Math.abs(w);
                                        w = Math.round(w);
                                        inpattr += ' data-weight="' + w + '"';
                                    }
                                    arialab = objbox["aria-label"] || lang.inpfill;
                                }
                                if (sword) {
                                    inpattr += ' data-input-value="' + sword + '"';
                                }
                                if (setvalue) {
                                    $(this).addClass(styles.stofill);
                                    inpattr += ' value="' + (sword ? sword : altsol) + '"';
                                }
                                var inphtml = '<input type="text" data-input-type="text" data-box="' + $(this).attr("data-input-make") + '" title="' + lang.inptxtfill + '"' + (settings["wai-aria"] ? ' aria-label="' + arialab + '"' : '') + ' class="' + styles.inptxt + '"' + inpattr + ' />';
                                $(this).html(inphtml);
                                //--- end inputs texto -------------------------------------------------------------
                            }


                            if (objbox && objbox.type === "number") {
                                //--- inputs number -------------------------------------------------------------
                                var inpattr = ""; //atributos del input
                                var snumber = $(this).text(); //número que hay en el hueco
                                if(snumber){
                                    $.trim(snumber);
                                }
                                var maxlength = snumber.length; //longitud del número que hay en el hueco
                                var altsol = ""; //guardará si existe la primera solución alternativa para utilizarla con fillfromstorage
                                if (objbox) {
                                    for (var i = 0; i < objbox.values.length; ++i) {
                                        if(i===0){ altsol=objbox.values[i]; }
                                        if (objbox.values[i].toString().length > maxlength) {
                                            //si el numero alternativo es más largo guardo el valor
                                            maxlength = objbox.values[i].toString().length;
                                        }
                                    }
                                    switch (objbox.adjustgaps) {
                                        case "all":
                                            inpattr += ' maxlength="' + maxlength + '" size="' + maxlength + '"';
                                            break;
                                        case "size":
                                            inpattr += ' size="' + maxlength + '"';
                                            break;
                                        case "maxlength":
                                            inpattr += ' maxlength="' + maxlength + '"';
                                            break;
                                        default: //"none"

                                    }
                                    switch (objbox.autocomplete) {
                                        case "on":
                                            inpattr += ' autocomplete="on"';
                                            break;
                                        case "off":
                                            inpattr += ' autocomplete="off"';
                                            break;
                                    }
                                    if (objbox.placeholder) {
                                        inpattr += ' placeholder="' + objbox.placeholder + '"';
                                    }
                                    if (test && test.form) {
                                        inpattr += sfrm;
                                    }
                                    var w = +objbox.weight;
                                    if ($.isNumeric(w) && (w >= 0) && (w <= 100)) {
                                        w = Math.abs(w);
                                        w = Math.round(w);
                                        inpattr += ' data-weight="' + w + '"';
                                    }
                                    if (objbox.decimals && (typeof objbox.decimals === "number") && objbox.decimals >= 0) {
                                        //la propiedad decimals solo sirve para indicar al usuario cuantos decimales debe introducir, no para comprobar la solución, por tanto no sirve de nada guardar su valor en el html
                                        inpattr += ' data-input-decimals="' + objbox.decimals + '"';
                                    }
                                    if (objbox.tofixed && (typeof objbox.tofixed === "number") && objbox.tofixed >= 0) {
                                        inpattr += ' data-input-tofixed="' + objbox.tofixed + '"';
                                    }
                                    if ((typeof objbox.accuracy === "number") && objbox.accuracy >= 50 && objbox.accuracy <= 100) {
                                        //Solo le permite una precición de como mínimo el 50%.
                                        inpattr += ' data-input-accuracy="' + objbox.accuracy + '"';
                                    }
                                    if (objbox.min && objbox.max && (objbox.max >= objbox.min)) {
                                        inpattr += ' data-input-min="' + objbox.min + '" data-input-max="' + objbox.max + '"';
                                    }
                                    if (!setvalue && (typeof objbox.decimals === "number") && objbox.decimals >= 0) {
                                        //pongo el indicador de decimales pedidos #.##
                                        var sdec = "#";
                                        if (objbox.decimals > 0) {
                                            sdec += ".";
                                            for (var i = 0; i < objbox.decimals; i++) {
                                                sdec += "#";
                                            }
                                        }
                                        inpattr += ' value="' + sdec + '"';
                                    }
                                    arialab = objbox["aria-label"] || lang.inpfill;
                                }
                                if (snumber) {
                                    inpattr += ' data-input-value="' + snumber + '"';
                                }
                                if (setvalue) {
                                    $(this).addClass(styles.stofill);
                                    inpattr += ' value="' + (snumber ? snumber : altsol) + '"';
                                }
                                var inphtml = '<input type="text" data-input-type="number" data-box="' + $(this).attr("data-input-make") + '" title="' + lang.inpnumfill + '"' + (settings["wai-aria"] ? ' aria-label="' + arialab + '"' : '') + ' class="' + styles.inpnum + '"' + inpattr + ' />';
                                inphtml += "<span style='color: red; display: none;' class='onlynum'>" + lang.onlynumbers + "</span>";
                                $(this).html(inphtml);
                                //--- end inputs number -------------------------------------------------------------
                            }
                        }
                    });
                    //--- end bucle [data-input-make]
                    //coloco los botones
                    var html = "";
                    var $btnCheck = $('[data-input-btnchek="' + objData.id + '"]'); //elemento(s) que debe contener el botón de chequeo
                    var btntext = lang.check;
                    if (objData.button) {
                        btntext = objData.button;
                    }
                    html += '<button type="button" id="' + objData.id + '_btn" title="' + lang.titlecheck + '"' + (settings["wai-aria"] ? ' aria-label="' + lang.titlecheck + '"' : '') + ' class="' + styles.btn + '">' + btntext + '</button>';
                    $btnCheck.html(html);
                    var $btnHint = $('[data-input-btnhint="' + objData.id + '"]'); //elemento(s) que debe contener el botón de chequeo
                
                    if (objData.hint && $btnHint.length) {
                        html = '<button type="button" id="' + objData.id + '_btnhint" title="' + lang.titlehint + '"' + (settings["wai-aria"] ? ' aria-label="' + lang.titlehint + '"' : '') + ' class="' + styles.inpbtnhint + '">';
                        if (objData.btnhint) {
                            html += objData.btnhint;
                        } else {
                            html += lang.hint;
                        }
                        html += "</button>\n";
                        $btnHint.html(html);
                        //añado la clase css al div de atributo data-info-hint=""
                        var $divHint = $('[data-info-hint="' + objData.id + '"]'); //bloque que se mostrará al pulsar en el botón hint
                        if (!($divHint.attr("data-info-noclass") === "yes")) {
                            //añadimos la clase a no ser que existe un atributo data-info-noclass=yes
                            $divHint.addClass(styles.inphint);
                        }
                    }
                } catch (err) {
                    if (debug) { alert("makeHtmlInputs(): " + err); }
                }
            }
            //---- end makeHtmlInputs ------------------------------


            /** crea el código html con los controles (form y botones) de las preguntas tipo gapfill (rellenar huecos)
            * @param {Object} objData - Objeto con las opciones entradas por el usuario
            * @return {undefined}
            */
            function makeHtmlQuestionGapFill(objData) {
                var html = "";
                try {

                    //variable para saber si es un test (examen). Si es que sí se pasa en el segundo argumento el objeto settings_ex.
                    var test = arguments[1] || false;

                    var sfrm = "";
                    if (test && test.form) {
                        sfrm = ' form="' + test.id + '_frm"';
                    }
                    
                    //----------------------------------------------------------
                    //atributos weighting y lighting de la pregunta que se guardan en el div de cada pregunta
                    var vW = +objData.weighting;
                    if ($.isNumeric(vW) && (vW >= 0) && (vW <= 100)) {
                        vW = Math.abs(vW);
                        vW = Math.round(vW);
                    }
                    $("#" + objData.id).attr("data-weighting", vW);
                    //GapFill no admite reprobación
                    //var vL = +objData.lighting;
                    //if ($.isNumeric(vL) && (vL >= 0) && (vL <= 100)) {
                    //    vL = Math.abs(vL);
                    //    vL = Math.round(vL);
                    //}
                    //$("#" + objData.id).attr("data-lighting", vL);
                    //----------------------------------------------------
                    var bloqueX = $('#' + objData.id);
                    if (objData.fieldset && bloqueX.length) {
                        bloqueX.wrapInner('<fieldset name="' + objData.id + '"' + sfrm + ' class="' + styles.actfield + '"></fieldset>');
                        if (objData.legend) {
                            //pongo el legend en el primer fieldset. Debe ser el último prepend ya que el tag legend debe ir inmediatamente después del fieldset
                            $('fieldset[name="' + objData.id + '"]', bloqueX).prepend('<legend>' + objData.legend + '</legend>');
                        }
                    }
                    //----------------------------------------------------
                    html += '<div id="' + objData.id + '_out" class="' + styles.divout + '"></div>\n';
                    var btntext = lang.check;
                    if (objData.button) {
                        btntext = objData.button;
                    }
                    html += '<button type="button" id="' + objData.id + '_btn" title="' + lang.titlecheck + '"' + (settings["wai-aria"] ? ' aria-label="' + lang.titlecheck + '"' : '') + ' class="' + styles.btn + '">' + btntext + '</button>';
                    if (objData.hint) {
                        html += '<button type="button" id="' + objData.id + '_btnhint" title="' + lang.titlehint + '"' + (settings["wai-aria"] ? ' aria-label="' + lang.titlehint + '"' : '') + ' class="' + styles.gapbtnhint + '" style="display: none;">'; //en principio no se muestra hasta que se verifique que hay huecos para llenar (data-gap-fill)
                        if (objData.btnhint) {
                            html += objData.btnhint;
                        } else {
                            html += lang.hint;
                        }
                        html += "</button>\n";
                        //var btntext2 = lang.hint;
                        //if (objData.btnhint) {
                        //    btntext2 = objData.btnhint;
                        //}
                        //html += '<input type="button" value="' + btntext2 + '" id="' + objData.id + '_btnhint" class="' + styles.btn + '" />';
                    }
                    //colocamos el html detrás del fieldset si existe o del div
                    if ($('#' + objData.id + ' fieldset').length) {
                        $('#' + objData.id + ' fieldset').append(html);
                    } else {
                        $('#' + objData.id).append(html);
                    }
                    var opttxt = $('[data-info-bottom="' + objData.id + '"]').html();
                    if (opttxt) {
                        var txtO = '<div id="' + objData.id + '_info_bottom" class="' + styles.inftxtpip + '">' + opttxt + '</div>\n';
                        if ($('#' + objData.id + ' fieldset').length) {
                            $('#' + objData.id + ' fieldset').append(txtO);
                        } else {
                            $('#' + objData.id).append(txtO);
                        }
                    }
                } catch (err) {
                    if (debug) { alert("makeHtmlQuestionGapFill(): " + err); }
                }
                return html;
            }
            //---- end makeHtmlQuestionGapFill ------------------------------


            /** modifica en la página el código html para los huecos de la actividad tipo gapfill
            * @param {Object} objData - Objeto con las opciones entradas por el usuario
            * Sobrecarga:
            * @param {Object} arguments[1] - test - Objeto con las opciones del test entradas por el usuario
            * @return {undefined}
            */
            function makeGapFills(objData) {

                //variable para saber si es un test (examen). Si es que sí se pasa en el segundo argumento el objeto settings_ex.
                var test = arguments[1] || false;

                var sfrm = "", aria = "", arialab = lang.fillthegapinp;
                if (test && test.form) {
                    sfrm = ' form="' + test.id + '_frm"';
                }
                aria = "";
                if (settings["wai-aria"]) {
                    if ($('#' + objData.id + '_info_aria').length > 0) {
                        aria = ' aria-describedby="' + objData.id + '_info_aria"';
                    }
                }
                //en esta actividad no solo debe crearse el html para controlarla,
                //también deben crearse los huecos.
                var $elGaps = $('[data-makeqs="' + objData.id + '"]'); //elemento(s) que contiene los gaps
                //--- bucle por los elementos html que son huecos
                $('[data-gap-fill]', $elGaps).each(function (index) {
                    if ($(this).attr("data-gap-fill").length) { //solo pongo un gap si hay palabra dentro del elemento
                        var inpattr = ""; //atributos del input
                        var objgap = objData.gaps[$(this).attr("data-gap-fill")]; //el objeto gap
                        var sword = $(this).text(); //palabra que hay en el hueco
                        if (sword) {
                            $.trim(sword);
                        }
                        var maxlength = sword.length; //longitud de la palabra que hay en el hueco
                        var altsol = ""; //guardará si existe la primera solución alternativa para utilizarla con fillfromstorage
                        if (objgap) {
                            for (var i = 0; i < objgap.words.length; ++i) {
                                if (i === 0) { altsol = objgap.words[i]; }
                                if (objgap.words[i].length > maxlength) {
                                    //si la palabra alternativa es más larga guardo el valor
                                    maxlength = objgap.words[i].length;
                                }
                            }
                            switch (objgap.adjustgaps) {
                                case "all":
                                    inpattr += ' maxlength="' + maxlength + '" size="' + maxlength + '"';
                                    break;
                                case "size":
                                    inpattr += ' size="' + maxlength + '"';
                                    break;
                                case "maxlength":
                                    inpattr += ' maxlength="' + maxlength + '"';
                                    break;
                                default: //"none"

                            }
                            switch (objgap.autocomplete) {
                                case "on":
                                    inpattr += ' autocomplete="on"';
                                    break;
                                case "off":
                                    inpattr += ' autocomplete="off"';
                                    break;
                            }
                            if (objgap.placeholder) {
                                inpattr += ' placeholder="' + objgap.placeholder + '"';
                            }
                            if (test && test.form) {
                                inpattr += sfrm;
                            }
                            var w = +objgap.weight;
                            if ($.isNumeric(w) && (w >= 0) && (w <= 100)) {
                                w = Math.abs(w);
                                w = Math.round(w);
                                inpattr += ' data-weight="' + w + '"';
                            }
                            arialab = objgap["aria-label"] || lang.fillthegapinp;
                        }
                        if (sword) {
                            inpattr += ' data-gap-word="' + sword + '"';
                        }
                        if (setvalue) {
                            $(this).addClass(styles.stofill);
                            inpattr += ' value="' + (sword ? sword : altsol) + '"';
                        }
                        $(this).html('<input type="text" data-gap="' + $(this).attr("data-gap-fill") + '"' + aria + ' title="' + lang.fillthegapinp + '"' + (settings["wai-aria"] ? ' aria-label="' + arialab + '"' : '') + ' class="' + styles.gapinp + '"' + inpattr + ' />');
                    }
                });
                //--- end bucle [data-gap-fill]
                $('[data-gap-select]', $elGaps).each(function (index) {
                    if ($(this).attr("data-gap-select").length) { //solo pongo un gap si hay palabra dentro del elemento
                        var inpattr = ""; //atributos del select
                        var objgap = objData.gaps[$(this).attr("data-gap-select")]; //el objeto gap
                        var sword = $(this).text(); //palabra que hay en el hueco
                        if (sword) {
                            $.trim(sword);
                        }
                        var opts = []; //guarda las opciones
                        var i = 0,
                            j=0; //indice de la palabra correcta
                        var html = "";
                        opts.push(sword); //la primera opción, y la correcta, es la palabra dentro del gap
                        if (objgap) {
                            for (i = 0; i < objgap.words.length; ++i) {
                                opts.push(objgap.words[i]);
                            }
                            if (test && test.form) {
                                inpattr += sfrm;
                            }
                            var w = +objgap.weight;
                            if ($.isNumeric(w) && (w >= 0) && (w <= 100)) {
                                w = Math.abs(w);
                                w = Math.round(w);
                                inpattr += ' data-weight="' + w + '"';
                            }
                            arialab = objgap["aria-label"] || lang.fillthegapinp;
                        }
                        //desordena aleatoriamente las entradas
                        opts.sort(function () { return 0.5 - Math.random(); });
                        if (setvalue) {
                            //busca la posición de la correcta
                            for (i = 0; i < opts.length; ++i) {
                                if (opts[i] === sword) {
                                    j = i;
                                }
                            }
                        }
                        html += '<select data-gap="' + $(this).attr("data-gap-select") + '" data-gap-word="' + sword + '"' + aria + ' title="' + lang.fillthegapsel + '"' + (settings["wai-aria"] ? ' aria-label="' + objgap["aria-label"] + '"' : '') + ' class="' + styles.gapinp + '"' + inpattr + '>\n';
                        html += "<option>&#160;</option>\n";
                        for (i = 0; i < opts.length; ++i) {
                            var ssel = "";
                            if (setvalue && i === j) {
                                //seleccinamos la correcta ya que anteriormente se había resuelto la pregunta
                                ssel = ' selected="selected"';
                            }
                            html += '<option' + ssel + '>';
                            html += opts[i];
                            html += "</option>\n";
                        }
                        html += "</select>\n";
                        if (setvalue) {
                            $(this).addClass(styles.stofill);
                            inpattr += ' selected="selected"';
                        }
                        $(this).html(html);
                    }
                });
                //--- end bucle [data-gap-select]
            }
            //---- end makeGapFills ------------------------------


            /** situa los hints en los gaps
            * @return {undefined}
            */
            function hintGapFills() {
                try {
                    indicios++;
                    //en todos los huecos vacíos pone guiones bajos y una letra en el hueco
                    var $elGaps = $('[data-makeqs="' + settings.id + '"]'); //elemento(s) que contiene los gaps
                    //--- bucle por los elementos html que son huecos
                    $('[data-gap-fill]', $elGaps).each(function (index) { //this será el span que contiene el input
                        if ($("input", this).length) { //solo reviso un gap si hay input dentro del elemento
                            var valor = $("input", this).val(); //entrada del input
                            //var objgap = settings.gaps[$(this).attr("data-gap-fill")]; //el objeto gap
                            var originalword = $("input", this).attr("data-gap-word");
                            if (!originalword) {
                                //no hay palabra en el html del hueco, debo buscarla en las alternativas
                                var objgap = settings.gaps[$(this).attr("data-gap-fill")]; //el objeto gap
                                if (objgap && objgap.words.length) {
                                    originalword = objgap.words[0];
                                }
                            }
                            var hintw = "?";
                            if (originalword) {
                                var arrOriginalword = originalword.split(''); //creo un array ya que acceder directamente no es estandard en ES3
                                var rnd = 0;
                                hintw = "";
                                //var randInt = Math.floor((Math.random() * ((randNumMax + 1) - randNumMin)) + randNumMin);
                                rnd = Math.floor((Math.random() * ((arrOriginalword.length - 1 + 1) - 0)) + 0);
                                for (i = 0; i < arrOriginalword.length; ++i) {
                                    //camuflo la palabra con una letra en una posición aleatoria y giones bajos
                                    if (i == rnd) {
                                        hintw += arrOriginalword[i];
                                        if (indicios > 1) {
                                            rnd = Math.floor((Math.random() * ((arrOriginalword.length - 1 + 1) - 0)) + 0);
                                        }
                                    } else {
                                        if (arrOriginalword[i]===" ") {
                                            hintw += " ";
                                        } else {
                                            hintw += "_";
                                        }
                                    }
                                } //end for
                            } 
                            if (settings.hint && typeof settings.hint === 'string' && settings.hint.toLowerCase() === "html5") {
                                $("input", this).attr("placeholder", hintw);
                            } else {
                                if ($.trim(valor).length === 0) { //si el input está vacío
                                    $("input", this).val(hintw);
                                }
                            }
                        }
                    }); //end each
                    $(this).prop("disabled", true);
                } catch (err) {
                    if (debug) { alert("hintGapFills(): " + err); }
                } //end try...catch
            }
            //---- end hintGapFills ------------------------------


            /** función con el evento del boton de comprobar
            * @return {undefined}
            */
            function checkSolution() {
           
                try {

                    
                    var weighting = $myDiv.attr("data-weighting") || 100;
                    var lighting = $myDiv.attr("data-lighting") || 0;

                    var nota = 0;
                    //var storethis = false; //para guardar en el storage solo si se ha superado el umbral
                    
                    //gestiono los intentos
                    ++attempts;
                    setQuestion.attempts = attempts; //actualizo los intentos públicos
                    setQuestion.score = 0; //en principio 0 puntos
                    //--- objeto score -------------------------------------
                    setQuestion.objscore = {};     //hace público el objeto JS con los resultados.
                    //------------------------------------------------------
                    

                    switch (settings.type) {
                        //-----------------------------------------------------------------------
                        case "input":
                            var numqs = 0, numinp_ko = 0; //cuenta el numero de inputs y el numero de inputs que quedan por acertar. Las entradas pueden ser tags inputs o tags selects
                            var notap = 0, notat = 0; //notas parciales y totales;
                            var $elQs = $('[data-makeqs="' + settings.id + '"]'); //elemento(s) que contiene(n) los inputs
                            numqs = $('[data-input-make]', $elQs).length;
                            //--- bucle por los elementos html que son inputs text
                            $('[data-input-make]', $elQs).each(function (index) { //this será el span que contiene el input text  
                                if ($("input", this).length) { //solo reviso un gap si hay input dentro del elemento
                                    var objbox = settings.boxs[$(this).attr("data-input-make")]; //el objeto box de los datos entrados

                                    //--- input text ---------------------------------------------------------
                                    if (typeof objbox == "undefined" || objbox.type === "text") {
                                        numinp_ko++; //en principio un input más que queda por acertar
                                        var valor = $.trim($("input", this).val()).toString(); //entrada del input
                                        var correct = false; //si se ha acertado
                                        var originalword = $("input", this).attr("data-input-value");
                                        var peso = parseInt($("input", this).attr("data-weight"),10) || 100;
                                        if (objbox && objbox.casesensitive) {
                                            if (valor === originalword) {
                                                correct = true;
                                            }
                                        } else {
                                            if (valor && originalword && (valor.toLowerCase() === originalword.toLowerCase())) {
                                                correct = true;
                                            }
                                        }
                                        //console.log(valor + "/" + originalword);
                                        if (!correct && objbox && objbox.values) { //si no se ha acertado miro las palabras alternativas, siempre que exista el objeto con las opciones del input
                                            //var xvalues = ""; //guarda las palabras alternativas para mostrarlas, junto con la original, cuando se entra una
                                            for (var i = 0; i < objbox.values.length; ++i) {
                                                //xvalues += objbox.values[i] + ", ";
                                                if (objbox.casesensitive) {
                                                    if (valor === objbox.values[i]) {
                                                        correct = true;
                                                    }
                                                } else {
                                                    if (valor && objbox.values[i] && (valor.toLowerCase() === objbox.values[i].toLowerCase())) {
                                                        correct = true;
                                                    }
                                                }
                                            }
                                        } //fin de mirar las palabras alternativas
                                        if (!valor) {
                                            valor = "?";
                                        }
                                        if (correct) {
                                            $(this).removeClass(styles.inptxtko + ' ' + styles.inptxtok).addClass(styles.inptxtok);
                                            numinp_ko--; //un input menos
                                            //calculo la nota
                                            notap += peso / 100;
                                            notat += peso / 100;
                                        } else {
                                            $(this).removeClass(styles.inptxtko + ' ' + styles.inptxtok);
                                            //if ($("input",this).val()) { //no añado la clase incorrecta si está vacío
                                            $(this).addClass(styles.inptxtko);
                                            //}
                                            //calculo la nota
                                            notat += peso / 100;
                                        }
                                    }
                                    //--- endinput text ---------------------------------------------------------

                                    
                                    //--- input number ---------------------------------------------------------
                                    if (objbox && objbox.type === "number") {
                                        numinp_ko++; //en principio un input más que queda por acertar
                                        var valor = $.trim($("input", this).val()); //entrada del input
                                        var correct = false; //si se ha acertado
                                        var originalnumber = $("input", this).attr("data-input-value");
                                        //var decimals = $("input", this).attr("data-input-decimals"); //la propiedad decimals solo sirve para indicar al usuario cuantos decimales debe introducir, no para comprobar la solución, por tanto no sirve de nada guardar su valor en el html
                                        var tofixed = $("input", this).attr("data-input-tofixed");
                                        var min = $("input", this).attr("data-input-min");
                                        var max = $("input", this).attr("data-input-max");
                                        var precision = $("input", this).attr("data-input-accuracy");
                                        var peso = parseInt($("input", this).attr("data-weight"), 10) || 100;
                                        var i = 0;
                                        //primero obtengo el valor del número original con el que debo comparar el número introducido
                                        originalnumber = parseFloat(originalnumber);
                                        if (!originalnumber || !$.isNumeric(originalnumber)) {
                                            //si no hay número en los atributos cojo el primer número de la lista alternativa
                                            for (i = 0; i < objbox.values.length; ++i) {
                                                originalnumber = parseFloat(objbox.values[i]);
                                                if ($.isNumeric(originalnumber)) {
                                                    break;
                                                }
                                            }
                                        }
                                        //isNaN(""); -> false ??
                                        //$.isNumeric("") -> false
                                        if (!$.isNumeric(originalnumber)) {
                                            //si no tenemos número para comparar miramos si hay min y max
                                            if (min && max && $.isNumeric(min) && $.isNumeric(max) && max >= min && $.isNumeric(valor)) {
                                                if (parseFloat(valor) >= parseFloat(min) && parseFloat(valor) <= parseFloat(max)) {
                                                    correct = true;
                                                }
                                            } else {
                                                //si no hay número con el que comparar ni min/max no puedo seguir
                                                $("input", this).val("error");
                                            }
                                        } else {
                                            //tengo ya un número con el que comparar el valor introducido
                                            if (valor && $.isNumeric(valor)) { //si el valor del usuario es un número, continuo
                                                valor = parseFloat(valor);
                                                //ahora tengo varias maneras de ver s el número es correcto
                                                //0. simplemente comparo los números
                                                //1. comparando los valores después de redondearlos (tofixed) a ciertos decimales
                                                //2. comparando los valores con cierta precisión
                                                //3. mirando que el valor introducido esté dentro de un margen (min/max)
                                                //4. comparando el valor con la lista de valores introducidos
                                                if (valor === originalnumber) {
                                                    correct = true;
                                                } else {
                                                    if (tofixed && $.isNumeric(tofixed)) {
                                                        //si hay tofixed
                                                        if (tofixed < 0) { tofixed = 0; }
                                                        if (valor.toFixed(tofixed) === originalnumber.toFixed(tofixed)) { //toFixed devuelve un string, por tanto comparamos strings
                                                            correct = true;
                                                        }
                                                    }
                                                    if (precision && $.isNumeric(precision)) {
                                                        //si hay precision
                                                        if (precision >= 0 && precision <= 100) {
                                                            var tolerancia = Math.abs(originalnumber) * (1 - precision / 100);
                                                            if (valor >= (originalnumber - tolerancia) && valor <= (originalnumber + tolerancia)) {
                                                                correct = true;
                                                            }
                                                        }
                                                    }
                                                    if (min && max && $.isNumeric(min) && $.isNumeric(max) && max >= min) {
                                                        //si hay min y max
                                                        if (parseFloat(valor) >= parseFloat(min) && parseFloat(valor) <= parseFloat(max)) {
                                                            correct = true;
                                                        }
                                                    }
                                                    if (objbox && objbox.values) {
                                                        //finalmente comparo el valor con la lista de valores
                                                        for (i = 0; i < objbox.values.length; ++i) {
                                                            if ($.isNumeric(parseFloat(objbox.values[i])) && valor === parseFloat(objbox.values[i])) {
                                                                correct = true;
                                                                break;
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        } 
                                        if (!valor) {
                                            valor = "?";
                                        }
                                        if (correct) {
                                            $(this).removeClass(styles.inpnumko + ' ' + styles.inpnumok).addClass(styles.inpnumok);
                                            numinp_ko--; //un input menos
                                            //calculo la nota
                                            notap += peso / 100;
                                            notat += peso / 100;
                                        } else {
                                            $(this).removeClass(styles.inpnumko + ' ' + styles.inpnumok).addClass(styles.inpnumko);
                                            //calculo la nota
                                            notat += peso / 100;
                                        }
                                    }
                                    //--- input number ---------------------------------------------------------

                                    if (test) {
                                        //si es un test deshabilito los inputs
                                        $("input", this).prop('disabled', true);
                                    }
                                } //end if input
                            });
                            //--- end bucle [data-input-make]
                            var outClass = styles.inpinf;
                            if (settings.attempts == attempts || test) {
                                actcomplete = true; //para saber que se ha completado la actividad
                            }
                            //--- nota de la actividad ---------------------------------------
                            //añado la puntuación según el nombre de aciertos sobre el total
                            nota = Math.round((notap / notat) * 100);
                            //----------------------------------------------------------------
                            if (numinp_ko === 0) {
                                //oculto los botones. Se volverán a mostrar si se modifica un input
                                $myBtn.hide();
                                if (settings.hint) {
                                    $myBtnHint.hide();
                                }
                            }
                            if (nota>=settings.threshold) {
                                //--- actividad correcta ---
                                //muestro/oculto, si existen, los bloques con atributo data-info-ok="" y data-info-ko=""
                                //en esta actividad coloca el interior del bloque detrás del botón de chequeo
                                $('[data-info-ok="' + settings.id + '"]').show();
                                $('[data-info-ko="' + settings.id + '"]').hide();
                                if (settings["wai-aria"]) {
                                    $('[data-info-ok="' + settings.id + '"]').attr('aria-hidden', false);
                                    $('[data-info-ko="' + settings.id + '"]').attr('aria-hidden', true);
                                }
                            } else {
                                //--- actividad incorrecta ---
                                //muestro/oculto, si existen, los bloques con atributo data-info-ok="" y data-info-ko=""
                                //en esta actividad los bloques onok y onko se muestran hallá donde están
                                $('[data-info-ok="' + settings.id + '"]').hide();
                                $('[data-info-ko="' + settings.id + '"]').show();
                                if (settings["wai-aria"]) {
                                    $('[data-info-ok="' + settings.id + '"]').attr('aria-hidden', true);
                                    $('[data-info-ko="' + settings.id + '"]').attr('aria-hidden', false);
                                    if ($('[data-input-showinfo="' + settings.id + '"]').length) {
                                        $myBtn.attr("aria-describedby", settings.id + "_inputinfo");
                                    }
                                }
                            }
                            //-----------------------------------------------------
                            //muestro en el div de salida los intentos y los aciertos
                            var $ouput = $('[data-input-showinfo="' + settings.id + '"]');
                            if ($ouput.length > 0) {
                                var output = '<div id="' + settings.id + '_inputinfo" class="' + outClass + '"' + ((settings["wai-aria"])?' role="status"':'') + '>';
                                if (!test) {
                                    output += attempts + ' ' + lang.attempts + '<br />';
                                }
                                output += (numqs - numinp_ko) + '/' + numqs + ' ' + lang.corrects;
                                output += '</div>';
                                $ouput.slideToggle();
                                $ouput.html(output);
                                $ouput.slideToggle();
                            }
                            //-----------------------------------------------------
                            if (test) { //en los test (habrá un solo intento) pongo la nota de la actividad
                                //guardo el resultado en un div dentro de otro div oculto en el div del test para después procesarlo
                                $("#" + miIdEx + "_results").append('\t<div data-type="' + settings.type + '" data-id="' + settings.id + '" data-weight="' + nota + '" data-weighting="' + weighting + '" data-lighting="' + lighting + '"></div>\n');
                            }
                            break;
                            //--- end input ----------------------------------------------------
                        case "gapfill":     //rellenar huecos
                            var numgaps = 0, numinp = 0; //cuenta el numero de huecos y elnumero de entradas que quedan. Las entradas pueden ser tags inputs o tags selects
                            var notap = 0, notat = 0; //notas parciales y totales;
                            var $elGaps = $('[data-makeqs="' + settings.id + '"]'); //elemento(s) que contiene los gaps
                            numgaps = $('[data-gap-fill]', $elGaps).length + $('[data-gap-select]', $elGaps).length;
                            //--- bucle por los elementos html que son huecos
                            $('[data-gap-fill]', $elGaps).each(function (index) { //this será el span que contiene el input    
                                if ($("input", this).length) { //solo reviso un gap si hay input dentro del elemento
                                    numinp++;
                                    var valor = $.trim($("input", this).val()); //entrada del input
                                    var objgap = settings.gaps[$(this).attr("data-gap-fill")]; //el objeto gap
                                    var correct = false; //si se ha acertado
                                    var originalword = $("input", this).attr("data-gap-word");
                                    var gapname = $("input", this).attr("data-gap");
                                    var peso = parseInt($("input", this).attr("data-weight"), 10) || 100;
                                    if (settings.hint) {
                                        $myBtnHint.show(); //si hay huecos existe hint
                                    }
                                    if (objgap && objgap.casesensitive) {
                                        if (valor === originalword) {
                                            correct = true;
                                        }
                                    } else {
                                        if (valor && originalword && (valor.toLowerCase() === originalword.toLowerCase())) {
                                            correct = true;
                                        }
                                    }
                                    //console.log(valor + "/" + originalword);
                                    if (!correct && objgap) { //si no se ha acertado miro las palabras alternativas, siempre que exista el objeto con las opciones del hueco
                                        var xwords = ""; //guarda las palabras alternativas para mostrarlas, junto con la original, cuando se entra una
                                        var wfound = false;
                                        for (var i = 0; i < objgap.words.length; ++i) {
                                            xwords += objgap.words[i] + ", ";
                                            if (objgap.casesensitive) {
                                                if (valor === objgap.words[i]) {
                                                    correct = true;
                                                    wfound = true;
                                                    if (objgap.showwords) {
                                                        valor += '<sup>[' + index + ']</sup>'; //añado una referencia con un superíndice
                                                    }
                                                }
                                            } else {
                                                if (valor && objgap.words[i] && (valor.toLowerCase() === objgap.words[i].toLowerCase())) {
                                                    correct = true;
                                                    wfound = true;
                                                    if (objgap.showwords) {
                                                        valor += '<sup>[' + index + ']</sup>'; //añado una referencia con un superíndice
                                                    }
                                                }
                                            }
                                        }
                                        if (wfound && xwords.length && objgap.showwords) {
                                            //muestro las palabras alternativas con el superíndice
                                            xwords = xwords.substring(0, xwords.length - 2);
                                            if (!$('.' + styles.gapwords, $myDiv).length) {
                                                $("#" + settings.id + "_out", $myDiv).before('<div class="' + styles.gapwords + '"></div>');
                                            }
                                            $('.' + styles.gapwords, $myDiv).append('<sup>[' + index + ']</sup> ' + (originalword ? originalword : '?') + " = " + xwords + "<br />");
                                        }
                                    } //fin de mirar las palabras alternativas
                                    if (!valor || $.trim(valor) === "") {
                                        valor = lang.gapko;           //valor = "(  ?  )";
                                    }
                                    if (correct) {
                                        $(this).html('<span data-gap="' + gapname + '" data-gap-result="ok" data-weight="' + peso + '"' + (settings["wai-aria"] ? ' aria-label="' + lang.ok + '" aria-describedby="' + settings.id + '_out' + '"' : '') + ' tabindex="0" class="' + styles.gapok + '">' + valor + '</span>');
                                        numinp--; //un input menos
                                        //calculo la nota
                                        notap += peso / 100;
                                        notat += peso / 100;
                                    } else {
                                        if (settings.attempts === attempts || test) {
                                            $(this).html('<span data-gap="' + gapname + '" data-gap-result="ko" data-weight="' + peso + '"' + (settings["wai-aria"] ? ' aria-label="' + lang.ko + '" aria-describedby="' + settings.id + '_out' + '"' : '') + ' tabindex="0" class="' + styles.gapko + '">' + valor + '</span>');
                                        }
                                        //calculo la nota
                                        notat += peso / 100;
                                    }
                                } else {    //end if input
                                    //si no hay select es que se ha resuelto antes, pero debo seguir contando la nota
                                    if ($('[data-gap-result="ok"]', this).length) {
                                        //hay un span de un elemento resuelto antes
                                        var peso = parseInt($('[data-gap-result="ok"]', this).attr("data-weight"), 10) || 100;
                                        //calculo la nota
                                        notap += peso / 100;
                                        notat += peso / 100;
                                    }
                                }
                            });
                            //--- end bucle [data-gap-fill]
                            $('[data-gap-select]', $elGaps).each(function (index) { //this será el span que contiene el select
                                if ($("select", this).length) { //solo reviso un gap si hay select dentro del elemento
                                    numinp++;
                                    var valor = $("select", this).val(); //entrada del select
                                    //var objgap = settings.gaps[$(this).attr("data-gap-select")]; //el objeto gap
                                    var correct = false; //si se ha acertado
                                    var peso = parseInt($("select", this).attr("data-weight"), 10) || 100;
                                    var gapname = $("input", this).attr("data-gap");
                                    if ($("select", this).attr("data-gap-word") === valor) {
                                        correct = true;
                                    }
                                    if (!valor || $.trim(valor) === "") {
                                        valor = lang.gapko;           //valor = "(  ?  )";
                                    }
                                    if (correct) {
                                        $(this).html('<span data-gap="' + gapname + '" data-gap-result="ok" data-weight="' + peso + '"' + (settings["wai-aria"] ? ' aria-label="' + lang.ok + '" aria-describedby="' + settings.id + '_out' + '"' : '') + ' tabindex="0" class="' + styles.gapok + '">' + valor + '</span>');
                                        numinp--; //un input menos
                                        //calculo la nota
                                        notap += peso / 100;
                                        notat += peso / 100;
                                    } else {
                                        if (settings.attempts == attempts || test) {
                                            $(this).html('<span data-gap="' + gapname + '" data-gap-result="ko" data-weight="' + peso + '"' + (settings["wai-aria"] ? ' aria-label="' + lang.ko + '" aria-describedby="' + settings.id + '_out' + '"' : '') + ' tabindex="0" class="' + styles.gapko + '">' + valor + '</span>');
                                        }
                                        //calculo la nota
                                        notat += peso / 100;
                                    }
                                } else {    //end if select
                                    //si no hay select es que se ha resuelto antes, pero debo seguir contando la nota
                                    if ($('[data-gap-result="ok"]', this).length) {
                                        //hay un span de un elemento resuelto antes
                                        var peso = parseInt($('[data-gap-result="ok"]', this).attr("data-weight"), 10) || 100;
                                        //calculo la nota
                                        notap += peso / 100;
                                        notat += peso / 100;
                                    }
                                }
                            });
                            //--- end bucle [data-gap-select]
                            //--- nota de la actividad ---------------------------------------
                            //calculo la puntuación según el nombre de aciertos sobre el total
                            nota = Math.round((notap / notat) * 100);
                            //----------------------------------------------------------------
                            var outClass = styles.gapout, sItem = "", $info;
                            if (nota >= settings.threshold) {
                                //--- actividad correcta ---
                                //muestro también, si existe, el bloque con atributo data-info-ok=""
                                //en esta actividad coloca el interior del bloque detrás del botón de chequeo
                                $info = $('[data-info-ok="' + settings.id + '"]');
                                if ($info.length) {
                                    sItem = '\n<div class="' + styles.testsolok + '">' + $info.html() + '</div>';
                                }
                            } else {
                                //--- actividad incorrecta ---
                                //muestro también, si existe, el bloque con atributo data-info-ok=""
                                //en esta actividad coloca el interior del bloque detrás del botón de chequeo
                                $info = $('[data-info-ko="' + settings.id + '"]');
                                if ($info.length) {
                                    sItem = '\n<div class="' + styles.testsolko + '">' + $info.html() + '</div>';
                                }
                            }
                            if (settings.attempts == attempts || numinp === 0 || test) {
                                actcomplete = true; //para saber que se ha completado la actividad cuando no se agotan los intentos
                                //un vez terminado según se acierte muestro una clase u otra
                                if (numinp === 0) {
                                    outClass += ' ' + styles.gapoutendok;
                                } else {
                                    outClass += ' ' + styles.gapoutendko;
                                }
                                //si se han agotado los intentos o no quedan inputs de entrada modifico las clases por las definitivas
                                $('.' + styles.gapok, $elGaps).removeClass(styles.gapok).addClass(styles.gapokend);
                                $('.' + styles.gapko, $elGaps).removeClass(styles.gapko).addClass(styles.gapkoend);
                                if (settings.hint) {
                                    $myBtnHint.hide();
                                }
                                $("#" + settings.id + "_btn", $myDiv).hide();
                                if (settings["wai-aria"]) {
                                    $("#" + settings.id + "_btn", $myDiv).attr('aria-hidden', true);
                                }
                            }
                            //-----------------------------------------------------
                            //muestro en el div de salida los intentos y los aciertos
                            var output = '<div class="' + outClass + '"' + ((settings["wai-aria"]) ? ' role="status"' : '') + '>';
                            if (!test) {
                                output += attempts + ((settings.attempts > 0) ? '/' + settings.attempts : '') + ' ' + lang.attempts + '<br />';
                            }
                            output += (numgaps - numinp) + '/' + numgaps + ' ' + lang.corrects;
                            output += '</div>\n';
                            $("#" + settings.id + "_out").slideToggle();
                            $("#" + settings.id + "_out").html(output + sItem);
                            $("#" + settings.id + "_out").slideToggle();
                            //-----------------------------------------------------
                            if (test) { //en los test (habrá un solo intento) pongo la nota de la actividad
                                //guardo el resultado en un div dentro de otro div oculto en el div del test para después procesarlo
                                $("#" + miIdEx + "_results").append('\t<div data-type="' + settings.type + '" data-id="' + settings.id + '" data-weight="' + nota + '" data-weighting="' + weighting + '" data-lighting="' + lighting + '"></div>\n');
                            }
                            break;
                            //------ end gapfill--------------------------------------------------------
                        case "multi":
                            //cuando se permiten múltiples respuestas debo comprobar si se ha acertado y muestro en el div de salida
                            //todo el contenido de los div de los items marcados.
                            var x = $("input[type=checkbox]:checked", $myDiv); //todos los marcados
                            var html = ""; //guarda los div con las explicaciones de las opciones marcadas
                            x.each(function () {
                                //recolecto en var html el contenido explicativo de los divs que corresponden a las opciones marcadas
                                var answ = $(this).attr("data-answer");
                                var sItem = "", attrid = "";
                                if (answ) {
                                    sItem = $("[data-opt=" + $(this).attr("data-answer") + "]", $myDiv).html();
                                    attrid = settings.id + '_out_' + answ;
                                }
                                if (!sItem) { sItem = ""; }
                                html += '<div' + (attrid ? ' id="' + attrid + '"' : '') + '>\n' + sItem + '</div>\n';
                                if (settings["wai-aria"]) {
                                    //la descripción está en el div id_result y en el div, si existe, id_out_[answ]
                                    $(this).attr("aria-describedby", settings.id + '_result' + (attrid ? ' ' + attrid : ''));
                                }
                            });
                            var chks = $("input[type=checkbox]", $myDiv); //todas las opciones
                            var count = chks.length; //cuantas de opciones hay
                            var ok = 0; //cuantos aciertos hay
                            chks.each(function () {
                                if (this.checked) {
                                    if ($(this).attr("data-ok") == "true") {
                                        ok++;
                                        if (!test && settings.optsuccess) {
                                            //pongo el estilo para opción acertada
                                            $(this).parent().addClass(styles.optok + (csshexent ? (' ' + styles.hexent) : ''));
                                        }
                                    } else {
                                        if (!test && settings.optsuccess) {
                                            //pongo el estilo para opción fallada
                                            $(this).parent().addClass(styles.optko + (csshexent ? (' ' + styles.hexent) : ''));
                                        }
                                    }
                                } else {
                                    if ($(this).attr("data-ok") == "false") { ok++; }
                                }
                            });
                            //--- nota de la actividad ---------------------------------------
                            //añado la puntuación según el nombre de aciertos sobre el total
                            nota = Math.round((ok / count) * 100);
                            //----------------------------------------------------------------
                            var result = ""; //guarda la relación de aciertos
                            var clsRes = styles.testhint;
                            //settings.hint = settings.hint; variable que especifica si hay que ayudar mostrando los aciertos
                            //mostramos los aciertos según esta variable o si se ha acertado todo
                            if (settings.hint || (ok === count)) { 
                                result = ok.toString() + '/' + count.toString();
                            }
                            var sItem = "", $info;
                            if (ok === count) { //-> 100%
                                clsRes += ' ' + styles.testok; //añado el estilo para cuando se ha acertado
                                result = '<strong>' + result + ' 100%</strong>';
                                $myBtn.prop('disabled', true); //deshabilito el botón cuando se acierta
                            }
                            if (nota>=settings.threshold) {
                                //--- actividad correcta ---
                                //muestro también, si existe, el bloque con atributo data-info-ok=""
                                //en esta actividad coloca el interior del bloque detrás del botón de chequeo
                                $info = $('[data-info-ok="' + settings.id + '"]');
                                if ($info.length) {
                                    sItem = '\n<div class="' + styles.testsolok + '">' + $info.html() + '</div>';
                                }
                            } else {
                                //--- actividad incorrecta ---
                                //muestro también, si existe, el bloque con atributo data-info-ko=""
                                //en esta actividad coloca el interior del bloque detrás del botón de chequeo
                                $info = $('[data-info-ko="' + settings.id + '"]');
                                if ($info.length) {
                                    sItem = '\n<div class="' + styles.testsolko + '">' + $info.html() + '</div>';
                                }
                            }
                            result = '<div  class="' + clsRes + '"' + ((settings["wai-aria"]) ? ' role="status"' : '') + '>\n' + result + '\n</div>'; //creo el div con los aciertos
                            result = '<div id="' + settings.id + '_result">\n' + result + sItem  + '\n</div>\n'; //creo el div para los resultados, suma de div aciertos + div explicación
                            if (document.getElementById(settings.id + "_result")) {
                                //debo filtrar ya que si no falla debido a que el elemento no existe hasta que se pulsa en el botón
                                document.getElementById(settings.id + "_result").style.display = 'block';
                            }
                            $myOut.html(result + html); //coloco en el div de salida las explicaciones de las opciones marcadas más los resultados
                            if (test) {
                                //si es un test deshabilito todas las opciones 
                                chks.prop('disabled', true);
                                //chks.attr("disabled", "disabled"); //xhtml 
                                if (chks.length > 0) { //en este caso puedo no seleccionarse nada y ser correcto

                                    //guardo el resultado en un div dentro de otro div oculto en el div del test para después procesarlo
                                    $("#" + miIdEx + "_results").append('\t<div data-type="' + settings.type + '" data-id="' + settings.id + '" data-weight="' + nota + '" data-weighting="' + weighting + '" data-lighting="' + lighting + '"></div>\n');
                                }
                            } else {
                                $(this).prop("disabled", true); //this aquí es el botón que ha llamado a la función
                                chks[0].focus(); //Accesibilidad. Al deshabilitarse el botón el foco se pierde.
                                //mostramos el bloque de correcto/error
                                if (!(nota>=settings.threshold)) {
                                    chks[0].scrollIntoView(); //Accesibilidad. Si se falla hacemos visible el elemento con el foco.
                                }
                            }
                            break;
                            //----- end multi -----------------------------------------------------------
                        case "single":
                            var $Check = $("input[type=radio]:checked", $myDiv); //opción marcada
                            //var x = $myDiv.find("input[type=radio]:checked").attr("data-answer"); //equivalente
                            if ($Check.length > 0) {
                                //muestro en el div de salida de la pregunta la explicación para esa opción
                                var html = "", sItem=""; //guarda los div con las explicaciones de las opciones marcadas
                                var answ = $Check.attr("data-answer");
                                if (answ) {
                                    html = $("[data-opt=" + answ + "]", $myDiv).html(); //si se pasa undefined a .html() no hace nada de forma que el div quedaría intacto 
                                }
                                var $info;
                                //--- nota de la actividad ---------------------------------------
                                nota = $Check.attr("data-weight") || 0;
                                nota = parseFloat(nota);
                                //----------------------------------------------------------------
                                if (nota >= settings.threshold) {
                                    //--- actividad correcta ---
                                    if (!test && settings.optsuccess) {
                                        //pongo el estilo para opción acertada
                                        $Check.parent().addClass(styles.optok + (csshexent ? (' ' + styles.hexent) : ''));
                                    }
                                    //muestro también, si existe, el bloque con atributo data-info-ok=""
                                    //en esta actividad coloca el interior del bloque detrás del botón de chequeo
                                    $info = $('[data-info-ok="' + settings.id + '"]');
                                    if ($info.length) {
                                        sItem = '\n<div class="' + styles.testsolok + '">' + $info.html() + '</div>';
                                    }
                                } else {
                                    //--- actividad incorrecta ---
                                    if (!test && settings.optsuccess) {
                                        //pongo el estilo para opción acertada
                                        $Check.parent().addClass(styles.optko + (csshexent ? (' ' + styles.hexent) : ''));
                                    }
                                    //muestro también, si existe, el bloque con atributo data-info-ko=""
                                    //en esta actividad coloca el interior del bloque detrás del botón de chequeo
                                    $info = $('[data-info-ko="' + settings.id + '"]');
                                    if ($info.length) {
                                        sItem = '\n<div class="' + styles.testsolko + '">' + $info.html() + '</div>';
                                    }
                                }
                                $myOut.html(sItem + html); //coloco en el div de salida las explicaciones de las opciones marcadas más los resultados 
                                if (settings["wai-aria"]) {
                                    $Check.attr("aria-describedby", settings.id +'_out');
                                }
                                if (test) {
                                    //añado la puntuación sobre 1
                                    var selid = $Check.attr("id");

                                    //guardo el resultado en un div dentro de otro div oculto en el div del test para después procesarlo
                                    $("#" + miIdEx + "_results").append('\t<div data-type="' + settings.type + '" data-id="' + settings.id + '" data-selected="' + selid + '" data-weight="' + nota + '" data-weighting="' + weighting + '" data-lighting="' + lighting + '"></div>\n');
                                } else {
                                    //mostramos el bloque de correcto/error
                                    if (nota>=settings.threshold) {
                                        if ($('#' + settings.id + ' .' + styles.testsolok).length) {
                                            $('#' + settings.id + ' .' + styles.testsolok)[0].scrollIntoView();
                                        }
                                    } else {
                                        if ($('#' + settings.id + ' .' + styles.testsolko).length) {
                                            $('#' + settings.id + ' .' + styles.testsolko)[0].scrollIntoView();
                                        }
                                    }
                                }
                            } else {
                                //no se ha seleccionado ninguna opción
                                if (test) {
                                    //guardo el resultado en un div dentro de otro div oculto en el div del test para después procesarlo
                                    $("#" + miIdEx + "_results").append('\t<div data-type="' + settings.type + '" data-id="' + settings.id + '" data-weight="none" data-weighting="' + weighting + '" data-lighting="0"></div>\n');
                                    //como peso pongo 'none' para saber que no se ha seleccionado nada, la ponderación siempre debo ponerla y la reprobación es cero ya que no se ha contestado
                                }
                            }                        
                            if (!test) {
                                $(this).prop("disabled", true); //this aquí es el botón que ha llamado a la función
                                $Check.focus(); //Accesibilidad. Al deshabilitarse el botón el foco se pierde.
                                //$(this).attr("disabled", "disabled"); //xhtml
                            } else {
                                //en un examen desabilito las opciones
                                $("input[type=radio]", $myDiv).prop('disabled', true);
                                //$("input[type=radio]", $myDiv).attr("disabled", "disabled");
                            }
                            //------ end single--------------------------------------------------------

                    } //end switch


                    if (nota >= 100) {
                        attempts = 0; //al obtener un 100% pongo los intentos a cero
                    }

                    //--- eventos onok y onko -------------------------------
                    if (nota >= settings.threshold) {
                        onok = true; //-> lanzar evento onok
                        //storethis = true; //guardar en el storage
                    } else {
                        onok = false; //-> lanzar evento onko
                        //storethis = false;
                    }
                    //------------------------------------------------------
                    


                    //--- objeto score -------------------------------------
                    setQuestion.objscore.type = settings.type;
                    setQuestion.objscore.id = settings.id;
                    setQuestion.objscore.name = settings.name;
                    setQuestion.objscore.weighting = weighting;
                    setQuestion.objscore.lighting = lighting;
                    setQuestion.objscore.date = getDateTime(); //fecha y hora en formato JSON
                    setQuestion.objscore.score = nota;
                    //--- variables públicas ------------------------------
                    setQuestion.score = nota; //hacemos público la puntuación en la variable score
                    setQuestion.update = settings.id; //última actividad que ha actualizado una variable pública
                    //------------------------------------------------------


                    //guardo el resultado en el storage en la entrada igual al id
                    if (!test && settings.storage) { // && storethis quitado para que se guarde cualquier resultado
                        //se guarda también el tipo de actividad en la propiedad "type" por si fuera necesario comprobarla
                        storeResults(settings.storage, settings.storagekey, settings.id, { "type": "jsgeork." + settings.type, "id": settings.id, "name": settings.name, "weighting": settings.weighting, "lighting": settings.lighting, "score": setQuestion.score, "qbase": "100", "date": getDateTime() }, true);
                    }

                    //--- objeto score -------------------------------------
                    try {
                        //después de entregar cada actividad guardamos en la función setQuestion el objscore como una variable pública de nombre igual al id de la actividad
                        setQuestion[settings.id] = setQuestion.objscore;
                    } catch (err) {

                    }
                    //-----------------------------------------------------

                } catch (err) {
                    if (err instanceof CustomException) {
                        err.show();
                    }
                    else {
                        if (debug) { alert("setQuestion.checkSolution(): " + err); }
                    }
                }
            }
            //---- end checkSolution ------------------------------


            //ooooooooooooooooooooooooooooooooooooooooooooooooooo
            //ooo setQuestion main code ooooooooooooooooooooooooo
            //ooooooooooooooooooooooooooooooooooooooooooooooooooo

            try {

            //busco error en el tipo pasado
            if (typeof userOpt !== "object") {
                throw new CustomException({ name: "Data error", message: "bad object" });
            }

            //busco errores en el id
            if (userOpt.type != "input") { //los tipo input no utilizan necesariamente un bloque con id. Los controles se colocan en bloques con determinados atributos.
                if (errorId(userOpt.id, (userOpt.name || userOpt.legend))) { return; }
            }

            

            if (window.jQuery) { // jQuery is loaded  

                //cargo el idioma si se ha especificado
                if (userOpt.lang) {
                    setLang(userOpt.lang);
                }

                options = userOpt;
                settings = $.extend({}, defaults, options); //Decorator pattern


                //tipo de iconos
                if (settings.icons === "csshexent") {
                    csshexent = true;
                } else {
                    csshexent = false;
                }

                //------------------------------------------------------------------
                //Las propiedades de defaults quedarán sobre escritas por las propiedades de options de forma
                //que si quiero propiedades por defecto en los subelementos deberé extenderlos uno a uno
                for (var i = 0; i < settings.opt.length; i++) {
                    settings.opt[i] = $.extend({}, defaults_opt, options.opt[i]);
                    //settings.opt[i].text= settings.opt[i].text || lang.option + ' ' + i.toString();
                    //settings.opt[i].answer= settings.opt[i].answer || "";
                    //settings.opt[i].select= settings.opt[i].select || false;
                    //settings.opt[i].weight= settings.opt[i].weight || 0;
                }
                for (var prop in options.boxs) {
                    settings.boxs[prop] = $.extend({}, defaults_boxs, options.boxs[prop]);
                }
                for (var prop in options.gaps) {
                    settings.gaps[prop] = $.extend({}, defaults_gaps, options.gaps[prop]);
                }
                //------------------------------------------------------------------


                //--- public vars ------------------------------------
                //hago público el id de la actividad que ha llamado a la función
                setQuestion.lastcall = settings.id;
                //hago públicos los intentos y la puntuación
                setQuestion.attempts = 0;
                setQuestion.score = 0;
                setQuestion.objscore = null; //de momento creamos la variable pública pero le damos un valor nulo hasta que no se entregue la actividad
                setQuestion.update = settings.id; //última actividad que ha actualizado una variable pública
                //---------------------------------------------------

                $myDiv = $("#" + settings.id);
                //las actividades settings.type === "input" no requieren de un bloque con la id de la pregunta
                //en este caso $myDiv.length === 0 y puede que algunas cosas no funcionen


                //debo guadar aquellos valores que necesitaré para los eventos
                if (test) {
                    miIdEx = test.id;
                }
                

                //añadimos una clase para que pueda modificarse el css solo de las actividades de este tipo
                if ($myDiv.length > 0) {
                    if (settings.clase) {
                        $myDiv.addClass(settings.clase);
                    } else {
                        $myDiv.addClass(styles.act);
                    }
                }

                //--- fillfromstorage ---------------------------------------
                var setvalue = false; //si es true deben llenarse los inputs con las respuestas correctas y poner la clase para cuando se ha acertado
                if (!test && settings.fillfromstorage) {
                    if ("fillfromstorage" === getResults(settings.storage, settings.storagekey, settings.id, settings.delstorage, "fillfromstorage")) {
                        setvalue = true;
                    }
                }
                //--- end fillfromstorage ---------------------------------------
                        
                //variables que debo actualizar cuando pueda buscar en el html
                var $myBtn, $myBtnHint, $myOut;
 
                switch (settings.type) {
                    case "input":
                        //los inputs (igual que los huecos de los gapfill) no se limitan al interior de un bloque de determinado elemento, 
                        //se crean en los bloques de atributo data-makeqs="" igual al valor del id del obj entrado de todo el documento
                        makeHtmlInputs(settings, test);
                        //guardo elementos, que no tiene porque estar dentro de $myDiv
                        $myBtn = $("#" + settings.id + "_btn");
                        if (settings.hint) {
                            $myBtnHint = $("#" + settings.id + "_btnhint");
                        }
                        //desactivo el botón hasta que no se modifique un input, siempre que no se hayan cargado las opciones correctas al haber sido solucionada la pregunta antes
                        if (!setvalue) {
                            $myBtn.prop("disabled", true);
                        }
                        break;
                    case "gapfill":
                        //añado el html con los controles al inicio del div.
                        makeHtmlQuestionGapFill(settings, test);
                        //Después de colocar el html de control creo los huecos
                        makeGapFills(settings,test);
                        //guardo elementos
                        $myBtn = $("#" + settings.id + "_btn", $myDiv);
                        if (settings.hint) {
                            $myBtnHint = $("#" + settings.id + "_btnhint", $myDiv);
                        }
                        //desactivo el botón hasta que no se modifique un input
                        //desactivo el botón hasta que no se modifique un input, siempre que no se hayan cargado las opciones correctas al haber sido solucionada la pregunta antes
                        if (!setvalue) {
                            $myBtn.prop("disabled", true);
                        } else {
                            if (settings.hint) {
                                $myBtnHint.prop("disabled", true);
                            }
                        }
                        break;
                    case "single":
                        //sin break, sigo con las instrucciones de multi
                    case "multi":
                        //añado el html al inicio del div.
                        makeHtmlQuestion(settings, test);
                        //guardo elementos
                        $myBtn = $("#" + settings.id + "_btn", $myDiv);
                        if (settings.hint) {
                            $myBtnHint = $("#" + settings.id + "_btnhint", $myDiv);
                        }
                        $myOut = $("#" + settings.id + "_out", $myDiv);
                        break;
                }

                if (settings.type === "single" && !setvalue) {
                    //desactivo el botón hasta que no se seleccione una opción
                    $myBtn.prop("disabled", true);
                }


                //--- EVENTOS -------------------------------------------------
                //Los eventos no pueden depender del objeto settings. Los datos necesarios deben guardarse en el html

                //eventos para los single
                if (settings.type === "single") {
                    $("input", $myDiv).on("change", function () {
                        $myOut.html("");
                        $myBtn.prop("disabled", false);
                        //$myBtn.removeAttr("disabled"); //xhtml
                        $("label", $myDiv).removeClass(styles.stofilled).removeClass(styles.hexent).removeClass(styles.optok).removeClass(styles.optko);
                        if (settings["wai-aria"]) { //quito los atributos de todos los inputs
                            $("input", $myDiv).removeAttr("aria-describedby");
                        }
                    });
                }

                //eventos para los multi
                if (settings.type === "multi") {
                    $("input", $myDiv).on("change", function () {
                        $myOut.html("");
                        if (document.getElementById(settings.id + "_result")) {
                            //el elemento no se crea hasta que se pulsa en el botón
                            document.getElementById(settings.id + "_result").style.display = 'none';
                        }
                        $myBtn.prop('disabled', false); //habilito el botón ya que se deshabilita cuando se acierta
                        $("label", $myDiv).removeClass(styles.stofilled).removeClass(styles.hexent).removeClass(styles.optok).removeClass(styles.optko);
                        if (settings["wai-aria"]) { //pongo los atributos de todos los inputs de nuevo al enunciado, si existe
                            if ($('#' + settings.id + "_info_aria").length) {
                                $("input", $myDiv).attr("aria-describedby", settings.id + "_info_aria");
                            } else {
                                $("input", $myDiv).removeAttr("aria-describedby");
                            }
                        }
                    });
                }

                        

                //eventos para los input
                if (settings.type === "input") {
                    var $elQs = $('[data-makeqs="' + settings.id + '"]'); //elemento(s) que contiene las questions
                        
                    $("input", $elQs).on("keyup change", function (e) {
                        if (e.keyCode !== 9 && !e.shiftKey) {
                            if (!test) {
                                $myBtn.prop("disabled", false);
                                $('#' + settings.id + '_inputinfo').hide();
                                if (settings["wai-aria"]) {
                                    $('#' + settings.id + '_inputinfo').attr('aria-hidden', true);
                                }
                                $myBtn.show();
                                $('[data-info-ok="' + settings.id + '"]').hide();
                                $('[data-info-ko="' + settings.id + '"]').hide();
                                if (settings["wai-aria"]) {
                                    $('[data-info-ok="' + settings.id + '"]').attr('aria-hidden', true);
                                    $('[data-info-ko="' + settings.id + '"]').attr('aria-hidden', true);
                                }
                                if (settings["wai-aria"]) {
                                    $myBtn.removeAttr("aria-describedby");
                                }
                            }
                            if (settings.hint) {
                                $myBtnHint.show();
                            }
                        }
                    });
                       

                    //eventos para los input text
                    $('[data-input-make] input[data-input-type="text"]', $elQs).on("keyup keydown change", function (e) {
                        if (e.keyCode !== 9 && !e.shiftKey) {
                            $(this).parent().removeClass(styles.inptxtok + ' ' + styles.inptxtko);
                            $(this).parent().removeClass(styles.stofill);
                        }
                    });
                    //eventos para los input number
                    $('[data-input-make] input[ data-input-type="number"]', $elQs).on("keyup keydown change", function (e) {
                        if (e.keyCode !== 9 && !e.shiftKey ) {
                            $(this).parent().removeClass(styles.inpnumok + ' ' + styles.inpnumko);
                            $(this).parent().removeClass(styles.stofill);
                            //permitir solo numeros
                            if ($(this).val() && $.trim($(this).val()) && !$.isNumeric($(this).val())) {
                                $(".onlynum", $(this).parent()).fadeIn("slow");
                            } else {
                                $(".onlynum", $(this).parent()).fadeOut("slow");
                            }
                        }
                    });
                    if (settings.hint) {
                        $myBtnHint.on("click", function () {
                            $('[data-info-hint="' + settings.id + '"]').toggle();
                        });
                    }
                }

                //eventos para los gapfill
                if (settings.type === "gapfill") {
                    var $elGaps = $('[data-makeqs="' + settings.id + '"]'); //elemento(s) que contiene los gaps
                    //activa el botón de chequeo cuando se han cambiado los huecos
                    $("input,select", $elGaps).on("keypress keydown change", function (e) {
                        if (e.keyCode !== 9 && !e.shiftKey) {
                            if (!test) {
                                $myBtn.prop("disabled", false);
                            }
                            $(this).parent().removeClass(styles.stofill);
                        }
                    });

                    if (settings.hint) {
                        //si hay inputs muestro el botón hint
                        if ($("input", $elGaps).length) {
                            $myBtnHint.show();
                        }
                        $myBtnHint.on("click", hintGapFills);
                        //eventos para activar/desactivar el botón hint segun cuando hay/nohay inputs vacíos
                        var inputsgap = $("input", $elGaps);
                        inputsgap.on("keypress change", function (e) {
                            try {
                                if (e.keyCode !== 9 && !e.shiftKey) {
                                    var evacios = false; //para saber si hay inputs boxs vacíos y debe activarse el botón de hint
                                    if (inputsgap.length > 0) {
                                        $myBtnHint.show();
                                        inputsgap.each(function () {
                                            if ($.trim($(this).val()) === "") {
                                                evacios = true;
                                            }
                                        });
                                    } else {
                                        //no hay inputs, oculto el botón de hint
                                        $myBtnHint.hide();
                                    }
                                    //activo/desactivo el botón Hint
                                    if (evacios) {
                                        $myBtnHint.prop("disabled", false);
                                    } else {
                                        $myBtnHint.prop("disabled", true);
                                    }
                                    //$myBtn.removeAttr("disabled"); //xhtml
                                }
                            } catch (err) {
                                if (debug) { alert('gap onchange(): ' + err); }
                            }
                        });
                    }
                }

                        


                if (test) {
                    $myBtn.hide(); //escondo los botones de las preguntas

                    //coloco en los eventos del botón de entregar el test las funciones de comprobar la solución
                    $("#" + test.id + "_btn").on("click", checkSolution);  //llama a la funcion dentro de este closure
                } else {
                    //eventos del botón de la pregunta
                    $myBtn.on("click", checkSolution);

                    //si es un test no pongo resultados previos

                    if (settings.showstorage) {
                        //añado el html de los resultados anteriores al final del div de la pregunta
                        var tbStore = getResults(settings.storage, settings.storagekey, settings.id, settings.delstorage);
                        tbStore = '<div data-store-wrap="' + settings.id + '">\n' + tbStore + '</div>\n'; //lo envuelvo en un div para poder encontrarla en lo eventos y diferenciarla de otras tablas
                        if (tbStore) {
                            if ($('[data-stored-results="' + settings.id + '"]').length) {
                                //si hay un bloque con el atributo data-input-storage="" con el valor del id coloco dentro los resultados previos
                                $('[data-stored-results="' + settings.id + '"]').html(tbStore);
                            } else {
                                //en caso contrario los coloco detrás de fieldset
                                if ($('#' + settings.id + ' fieldset[name="' + settings.id + '"]').length) {
                                    $('#' + settings.id + ' fieldset[name="' + settings.id + '"]').append(tbStore);
                                } else {
                                    //o detrá del bloque
                                    $("#" + settings.id).append(tbStore);
                                }
                            }

                            //coloco los eventos de la tabla con los resultados previos
                            eventosStorage(settings.storage, settings.storagekey, settings.id, '[data-store-wrap="' + settings.id + '"] ');
                            //oculto la tabla por defecto. En las tablas storage siempre pongo los att aria
                            $('[data-storage-tblbox="' + settings.id + '"] table').hide().attr('aria-hidden', true);
                            $('[data-storage-tblbox="' + settings.id + '"] div').show().attr('aria-hidden', false);
                        }
                    } //end settings.showstorage
                    
                } //not test



                //--- eventos personalizados --------------------------------------------------
                //opción de añadir una función al evento de pulsar en el botón de chequeo
                if (typeof settings.oncheck === 'function') {
                    var f_oncheck = function () {

                        settings.oncheck.call(setQuestion);

                        //pongo como referencia la función setQuestion de forma que podré acceder a las funciones 
                        //que defina dentro de ella si las pongo como propiedades de la funcion (ej. setQuestion.miF = miF)
                    };
                    $myBtn.on("click", f_oncheck);
                    if (test) {
                        //coloco el evento en el botón de entregar el test 
                        $("#" + test.id + "_btn").on("click", f_oncheck);
                    }
                    }

                //opción de añadir una función al evento de pulsar en el botón de chequeo cuando se ha completado el gapfil o input
                if (typeof settings.oncomplete === 'function') {
                    var f_oncomplete = function () {
                        if ((settings.type === "gapfill" || settings.type === "input") && actcomplete) {
                            settings.oncomplete.call(setQuestion);
                        }
                    };
                    $myBtn.on("click", f_oncomplete);
                    if (test) {
                        //coloco el evento en el botón de entregar el test
                        $("#" + test.id + "_btn").on("click", f_oncomplete);
                    }
                    }

                //opción de añadir una función al evento de pulsar en el botón de chequeo cuando se ha acertado o fallado una actividad de tipo single
                var f_oko = function () {
                    if ((settings.type === "single") || (settings.type === "multi") || (settings.type === "input") || (settings.type === "gapfill")) {
                        if (onok) {
                            if (typeof settings.onok === 'function') {
                                settings.onok.call(setQuestion);
                            }
                            //propiedad añadida cuando se realiza un test del tipo checker
                            if (settings.onchecker && typeof settings.onchecker === 'function') {
                                settings.onchecker.call(setQuestion);
                            }
                        } else {
                            if (typeof settings.onko === 'function') {
                                settings.onko.call(setQuestion);
                            }
                        }
                    }
                };
                $myBtn.on("click", f_oko);
                if (test) {
                    //coloco el evento en el botón de entregar el test
                    $("#" + test.id + "_btn").on("click", f_oko);
                }


                //opción de añadir una función que se ejecute al finalizar la preparación de la pregunta
                if (typeof settings.onready === 'function') {

                    settings.onready.call(setQuestion);

                    //pongo como referencia la función setQuestion de forma que podré acceder a las funciones 
                    //que defina dentro de ella si las pongo como propiedades de la funcion (ej. setQuestion.miF = miF)
                }
                //--- eventos personalizados --------------------------------------------------
                            
                      

            } else {
                // jQuery is not loaded
                document.getElementById(settings.id).innerHTML = "<span style='color: red;'>" + "This requires jQuery!" + "</span>";
            }


            } catch (err) {
                if (err instanceof CustomException) {
                    err.show();
                }
                else {
                    if (debug) { alert("setQuestion(): " + err); }
                }
            } //end try...catch
        }
        //--- end setQuestion ----------------------------------------------------------



        /** función que calcula, y muestra los resultados de las actividades cuyos ids se han introducido
         * @param {Object} objconfig - objeto con parámetros de configuración. Estructura similar al obj de un test
                            objconfig.id
                            objconfig.qbase - [10]
                            objconfig["wai-aria"] - [true]
                            objconfig.threshold - [50]
                            objconfig.refresh - [true] Si ha hay que poner el botón de refresco          
                            objconfig.caption
                            objconfig.details
                            objconfig.summary
                            objconfig.timer - [0] Si hay que refrescar automáticamente. Se maneja en la función padre.
         * @param {(Object|String)} arguments[i] - Para i>0 se pasan los objetos de las actividades o la cadena de su id que quieren evaluarse
         * @globalobj vars
                            setQuestion[objconfig.id] = {};
                            setQuestion[objconfig.id].eval = score;                 //puntuación final
                            setQuestion[objconfig.id].threshold = threshold;        //umbral de puntuación
                            setQuestion[objconfig.id].date = getDateTime();         //fecha y hora de evaluación en formato JSON.
                            setQuestion[objconfig.id].refresh = resetInterval;      //función para actualizar/iniciar/parar el timer
         * @return {undefined} 
        */
        function setEval(objconfig) {

            var argsEval = arguments,         //closure para llamar recursivamente la función evalActs()
                idEval = objconfig.id;        //closure para el evento del botón actualizar
                

            var mytimer = null,
                nameEval = objconfig.name || "Eval table";  //nombre de la tabla

            //inicia/para el refresco de la tabla
            function resetInterval() {
                if (mytimer) {
                    window.clearInterval(mytimer);
                    mytimer = null;
                    $("#" + objconfig.id + "_timer").css("color", "red");
                    $("#" + objconfig.id + "_refresh button").css("border", "2px solid red");
                } else if (objconfig.timer) {
                    mytimer = window.setInterval(function () { evalActs.apply(this, argsEval); }, objconfig.timer);
                    $("#" + objconfig.id + "_timer").css("color", "inherit");
                    $("#" + objconfig.id + "_refresh button").css("border", "inherit");
                } else {
                    evalActs.apply(this, argsEval);
                }
            }

            function evalActs() {

                var i = 0,
                    fnc = setQuestion,      //función en la que debe buscarse el objeto
                    ids = [],               //matriz que guarda los id de las actividades que hay que evaluar
                    urls = [],              //matriz que guarda las url de las páginas con las actividades que hay que evaluar
                    idsname = [],           //matriz que guarda los nombres de las actividades que hay que evaluar
                    acts = [],              //matriz que guarda los id de las actividades que todavía no se han entregado
                    actsname = [],          //matriz que guarda los nombres de las actividades que todavía no se han entregado
                    urlsacts = [],              //matriz que guarda las url de las páginas con las actividades que hay que evaluar que todavía no se han entregado
                    stokeys = [],           //matriz que guarda las claves del storage de cada actividad
                    csshexent = true,
                    numActs = arguments.length - 1,     //cantidad de actividades que hay que evaluar
                    numIds = 0;                         //cantidad de ids de actividades encontrados


                var score = "-",            //guarda la nota final.
                    total = 0,
                    nota = 0,
                    threshold = 50,         //el umbral convertido a la base correcta
                    html = "";              //variable para crear la tabla de los resultados


                //--- función que devuelve los datos del web storage -------
                function getSTO(sourceD, idx, index) {
                    var xStorage = null;
                    if (objconfig.storage === "local" && localStorage) {
                        xStorage = localStorage;
                    }
                    if (objconfig.storage === "session" && sessionStorage) {
                        xStorage = sessionStorage;
                    }
                    if (xStorage) {  //si el navegador soporta storage
                        if (stokeys[index]) {
                            //el storage se guarda en un objeto en la clave stokey
                            var sdata = JSON.parse(xStorage.getItem(stokeys[index])) || null;
                            if (sdata && sdata[idx]) {
                                //dentro del objeto el storage se guarda en la propiedad iden
                                sourceD = sdata[idx][sdata[idx].length - 1];
                            }
                        } else {
                            //el storage se guarda directamente en la clave iden
                            var sdata = JSON.parse(xStorage.getItem(idx)) || null;
                            if (sdata) {
                                sourceD = sdata[sdata.length - 1];
                            }
                        }  
                    }
                    return sourceD;
                }
                //--- end function -----------------------------------------



                if (typeof objconfig != 'object' || !objconfig.id) {
                    //debe existir un id para poder colocar la tabla una vez creada
                    //objTest
                    return;
                } else {
                    //pongo valores por defecto
                    objconfig.qbase = objconfig.qbase || 10;
                    if (typeof objconfig["wai-aria"] == 'undefined') { objconfig["wai-aria"] = true; }
                    objconfig.threshold = objconfig.threshold || 100; //en principio queremos un 100% en las actividades
                    if (typeof objconfig.refresh == 'undefined') { objconfig.refresh = true; }
                    objconfig.names = objconfig.names || "name";      //para saber si hay que utiliza como nombres la propiedad legend o la propiedad name.
                    objconfig.timer = objconfig.timer || 0;
                }

                //--- storage feature detection -----------------------
                if (objconfig.storage === "local") {
                    if (!localStorage) { objconfig.storage = ""; }
                } else if (objconfig.storage === "session") {
                    if (!sessionStorage) { objconfig.storage = ""; }
                }
                //-----------------------------------------------------


                //obtengo en la matriz ids los ids de las actividades
                for (i = 1; i < arguments.length; i++) {
                    if (typeof arguments[i] === 'object') {
                        stokeys.push(arguments[i].storagekey); //guardo las claves del web storage de cada actividad
                        if (arguments[i].id) {
                            var name = "";
                            var acturl = arguments[i].url || "";
                            if (objconfig.names === "name") {
                                name = arguments[i].name || arguments[i].legend || arguments[i].id;
                            }
                            if (objconfig.names === "legend") {
                                name = arguments[i].legend || arguments[i].name || arguments[i].id;
                            }
                            if (fnc[arguments[i].id] || (objconfig.storage && getSTO(null, arguments[i].id, stokeys.length-1))) {
                                ids.push(arguments[i].id);
                                idsname.push(name);
                                urls.push(acturl);
                            } else {
                                acts.push(arguments[i].id);
                                actsname.push(name);
                                urlsacts.push(acturl);
                            }
                        }
                    } else if (typeof arguments[i] === 'string') {
                        stokeys.push(objconfig.storagekey); //guardo las claves del web storage de cada actividad
                        var acturl = objconfig.url || "";
                        if (fnc[arguments[i]] || (objconfig.storage && getSTO(null, arguments[i], stokeys.length - 1))) { //solo coloco aquellos ids que existen en la función
                            ids.push(arguments[i]);
                            urls.push(acturl);
                        } else {
                            acts.push(arguments[i]);
                            actsname.push(arguments[i]);
                            urlsacts.push(acturl);
                        }  
                    }
                }
                numIds = ids.length;
             
                //aseguro que la base de calificación es una de las aceptadas
                objconfig.qbase = parseInt(objconfig.qbase, 10);
                switch (objconfig.qbase) {
                    case 100:
                    case 20:
                    case 10:
                    case 9:
                    case 8:
                    case 7:
                    case 6:
                    case 5:
                        break;
                    default:
                        objconfig.qbase = 10;
                }

                //tipo de iconos
                if (objconfig.icons === "csshexent") {
                    csshexent = true;
                } else {
                    csshexent = false;
                }


                $.each(ids, function (index) {
                    var sourceD = fnc[this];  //la fuente de los datos es la función fnc
                    if (objconfig.storage) {
                        sourceD = null; //la fuente de los datos será el WebStorage
                        sourceD = getSTO(sourceD, this, index);
                    }
                    if (sourceD) {
                        //calculo el total en tanto por uno
                        var probW = sourceD.weighting;     //ponderación respecto a todas las preguntas
                        if (probW) { total += (+probW / 100); }
                    }
                });
                if (!$.isNumeric(total)) {
                    //si falla pongo la suma de preguntas
                    total = +ids.length;
                }
                html += '<table data-activities-table="' + objconfig.id + '" class="' + styles.tblres + '">\n';
                if (objconfig.caption) {
                    html += '\t<caption>' + objconfig.caption + '\n';
                    if (objconfig.details) {
                        html += '\t\t<details>\n';
                        if (objconfig.summary) {
                            html += '\t\t\t<summary>' + objconfig.summary + '</summary>\n';
                        }
                        html += objconfig.details + '\n';
                        html += '\t\t</details>\n';
                    }
                    html += '\t</caption>\n';
                }
                html += '\t<thead>\n';
                html += '\t\t<tr class="' + styles.tblresth + '"><th>' + lang.question + '</th><th>' + lang.success + '</th><th>' + lang.points + '</th></tr>\n';
                html += '\t</thead>\n';
                html += '\t<tbody>\n';
                $.each(ids, function (index) {
                    var sourceD = fnc[this];
                    if (objconfig.storage) {
                        sourceD = null; //la fuente de los datos será el WebStorage
                        sourceD = getSTO(sourceD, this, index);
                    }
                    if (sourceD) {
                        //hago una entrada para cada problema
                        //var probtype = sourceD.type;
                        var probdate = sourceD.date || "";
                        var probid = this || objconfig.id;
                        var proburl = urls[index] || "";
                        var probw = sourceD.score;            //peso o porcentaje de acierto
                        var probW = sourceD.weighting;        //ponderación respecto a todas las preguntas
                        var probL = sourceD.lighting;         //resto de puntos por contestar y fallar en las preguntas tipo single
                        var notaP = 0;                          //nota de la pregunta sobre 10
                        var probwN = Math.round(objconfig.qbase * probW / total) / 100;        //puntos en juego, utilizado para el label aria para poner los puntos del problema en juego
                        var probwP = "0%";
                        if ((probw == 0) && (Math.abs(probL) > 0)) {
                            probw = probw - Math.abs(probL);
                        }
                        notaP = (((probw / 100) * (+probW / 100)) / (total)) * 10;
                        nota += notaP;
                        notaP = parseFloat(Math.round(notaP * 100) / 100); //ajusto a dos decimales
                        if (objconfig.qbase != 10) {
                            //transformo la nota en base 10 a la base escogida
                            notaP = (objconfig.qbase * notaP) / 10;
                            notaP = parseFloat(Math.round(notaP * 100) / 100); //ajusto a dos decimales
                        }
                        probw += "%"; //pongo el simbolo de porcentaje para mostrar en la tabla de resultados
                        probwP = probw;
                        if (probdate && objconfig.storage) {
                            probdate = '<br/><small>' + formatDateTime(probdate) + '</small>';
                        } else {
                            probdate = ""; //cuando no se lee del storage no pongo la fecha ya que los datos son de la sesión de la página
                        }
                        var probname = idsname[index];
                        if (!probname) {
                            probname = lang.question + " " + (index + 1);
                        }
                        var cssTr = ' class="' + styles.tblrestrpair + '"';
                        if (index % 2) {
                            cssTr = ' class="' + styles.tblrestrodd + '"';
                        }
                        var ponderacion = "";
                        if (+probW < 100) {
                            ponderacion = ' <span title="' + lang.weighting + '">(x' + (+probW / 100) + ')</span>';
                        }
                        var alabel = lang.actscore.replace("$score$", notaP).replace("$ptot$", probwN).replace("$act$", (index + 1)).replace("$%$", probwP).replace("$total$", objconfig.qbase);
                        html += '\t\t<tr' + cssTr + '><td><a href="' + proburl + '#' + probid + '"' + (objconfig["wai-aria"] ? ' aria-label="' + alabel + '"' : '') + ' title="' + alabel + '"><span class="' + styles.tblressl + '">#' + (index + 1) + '</span> <span class="' + styles.tblresll + '">' + probname + '</span></a>' + ponderacion + probdate + '</td>';
                        html += '<td>' + probw + '</td><td>' + notaP + '<sub>/' + objconfig.qbase + '</sub></td></tr>\n';
                    } else {
                        acts.push(this);
                        actsname.push(this);
                    }
                }); //end each
                $.each(acts, function (index) {
                    //añade las actividades que no han sido entregadas y que por tanto no están guardadas en la función setQuestion ni en el storage
                    var probid = this || objconfig.id;
                    var proburl = urlsacts[index] || "";
                    var probname = ""; //= $("#" + probid + " legend").text();
                    probname = actsname[index];
                    var alabel = lang.actnosubmit;
                    html += '\t\t<tr class="' + styles.tblrestrnumact + '"><td colspan="3"><a href="' + proburl + '#' + probid + '"' + (objconfig["wai-aria"] ? ' aria-label="' + alabel + '"' : '') + ' title="' + alabel + '"><span class="' + styles.tblressl + '">#' + (index + 1) + '</span> <span class="' + styles.tblresll + '">' + probname + '</span></a></td>';
                    html += '</tr>\n';
                }); //end each
                html += '\t</tbody>\n';
                if (numIds < numActs) {
                    //cuando todavía faltan actividades para entregar
                    html += '\t<tbody>\n';
                    html += '\t\t<tr class="' + styles.tblrestrnumact + '"><td colspan="3">' + numIds + '/' + numActs + lang.actdone + '</td></tr>\n';
                    html += "\t</tbody>\n";
                }
                html += '\t<tfoot>\n';
                score = parseFloat(Math.round(nota * 100) / 100);
                if (objconfig.qbase != 10) {
                    //transformo la nota en base 10 a la base escogida
                    score = (objconfig.qbase * score) / 10;
                    score = parseFloat(Math.round(score * 100) / 100); //ajusto a dos decimales
                }
                if (score < 0) { score = 0; }
                var btnrefresh = "<td></td>";
                var d = new Date();
                var hh = d.getHours(), mm = d.getMinutes(), ss = d.getSeconds();
                mm = (mm < 10 ? '0' + mm : mm);
                ss = (ss < 10 ? '0' + ss : ss);
                var txtbtn = lang.refresh;
                var tstyle = "", infLapso = "";
                if (objconfig.timer) {
                    txtbtn = hh + ':' + mm + '<small> ' + ss + '</small>';
                    tstyle = ' style="cursor: pointer;"';
                    infLapso = ' (' + Math.round(objconfig.timer / 1000) + 's)';
                }
                if (objconfig.refresh) {
                    btnrefresh = '<td class="' + styles.tblrestdrfsh + '" id="' + objconfig.id + '_refresh"><button type="button" title="' + lang.titlerefresh + '"' + (objconfig["wai-aria"] ? ' aria-label="' + lang.titlerefresh + '"' : '') + ' class="' + styles.btntblrefresh + (csshexent ? (' ' + styles.hexent) : '') + '">' + txtbtn + '</button></td>';
                } else {
                    btnrefresh = '<td class="' + styles.tblrestdrfsh + '" id="' + objconfig.id + '_timer" title="' + lang.lasttime + '">' + hh + ':' + mm + '<small> ' + ss + '</small>' + '</td>';
                }
                html += '\t\t<tr class="' + styles.tblrestrtot + '">' + btnrefresh + '<td class="' + styles.tblrestdtota + '">' + lang.total + ": " + '</td><td id="' + objconfig.id + '_fscore"' + (objconfig["wai-aria"] ? ' aria-label="' + lang.fscore.replace("$score$", score).replace("$total$", objconfig.qbase) + '"' : '') + ' class="' + styles.tblrestdtotb + '" tabindex="0" title="' + lang.lasttime + ' ' + d.getHours() + 'h:' + d.getMinutes() + 'm:' + d.getSeconds() + 's' + infLapso + '"' + tstyle + '>' + score + '<sub>/' + objconfig.qbase + '</sub></td></tr>\n';
                html += "\t</tfoot>\n";
                html += "</table>\n";



                //añado el html en el bloque con atributo data-activities-eval igual al id del objconfig, o si no existe al final del div del con ese id
                if ($('[data-activities-eval="' + objconfig.id + '"]').length) {
                    $('[data-activities-eval="' + objconfig.id + '"]').html(html);
                } else {
                    $("#" + objconfig.id).html(html);
                }


                //añado el evento al botón Refresh
                if (objconfig.refresh) {
                    $("#" + idEval + "_refresh").off("click", function () {
                        evalActs.apply(this, argsEval);
                    }); //this = setQuestion
                    $("#" + idEval + "_refresh").on("click", function () {
                        evalActs.apply(this, argsEval);
                    }); //this = setQuestion
                }

                //permito parar el intervalo pulsando en la nota
                if (objconfig.timer) {
                    $("#" + objconfig.id + "_fscore").off("click", resetInterval); //this = setQuestion
                    $("#" + objconfig.id + "_fscore").on("click", resetInterval); //this = setQuestion
                }

                var crossed = false, $info_ok, $info_ko;

                //--- convertir el umbral a la base correcta -------------------------
                threshold = parseInt(objconfig.threshold, 10);
                if (!($.isNumeric(threshold) && threshold > 0 && threshold <= 100)) {
                    threshold = 100;
                }
                threshold = objconfig.qbase * (threshold / 100);
                threshold = parseFloat(Math.round(threshold * 100) / 100); //redondeamos igual que el score
                //--------------------------------------------------------------------

                //---  vars públicas -------------------------------------
                fnc[objconfig.id] = {};
                fnc[objconfig.id].eval = score;                 //hace pública la nota final
                fnc[objconfig.id].threshold = threshold;        //hace público el umbral de nota
                fnc[objconfig.id].date = getDateTime();         //fecha y hora de evaluación en formato JSON.
                fnc[objconfig.id].refresh = resetInterval;      //función para actualizar/iniciar/parar el timer
                //------------------------------------------------------


                if (score >= threshold && numIds >= numActs) {
                    //superado el umbral de puntuación para considerar el test como superado (ok)
                    crossed = true;
                }
                $info_ok = $('[data-info-ok="' + objconfig.id + '"]');
                $info_ko = $('[data-info-ko="' + objconfig.id + '"]');
                if (crossed) {

                    //muestro también, si existe, el bloque con atributo data-info-ok=""

                    if ($info_ok.length) {
                        $info_ok.show();
                    }
                    if ($info_ko.length) {
                        $info_ko.hide();
                    }

                    try {
                        //opción de añadir una función al evento de pulsar en el botón
                        if (typeof objconfig.onok === 'function') {
                            objconfig.onok.call(fnc);
                            //pongo como referencia la función setTest de forma que podré acceder a las funciones 
                            //que defina dentro de ella si las pongo como propiedades de la funcion (ej. setTest.miF = miF)
                        }
                    } catch (err) {
                        if (debug) { alert("activities.onok: " + err); }
                    }
                } else {

                    //muestro también, si existe, el bloque con atributo data-info-ko=""

                    if ($info_ok.length) {
                        $info_ok.hide();
                    }
                    if ($info_ko.length) {
                        $info_ko.show();
                    }

                    try {
                        //opción de añadir una función que se ejecute al finalizar la preparación del test
                        if (typeof objconfig.onko === 'function') {
                            objconfig.onko.call(fnc);
                            //pongo como referencia la función setTest de forma que podré acceder a las funciones 
                            //que defina dentro de ella si las pongo como propiedades de la funcion (ej. setTest.miF = miF)
                        }
                    } catch (err) {
                        if (debug) { alert("activities.onko: " + err); }
                    }
                }
                //------- end eventos personalizados --------------------------------------------


            }
            //--- end function evalActs --------------------------------------------------------

            try {


                //busco error en el tipo pasado
                if (typeof objconfig !== "object") {
                    throw new CustomException({ name: "Data error " + nameEval, message: "bad eval config object" });
                }
                //una tabla de evaluación debe tener mínimo una actividad y debe ser un objeto o un string (el id)
                if (!arguments[1] || (typeof arguments[1] !== "object" && typeof arguments[1] !== "string")) {
                    throw new CustomException({ name: "Data error " + nameEval, message: "bad eval activity object" });
                }
                //debe existir el id en el que se colocará la tabla de evaluación
                if (errorId(idEval, nameEval)) { return; };



                //--- llamada a intervalos de la función -------------------
                objconfig.timer = objconfig.timer || 0;
                switch (objconfig.timer) {
                    case "1s":
                        objconfig.timer = 1000;
                        break;
                    case "5s":
                        objconfig.timer = 5000;
                        break;
                    case "10s":
                        objconfig.timer = 10000;
                        break;
                    case "30s":
                        objconfig.timer = 30000;
                        break;
                    case "1m":
                        objconfig.timer = 60000;
                        break;
                    case "5m":
                        objconfig.timer = 300000;
                        break;
                    case "10m":
                        objconfig.timer = 600000;
                        break;
                }
                if (!$.isNumeric(objconfig.timer) || objconfig.timer < 0) {
                    objconfig.timer = 0;
                } else {
                    objconfig.timer = parseInt(objconfig.timer, 10);
                }
                if (mytimer) {
                    window.clearInterval(mytimer);
                }
                if (objconfig.timer >= 1000) {
                    mytimer = window.setInterval(function () { evalActs.apply(this, argsEval); }, objconfig.timer);
                }
                //--- end llamada a intervalos de la función -------------------

                evalActs.apply(this, argsEval);

            } catch (err) {
                if (err instanceof CustomException) {
                    err.show();
                }
                else {
                    if (debug) { alert("Eval(): " + err); }
                }
            } //end try...catch

        }
        //--- end Eval -------------------------------



        /** Realiza un test con todas las preguntas entradas como argumentos.
         * @global
         * @param {Object} testOpt - Objeto con las opciones del test entradas por el usuario
         * @param {Object} arguments[] - Objetos con las opciones de cada actividad entradas por el usuario
         * @return {undefined} 
         * @globalobj lastcall - id del último test que ha llamado a la función.
         * @globalobj update - id del último test que ha actualizado una variable pública
         * @globalobj total = nota total del test
         * @globalobj score = nota obtenida en el test
         * @globalobj threshold = umbral de nota para considerar la prueba superada
         * @globalobj objscore = objeto JS con los resultados
         *             objscore.id              //identificador del test
         *             objscore.total           //nota total del test
         *             objscore.score           //nota obtenida en el test
         *             objscore.threshold        //umbral de nota para considerar la prueba superada
         *             objscore.date            //fecha y hora en formato JSON
         *             objscore.act             //matriz de objetos cada uno con los datos de una actividad
         *                      [n].objscore.type       //tipo de actividad
         *                      [n].id                  //identificador de la actividad
         *                      [n].name                //nombre de la actividad
         *                      [n].weighting           //peso de la actividad en el test
         *                      [n].lighting            //porcentaje que debe quitarse si se falla
         *                      [n].score               //puntos obtenidos sobre el total del test
         *                      [n].success             //porcentaje de acierto
         *                      [n].ptsplay             //puntos en juego en la actividad
         * @globalobj [test id] = objeto JS con los resultados siendo el nombre de la propiedad el id del test. Se trata de disponer de una copia del objscore sin que sea sobrescribida por otros test
        */
        function setTest(testOpt) {

            var args = arguments;       //guardo los argumentos para volverlos a pasar si se pide realizar de nuevo el test
            
            var settings_ex;            //closure del obj con las opciones del test

            var listP = [],             //guardo los divs originales en un array de objetos jQuery
                listSlidesIds = [],     //guardo los ids de los divs de cada actividad para pode mostrarlos y ocultarlos
                currentSlide = 0,
                i = 0,
                threshold = 50,         //el umbral convertido a la base correcta
                $myDiv,                 //guarda el bloque con el div del test
                $myBtn,
                csshexent = true;       //si debe utilizarse el estilo css con entidades hexadecimales



            /** función para colocar el foco en una actividad
             * @param {Number} index - Índice de la actividad en los argumentos pasados a la función
             * @return {undefined} 
            */
            function setFocusAct(index) {
                if (index > args.length-1) {
                    return;
                }
                if (args[index].type === "multi") {
                    if ($('#' + args[index].id + ' input[type=checkbox]').length) {
                        $('#' + args[index].id + ' input[type=checkbox]')[0].focus();
                    }
                }
                if (args[1].type === "single") {
                    if ($('#' + args[index].id + ' input[type=radio]').length) {
                        $('#' + args[index].id + ' input[type=radio]')[0].focus();
                    }
                }
                if (args[currentSlide + 1].type === "input") {
                    if ($('#' + args[index].id + ' input[type=text]').length) {
                        $('#' + args[index].id + ' input[type=text]')[0].focus();
                    }
                }
                if (args[index].type === "gapfill") {
                    if ($('#' + args[index].id + ' input[type=text], #' + args[index].id + ' select').length) {
                        $('#' + args[index].id + ' input[type=text], #' + args[index].id + ' select')[0].focus();
                    }
                }
            }


            /** función para realizar de nuevo el test
             * @return {undefined} 
            */
            function newTest() {
                var i = 0;
                for (i = 1; i < listP.length; i++) {
                    if (settings_ex.inside && $myDiv.length > 0) {
                        $("#" + args[i].id).remove(); //elimino los divs de las preguntas
                        $("div[data-replace=" + args[i].id + "]").replaceWith(listP[i]); //reemplazo los divs sustituidos por los originales
                    } else {
                        $("#" + args[i].id).replaceWith(listP[i]); //reemplazo los divs modificados por los originales
                    }
                }

                //también para el bloque del test
                if ($myDiv.length > 0) {
                    $("#" + args[0].id).replaceWith(listP[0]);
                }

                //quito la tabla de resultados
                $('[data-test-table="' + settings_ex.id + '"]').remove();


                //llamo de nuevo a la función
                setTest.apply(setQuestion, args);

                //salto a mostrar el control del examen
                if ($("#" + settings_ex.id).length) {
                    $("#" + settings_ex.id)[0].scrollIntoView();
                }

                //colocamos el foco
                setFocusAct(1);

                //oculto el botón de entregar
                $myBtn.hide();

            }


            /** crea el código html con los controles del test
             * @param {Object} testOpt - Objeto con las opciones del test entradas por el usuario
             * @return {undefined}
            */
            function makeHtmlTest(objData) {
                var html = "", aria="", j=0;
                try {
                  
                    
                    var $bloqueT = $('#' + objData.id);
                    
                        var sfrm = "";
                        if (objData.form) {
                            sfrm = ' form="' + objData.id + '_frm"';
                        }
                        //----------------------------------------------------
                        //envolver el bloque con las etiquetas form y fieldset
                        if (objData.fieldset) {
                            $bloqueT.wrapInner('<fieldset name="' + objData.id + '"' + sfrm + ' class="' + styles.actfield + '">\n</fieldset>\n');
                            if (objData.legend) {
                                //pongo el legend en el primer fieldset. Debe ser el último prepend ya que el tag legend debe ir inmediatamente después del fieldset
                                $('fieldset[name="' + objData.id + '"]', $bloqueT).prepend('\n<legend>' + objData.legend + '</legend>\n');
                            }
                        }
                        if (objData.form) {
                            $bloqueT.wrapInner('\n<form id="' + objData.id + '_frm" name="' + objData.id + '" class="' + (objData.formclass ? objData.formclass : styles.form) + '">\n</form>\n');
                        }

                        //----------------------------------------------------
                        //wai-aria
                        aria = ' aria-controls="';
                        for (j = 0; j < listSlidesIds.length; j++) {
                            aria += listSlidesIds[j];
                            if (j < listSlidesIds.length - 1) { aria += ' '; }
                        }
                        aria += '"';
                        if ((objData.flow === "slide" || settings_ex.type === "checker") && args.length > 2) {
                            //coloco los controles para mover las diapositivas si se pide pero solo si hay más de una actividad
                            html += '<div id="' + objData.id + '_sldctrl" class="' + styles.sldctrl + '">\n';
                            html += '<button type="button" id="' + objData.id + '_sldctrl_prev"' + (objData["wai-aria"] ? aria : '') + ' title="' + lang.titleprev + '"' + (settings_ex["wai-aria"] ? ' aria-label="' + lang.titleprev + '"' : '') + ' class="' + styles.sldprev + (csshexent ? (' ' + styles.hexent) : '') + '">';
                            html += lang.previous;
                            html += "</button>\n";
                            html += '<span id="' + objData.id + '_sldctrl_info" class="' + styles.sldinf + '">x/x</span>\n';
                            html += '<button type="button" id="' + objData.id + '_sldctrl_next"' + (objData["wai-aria"] ? aria : '') + ' title="' + lang.titlenext + '"' + (settings_ex["wai-aria"] ? ' aria-label="' + lang.titlenext + '"' : '') + ' class="' + styles.sldnext + (csshexent ? (' ' + styles.hexent) : '') + '">';
                            html += lang.next;
                            html += "</button>\n";
                            html += '</div>\n';
                        }
                        var hidebtn = "";
                        //coloco los controles para mover las diapositivas si se pide pero solo si hay más de una actividad
                        if (objData.flow === "train" && args.length > 2) {
                            //slider
                            html += '<div id="' + objData.id + '_trnslider" class="' + styles.trnslider + '">\n';
                            html += '<div id="' + objData.id + '_trnsliderprg"' + (settings_ex["wai-aria"] ? ' role="progressbar"' : '') + ' class="' + styles.trnsliderprg + '">\n';
                            html += "</div>\n";
                            html += '<div id="' + objData.id + '_trnslidertxt" class="' + styles.trnslidertxt + '">\n';
                            html += "</div>\n";
                            html += '</div>\n';
                            //botón para avanzar
                            html += '<div id="' + objData.id + '_trnctrl" class="' + styles.trnctrl + '">\n';
                            html += '<button type="button" id="' + objData.id + '_trnctrl_next"' + (objData["wai-aria"] ? aria : '') + ' title="' + lang.titlenext + '"' + (settings_ex["wai-aria"]?' aria-label="' + lang.titlenext + '"':'') + ' class="' + styles.trnnext + (csshexent ? (' ' + styles.hexent) : '') + '">';
                            html += lang.next;
                            html += "</button>\n";
                            html += '</div>\n';
                            hidebtn = ' style="display: none;"';
                        }
                    
                        //CON EL TAG BUTTON DENTRO DE UN FORM SIN TYPE=BUTTON JQUERY FALLA
                        html += '<div id="' + objData.id + '_btnbox" ' + hidebtn + ' class="' + styles.testboxsub + '">\n';
                        html += '<button type="button" id="' + objData.id + '_btn" title="' + lang.titlecheck + '"' + (settings_ex["wai-aria"] ? ' aria-label="' + lang.titlecheck + '"' : '') + ' class="' + styles.testbtnsub + (csshexent ? (' ' + styles.hexent) : '') + '">';
                        if (objData.button) {
                            html += objData.button;
                        } else {
                            html += lang.check;
                        }
                        html += "</button>\n";
                        html += '</div>\n';
                        html += '<div id="' + objData.id + '_out" class="' + styles.divout + '">\n</div>\n'; //bloque de salida para los resultados
                        html += '<div id="' + objData.id + '_results" style="display: none;">\n</div>\n'; //bloque para guardar los resultados de cada pregunta

                    

                        //finalmente colocamos el html en el bloque con attr especial o al final del fieldset si existe o del div
                        var $field = $('#' + objData.id + ' fieldset[name="' + objData.id + '"]');
                        var $frm = $('#' + objData.id + ' form[name="' + objData.id + '"]');
                        if ($field.length) {
                            $field.append(html);
                        } else if ($frm.length) {
                            $frm.append(html);
                        } else {
                            $bloqueT.append(html);
                        }

                        //Explicación para el final de la actividad
                        var opttxt = $('[data-info-bottom="' + objData.id + '"]').html();
                        if (opttxt) {
                            var txtO = '<div id="' + objData.id + '_info_bottom" class="' + styles.inftxtptt + '">' + opttxt + '</div>\n';
                            if ($field.length) {
                                $field.append(txtO);
                            } else if ($frm.length) {
                                $frm.append(txtO);
                            } else {
                                $bloqueT.append(txtO);
                            }
                        }

                        //descripción aria para el botón de entrega
                        //no puedo comprobar la existencia de _nfo_aria hasta ahora que se ha añadido al dom
                        if (settings_ex["wai-aria"]) {
                            if ($('#' + settings_ex.id + '_info_aria').length > 0) {
                                $('#' + settings_ex.id + '_btn').attr("aria-describedby", settings_ex.id + '_info_aria');
                            }
                        }

                } catch (err) {
                    if (debug) { alert("makeHtmlTest(): " + err); }
                }
                return html;
            }


            /** funcion para los eventos de los botones para mover las diapositivas
             * @param {String} move - [prev||next] Cadena que indica si el movimiento es hacia delante o hacia atrás
             * @param {String} arguments[1] - slide al que hay que moverse
             * @return {undefined} 
            */
            function runSlide(move) {
                try {
                    var toX = arguments[1] || 0, //moverse a una actividad concreta
                        scroll = true;           //cuando se carga no hay que hacer scroll
                    if (toX == -1) { //el valor -1 indica que estamos creando la acividad y queremos mostrar la primera pantalla
                        scroll = false;
                        toX = 1;
                    }
                    //--- no existe listSlidesIds --------------------------------
                    //cuando solo hay una actividad no puede pasarse de una a otra
                    if (listSlidesIds.length === 0) {
                        return;
                    }
                    //-----------------------------------------------------------
                    if (toX) {
                        currentSlide = toX - 1;
                    }
                    switch (move) {
                        case "prev":
                            currentSlide--;
                            break;
                        case "next":
                            currentSlide++;
                            break;
                    }
                    for (var i = 0; i < listSlidesIds.length; i++) {
                        if (i == currentSlide) {
                            $("#" + listSlidesIds[i]).show();
                            if (settings_ex["wai-aria"]) {
                                $("#" + listSlidesIds[i]).attr('aria-hidden', false);
                            }
                        } else {
                            $("#" + listSlidesIds[i]).hide();
                            if (settings_ex["wai-aria"]) {
                                $("#" + listSlidesIds[i]).attr('aria-hidden', true);
                            }
                        }

                    }
                    if (currentSlide === 0) {
                        $("#" + settings_ex.id + "_sldctrl_prev").css("visibility", "hidden");
                        if (scroll) {
                            $("#" + settings_ex.id + "_sldctrl_next").focus(); //Accesibilidad: Al ocultarse el botón paso el foco al botón siguiente
                        }
                        if (settings_ex["wai-aria"]) {
                            $("#" + settings_ex.id + "_sldctrl_prev").attr('aria-hidden', true);
                        }
                    } else {
                        $("#" + settings_ex.id + "_sldctrl_prev").css("visibility", "visible");
                        if (settings_ex["wai-aria"]) {
                            $("#" + settings_ex.id + "_sldctrl_prev").attr('aria-hidden', false);
                        }
                    }
                    if (currentSlide === listSlidesIds.length - 1) {
                        $("#" + settings_ex.id + "_sldctrl_next").css("visibility", "hidden");
                        $("#" + settings_ex.id + "_sldctrl_prev").focus(); //Accesibilidad: Al ocultarse el botón paso el foco al botón anterior
                        if (settings_ex["wai-aria"]) {
                            $("#" + settings_ex.id + "_sldctrl_next").attr('aria-hidden', true);
                        }
                    } else {
                        $("#" + settings_ex.id + "_sldctrl_next").css("visibility", "visible");
                        if(settings_ex["wai-aria"]){
                            $("#" + settings_ex.id + "_sldctrl_next").attr('aria-hidden', false);
                        }
                    }

                    var $spanSlide = $("#" + settings_ex.id + "_sldctrl_info");
                    //coloco la información de la diapositiva actual
                    $spanSlide.html(parseInt(currentSlide + 1, 10) + "/" + parseInt(listSlidesIds.length, 10));

                    //aria
                    if (settings_ex["wai-aria"]) {
                        var $slider = $("#" + settings_ex.id + "_sldctrl");
                        $slider.attr("role", "slider");
                        $slider.attr("aria-valuenow", parseInt(currentSlide + 1, 10));
                        $slider.attr("aria-valuemin", 1);
                        $slider.attr("aria-valuemax", parseInt(listSlidesIds.length, 10));
                        $slider.attr("aria-describedby", settings_ex.id + "_sldctrl_info");
                    }


                    //me muevo a la cabecera del div
                    if (scroll) {
                        $("#" + listSlidesIds[currentSlide])[0].scrollIntoView();
                    }
                } catch (err) {
                    if (debug) { alert("runSlide(): " + err); }
                } //end try...catch
            }


            /** funcion para los eventos de los botones para mover las diapositivas
             * @param {String} move - [prev||next] Cadena que indica si el movimiento es hacia delante o hacia atrás
             * @param {String} arguments[1] - slide al que hay que moverse
             * @return {undefined} 
            */
            function runTrain(move) {
                try {
                    var toX = arguments[1] || 0, //moverse a una actividad concreta
                        scroll = true;           //cuando se carga no hay que hacer scroll
                    if (toX == -1) { //el valor -1 indica que estamos creando la acividad y queremos mostrar la primera pantalla
                        scroll = false;
                        toX = 1;
                    }
                    //--- no existe listSlidesIds --------------------------------
                    //cuando solo hay una actividad no puede pasarse de una a otra
                    if (listSlidesIds.length === 0) {
                        return;
                    }
                    //-----------------------------------------------------------
                    if (toX) {
                        currentSlide = toX - 1;
                    }
                    switch (move) {
                        case "prev":
                            currentSlide--;
                            break;
                        case "next":
                            currentSlide++;
                            break;
                    }
                    for (var i = 0; i < listSlidesIds.length; i++) {
                        if (i == currentSlide) {
                            $("#" + listSlidesIds[i]).show();
                            if (settings_ex["wai-aria"]) {
                                $("#" + listSlidesIds[i]).attr('aria-hidden', false);
                            }
                        } else {
                            $("#" + listSlidesIds[i]).hide();
                            if (settings_ex["wai-aria"]) {
                                $("#" + listSlidesIds[i]).attr('aria-hidden', true);
                            }
                        }

                    }
                    //actualizamos la barra de progreso
                    if ($('#' + settings_ex.id + '_trnslider').length) {
                        refreshSlider(settings_ex.id + '_trnsliderprg', settings_ex.id + '_trnslidertxt', currentSlide + 1, listSlidesIds.length, settings_ex.sliderinfo, settings_ex.slidercolor);
                        }

                    if (currentSlide === listSlidesIds.length - 1) {
                        //ultimo paso del train
                        if (settings_ex.type === "test") {
                            $("#" + settings_ex.id + "_trnctrl_next").text(settings_ex.button ? settings_ex.button : lang.check);
                            $("#" + settings_ex.id + "_trnctrl_next").prop("title", lang.titlecheck);
                            $("#" + settings_ex.id + "_trnctrl_next").removeClass(styles.trnnext).addClass(styles.trnlast);
                        }
                        if (settings_ex.type === "checker") {
                            $("#" + settings_ex.id + "_trnctrl_next").hide();
                        }
                    }
                    if (settings_ex.type === "checker") {
                        //en el modo checker se desactiva el botón después de pulsar. Lo activará de nuevo el evento onok de cada actividad
                        $("#" + settings_ex.id + "_trnctrl_next").prop("disabled", true);
                    }

                    
                    //--- colocar el foco ---------------------------------------------
                    //en el modo checker el foco se pierde, y en el modo train no interesa dejar 
                    //el foco en el botón ya que si se avanza sin contestar no puede volverse atrás
                    if (currentSlide + 1 <= args.length - 1) {
                        setFocusAct(currentSlide + 1);
                    }
                    //--- fin de colocar el foco --------------------------------------------------


                    if (currentSlide === listSlidesIds.length) {
                        if (settings_ex.type === "test") {
                            //entregamos ya que estamos viendo el último paso
                            $('#' + settings_ex.id + '_trnctrl').hide();
                            $('#' + settings_ex.id + '_trnslider').hide();
                            if (settings_ex["wai-aria"]) {
                                $('#' + settings_ex.id + '_trnctrl').attr('aria-hidden', true);
                                $('#' + settings_ex.id + '_trnslider').attr('aria-hidden', true);
                            }
                            $myBtn.trigger("click");
                        }
                        currentSlide = 0;
                    }

                    //me muevo a la cabecera del div
                    if (scroll) {
                        $("#" + listSlidesIds[currentSlide])[0].scrollIntoView();
                    }
                } catch (err) {
                    if (debug) { alert("runTrain(): " + err); }
                } //end try...catch
            }


            /** funcion que actualiza una barra de progreso que muestra el paso actual respecto al total
             * @param {String} id - id del div del progreso del slider a actualizar
             * @param {String} idinfo - id del div del texto del slider a actualizar
             * @param {Number} step - paso actual
             * @param {Number} total - número de pasos
             * @param {String} info - texto del slider. [""||"def"||"def%"||"none"] 'none' no pone ningún texto, 'def' pone step/total, 'def%' pone el %, en otro caso se pone el valor entrado
             * @param {String} color - color de la barra de progreso [""||"def"|"rate"] 'def' no hace nada, 'rate' pone un color en función del progreso, en otro caso pone el color entrado.
             * @return {undefined} 
            */
            function refreshSlider(id, idinfo, step, total, info, color) {

                var def_slidercolor = "#33CC33";
                
                    var iWidth = 0;
                    var $slider = $('#' + id);
                    var $info = $('#' + idinfo);

                    if (isNaN(step) || isNaN(total) || (total === 0) || (total < step)) {
                        $($slider).css("width", "0%");
                        $("#txtnota").text("");
                        return;
                    }

                    iWidth = (step / total) * 100;
                    $slider.css("width", Math.round(iWidth).toString() + "%");
                    switch (info) {
                        case 'none':
                            $info.html("");
                            break;
                        case '':
                        case 'def':
                            $info.html(step.toString() + '/' + total.toString());
                            break;
                        case 'def%':
                            $info.html(Math.round(iWidth).toString() + "%");
                            break;
                        default:
                            $info.html(info);
                    }
                    //color de la barra de progreso
                    if (color === 'rate') {
                        if (iWidth < 20) {
                            $slider.css("background", "red");
                        } else if (iWidth < 50) {
                            $slider.css("background", "yellow");
                        } else if (iWidth < 70) {
                            $slider.css("background", "#00CC00");
                        } else if (iWidth < 90) {
                            $slider.css("background", "#009933");
                        } else {
                            $slider.css("background", "#3366CC");
                        }
                    } else if (color === 'def' || color === '') {
                        //pone el color por defecto, color que puede cambiarse el objeto test
                        $slider.css("background", def_slidercolor);
                    } else if (color === 'none') {
                        //pone el color por defecto, color que puede cambiarse el objeto test
                        $slider.css("background", "");
                    } else if (color === 'gradient') {
                        //pone el color por defecto, color que puede cambiarse el objeto test
                        $slider.css("background", "linear-gradient(to right, rgba(0,153,0,0), rgba(0,153,0,1))");
                    } else {
                        $slider.css("background", color);
                    }
                    
                    //aria
                    if (settings_ex["wai-aria"]) {
                        $slider.attr("aria-valuenow", step);
                        $slider.attr("aria-valuemin", 1);
                        $slider.attr("aria-valuemax", total);
                        //$slider.attr("aria-valuetext", step.toString() + '/' + total.toString()); //atributo aria-valuetext da error en jQuery para IE7-
                        $slider.attr("aria-describedby", idinfo);
                    }
                    

            } //end 


            /** funcion para el evento de pulsar el botón de entregar
             * @return {undefined} 
            */
            function checkSolution() {
                try {

                    $(this).hide(); //oculto el botón de entregar
                    

                } catch (err) {
                    if (err instanceof CustomException) {
                        err.show();
                    }
                    else {
                        if (debug) { alert("setTest.checkSolution(): " + err); }
                    }
                }
            }


            /** función que calcula, guarda y muestra los resultados de un test
             * @return {undefined} 
            */
            function setResults() {
                var score = "-";        //guarda la nota final para hacerla pública.

                //Los resultados de cada pregunta se han guardado en atributos de divs dentro del div siguiente
                var $DivRs = $(), j = 0;

                //--- objeto score -------------------------------------
                setTest.objscore = {};     //hace público el objeto JS con los resultados.
                setTest.objscore.act = []; //matriz que guarda los objetos de cada actividad con los resultados
                setTest.update = settings_ex.id; //hago público el id del último test que ha actualizado una variable pública
                //------------------------------------------------------

                if (settings_ex.random) {
                    //debo reordenar los divs
                    for (j = 0; j < listSlidesIds.length; j++) {
                        var $x = $('#' + settings_ex.id + '_results div[data-id="' + listSlidesIds[j] + '"]').clone();
                        $DivRs = $DivRs.add($x);
                    }
                } else {
                    $DivRs = $("#" + settings_ex.id + "_results div"); //obtengo todos los divs, cada uno corresponde a una pregunta
                }
                var html = ""; //variable para crear la tabla de los resultados
                var total = 0;
                var nota = 0;
                $DivRs.each(function (index) {
                    //calculo el total en tanto por uno
                    var probW = $(this).attr("data-weighting");     //ponderación respecto a todas las preguntas
                    total +=  (+probW/100);
                });
                if (!$.isNumeric(total)) {
                    //si falla pongo la suma de preguntas
                    total = +$DivRs.length;
                }
                html += '<table data-test-table="' + settings_ex.id + '" class="' + styles.tblres + '">\n';
                if (settings_ex.caption) {
                    html += '\t<caption>' + settings_ex.caption + '\n';
                    if (settings_ex.details) {
                        html += '\t\t<details>\n';
                        if (settings_ex.summary) {
                            html += '\t\t\t<summary>' + settings_ex.summary + '</summary>\n';
                        }
                        html += settings_ex.details + '\n';
                        html += '\t\t</details>\n';
                    }
                    html += '\t</caption>\n';
                }
                html += '\t<thead>\n';
                html += '\t\t<tr class="' + styles.tblresth + '"><th>' + lang.question + '</th><th>' + lang.success + '</th><th>' + lang.points + '</th></tr>\n';
                html += '\t</thead>\n';
                html += '\t<tbody>\n';
                $DivRs.each(function (index) {
                    //hago una entrada para cada problema
                    var probtype = $(this).attr("data-type");
                    var probid = $(this).attr("data-id");
                    var probw = $(this).attr("data-weight");        //peso o porcentaje de acierto
                    var probW = $(this).attr("data-weighting");     //ponderación respecto a todas las preguntas
                    var probL = $(this).attr("data-lighting");      //resto de puntos por contestar y fallar en las preguntas tipo single
                    //--- objeto score -------------------------------------
                    var actX = {}; //objeto score de cada actividad
                    //-------------------------------------------------------
                    var notaP = 0;                                  //nota de la pregunta sobre 10
                    var probwN = Math.round(settings_ex.qbase * probW/total)/100;        //puntos en juego, utilizado para el label aria para poner los puntos del problema en juego
                    var probwP = "0%";
                    if (probw === "none") { //no se ha contestado
                        probw = '<span title="' + lang.notanswered + '">(0%)</span>';
                        //nota += 0;
                        //--- objeto score -------------------------------------
                        actX.success = "(0%)";
                        //-----------------------------------------------------
                    } else {
                        if ((probw == 0) && (Math.abs(probL) > 0)) {
                            probw = probw - Math.abs(probL);
                        }
                        notaP = (((probw / 100) * (+probW / 100)) / (total)) * 10;
                        nota += notaP;
                        notaP = parseFloat(Math.round(notaP * 100) / 100); //ajusto a dos decimales
                        if (settings_ex.qbase != 10) {
                            //transformo la nota en base 10 a la base escogida
                            notaP = (settings_ex.qbase * notaP) / 10;
                            notaP = parseFloat(Math.round(notaP * 100) / 100); //ajusto a dos decimales
                        }
                        if (probtype === "single") {
                            //en el tipo single pongo una clase css en la entrada seleccionada según la nota obtenida
                            var idoptsel = $(this).attr("data-selected"); //id de la opción seleccionada. No existirá en las preguntas tipo multi
                            if (idoptsel) {
                                //coloco clases en las opciones según la nota
                                var clsPts = "";
                                if (probw < 50) {
                                    clsPts = styles.testptsi;
                                } else if (probw < 60) {
                                    clsPts = styles.testptss;
                                } else if (probw < 70) {
                                    clsPts = styles.testptsb;
                                } else if (probw < 90) {
                                    clsPts = styles.testptsn;
                                } else {
                                    clsPts = styles.testptse;
                                }
                                $("[for=" + idoptsel + "]").addClass(clsPts + (csshexent ? (' ' + styles.hexent) : '')); //el id de la opción se ha guardado en el div en el attr data-selected
                            }
                        }
                        if (probtype === "multi") {
                            //en el tipo multi pongo un estilo en las entradas seleccionadas según si debían marcarse o no
                            $("#" + probid + " input:checked").each(function () {
                                if ($(this).attr("data-ok") === "true") {
                                    $(this).parent().addClass(styles.testptse + (csshexent ? (' ' + styles.hexent) : ''));
                                } else {
                                    $(this).parent().addClass(styles.testptsi + (csshexent ? (' ' + styles.hexent) : ''));
                                }
                            });
                        }
                        probw += "%"; //pongo el simbolo de porcentaje para mostrar en la tabla de resultados
                        probwP = probw;
                        //--- objeto score -------------------------------------
                        actX.success = probw;
                        //-----------------------------------------------------
                    }
                    var probname = $("#" + probid + " legend").text();
                    if (!probname) {
                        probname = lang.question + " " + (index + 1);
                    }
                    var cssTr = ' class="' + styles.tblrestrpair + '"';
                    if (index % 2) {
                        cssTr = ' class="' + styles.tblrestrodd + '"';
                    }
                    var ponderacion = "";
                    if (+probW < 100) {
                        ponderacion = ' <span title="' + lang.weighting + '">(x' + (+probW / 100) + ')</span>';
                    }
                    var sAct = "";
                    if (settings_ex.flow) {
                        sAct = ' data-goto="' + parseInt(index + 1, 10) + '"';
                    }
                    var alabel = lang.actscore.replace("$score$", notaP).replace("$ptot$", probwN).replace("$act$", (index + 1)).replace("$%$", probwP).replace("$total$", settings_ex.qbase) ;
                    html += '\t\t<tr' + cssTr + '><td><a href="#' + probid + '"' + sAct + '' + (settings_ex["wai-aria"] ? ' aria-label="' + alabel + '"' : '') + ' title="' + alabel + '"><span class="' + styles.tblressl + '">#' + (index + 1) + '</span> <span class="' + styles.tblresll + '">' + probname + '</span></a>' + ponderacion + '</td>';
                    html += '<td>' + probw + '</td><td>' + notaP + '<sub>/' + settings_ex.qbase + '</sub></td></tr>\n';
                    //--- objeto score -------------------------------------
                    actX.type = probtype;
                    actX.id = probid;
                    actX.name=probname;
                    actX.weighting = +probW;
                    actX.lighting = +probL;
                    actX.score = notaP;
                    actX.ptsplay = probwN; //punto en juego
                    setTest.objscore.act.push(actX); //añado el obj al array
                    //-------------------------------------------------------
                }); //end each
                html += '\t</tbody>\n';
                html += '\t<tfoot>\n';
                score = parseFloat(Math.round(nota * 100) / 100);
                if (settings_ex.qbase != 10) {
                    //transformo la nota en base 10 a la base escogida
                    score = (settings_ex.qbase * score) / 10;
                    score = parseFloat(Math.round(score * 100) / 100); //ajusto a dos decimales
                }
                if (score < 0) { score = 0; }
                setTest.score = score;     //hace pública la nota final.
                html += '\t\t<tr class="' + styles.tblrestrtot + '"><td class="' + styles.tblrestdnew + '" id="' + settings_ex.id + '_newtest"><button type="button" title="' + lang.titlenewtest + '"' + (settings_ex["wai-aria"] ? ' aria-label="' + lang.titlenewtest + '"' : '') + ' class="' + styles.btntblresults + (csshexent ? (' ' + styles.hexent) : '') + '">' + lang.newtest + '</button></td><td class="' + styles.tblrestdtota + '">' + lang.total + ": " + '</td><td id="' + settings_ex.id + '_fscore"' + (settings_ex["wai-aria"] ? ' aria-label="' + lang.fscore.replace("$score$", score).replace("$total$", settings_ex.qbase) + '"' : '') + ' class="' + styles.tblrestdtotb + '" tabindex="0">' + score + '<sub>/' + settings_ex.qbase + '</sub></td></tr>\n';
                html += "\t</tfoot>\n";
                html += "</table>\n";
                
                //--- objeto score -------------------------------------
                setTest.objscore.total = settings_ex.qbase;
                setTest.objscore.score = score;
                setTest.objscore.threshold = threshold;
                setTest.objscore.id = settings_ex.id;
                setTest.objscore.date = getDateTime(); //fecha y hora en formato JSON
                //------------------------------------------------------
                

                //añado el html en el bloque con atributo data-test-results igual al id del test, o delante de la tabla de resultados previos o si no existe al final del div del test
                if ($('[data-move-results="' + settings_ex.id + '"]').length) {
                    $('[data-move-results="' + settings_ex.id + '"]').append(html);
                } else {
                    if ($('[data-store-wrap="' + settings_ex.id + '"]').length) {
                        $('[data-store-wrap="' + settings_ex.id + '"]').before(html);
                    } else {
                        if ($('#' + settings_ex.id + ' fieldset[name="' + settings_ex.id + '"]').length) {
                            $('#' + settings_ex.id + ' fieldset[name="' + settings_ex.id + '"]').append(html);
                        } else if ($('#' + settings_ex.id + ' form[name="' + settings_ex.id + '"]').length) {
                            $('#' + settings_ex.id + ' form[name="' + settings_ex.id + '"]').append(html);
                        } else {
                            $("#" + settings_ex.id).append(html);
                        }
                    }
                }

                //Accesibilidad. Pongo el foco en la nota obtenida
                $("#" + settings_ex.id + "_fscore").focus();


                //añado el evento al botón newTest
                $("#" + settings_ex.id + "_newtest").on("click", newTest);

                //añado los eventos de pulsar en un enlace de problema
                if (settings_ex.flow) {
                    $("[data-test-table=" + settings_ex.id + "] [data-goto]").on("click", function () {
                        if (settings_ex.flow==="slide") {
                            runSlide("", $(this).attr("data-goto"));
                        }
                        if (settings_ex.flow === "train") {
                            runTrain("", $(this).attr("data-goto"));
                        }
                    });
                }

                //oculto el botón de entregar
                $myBtn.hide();

               
               
                //muevo la pantalla a la tabla de resultados
                if ($('[data-test-table="' + settings_ex.id + '"]').length) {
                    $('[data-test-table="' + settings_ex.id + '"]')[0].scrollIntoView();
                }

                //document.getElementById(settings_ex.id).scrollIntoView(false);
                //if (document.querySelector) {
                //    document.querySelector("#" + settings_ex.id + ' .' + styles.tblres).scrollIntoView(true);
                //}

                //guardo el resultado en el storage en la entrada igual al id
                if (settings_ex.storage) {
                    //se guarda también el tipo de actividad en la propiedad "type" por si fuera necesario comprobarla
                    storeResults(settings_ex.storage, settings_ex.storagekey, settings_ex.id, { "type": "jsgeork.test", "id": settings_ex.id, "name": settings_ex.name, "score": score.toString(), "qbase": settings_ex.qbase.toString(), "date": getDateTime() });
                }



                //------- eventos personalizados --------------------------------------------
                try {
                    //opción de añadir una función al evento de pulsar en el botón, la colocamos aquí para que se dispare antes de los eventos onok y onko 
                    if (typeof settings_ex.oncheck === 'function') {
                        settings_ex.oncheck.call(setTest);
                        //pongo como referencia la función setTest de forma que podré acceder a las funciones 
                        //que defina dentro de ella si las pongo como propiedades de la funcion (ej. setTest.miF = miF)
                    }
                } catch (err) {
                    if (debug) { alert("test.oncheck: " + err); }
                }


                var crossed = false, $info;
                //alert(score + ' / ' + threshold);
                if (score >= threshold) {
                    //superado el umbral de puntuación para considerar el test como superado (ok)
                    crossed = true;
                }
                if (crossed) {

                    //muestro también, si existe, el bloque con atributo data-info-ok=""
                    //en esta actividad coloca el interior del bloque id_out
                    $info = $('[data-info-ok="' + settings_ex.id + '"]');
                    if ($info.length) {
                        $('#' + settings_ex.id + '_out').append('\t<div class="' + styles.testsolok + '">\n' + $info.html() + '</div>\n');
                    }

                    try {
                        //opción de añadir una función al evento de pulsar en el botón
                        if (typeof settings_ex.onok === 'function') {
                            settings_ex.onok.call(setTest);
                            //pongo como referencia la función setTest de forma que podré acceder a las funciones 
                            //que defina dentro de ella si las pongo como propiedades de la funcion (ej. setTest.miF = miF)
                        }
                    } catch (err) {
                        if (debug) { alert("test.onok: " + err); }
                    }
                } else {

                    //muestro también, si existe, el bloque con atributo data-info-ko=""
                    //en esta actividad coloca el interior del bloque id_out
                    $info = $('[data-info-ko="' + settings_ex.id + '"]');
                    if ($info.length) {
                        $('#' + settings_ex.id + '_out').append('\t<div class="' + styles.testsolko + '">\n' + $info.html() + '</div>\n');
                    }

                    try {
                        //opción de añadir una función que se ejecute al finalizar la preparación del test
                        if (typeof settings_ex.onko === 'function') {
                            settings_ex.onko.call(setTest);
                            //pongo como referencia la función setTest de forma que podré acceder a las funciones 
                            //que defina dentro de ella si las pongo como propiedades de la funcion (ej. setTest.miF = miF)
                        }
                    } catch (err) {
                        if (debug) { alert("test.onko: " + err); }
                    }
                }
                //------- end eventos personalizados --------------------------------------------


                //--- objeto score -------------------------------------
                try {
                    //después de entregar cada test guardamos en la función setTest el objscore como una variable pública de nombre igual al id del test
                    setTest[settings_ex.id] = setTest.objscore;
                } catch(err) {

                }
                //------------------------------------------------------
            }
            //--- end setResults -------------------------------

            

            //oooooooooooooooooooooooooooooooooooooooooooooooooo
            //ooo setTest main code oooooooooooooooooooooooooooo
            //oooooooooooooooooooooooooooooooooooooooooooooooooo

            try {

                //busco error en el tipo pasado
                if (typeof testOpt !== "object") {
                    throw new CustomException({ name: "Data error", message: "bad test config object" });
                }
                //un test debe tener mínimo una actividad
                if (!arguments[1] || typeof arguments[1] !== "object") {
                    throw new CustomException({ name: "Data error " + (testOpt.name || testOpt.legend), message: "bad test activity object" });
                }
                //no es necesario un bloque con el id del test
                if (errorId(testOpt.id, testOpt.name || testOpt.legend)) { return; };



                if (window.jQuery) {

                    //cargo el idioma si se ha especificado
                    if (testOpt.lang) {
                        setLang(userOpt.lang);
                    }

                    options_ex = testOpt;
                    settings_ex = $.extend({}, defaults_ex, options_ex); //Decorator pattern

                    

                    $myDiv = $("#" + settings_ex.id);

                    if (settings_ex.type === "pager") {
                        //cuando el test es un simple paginador, el flow debe ser slide
                        settings_ex.flow = "slide";
                    }
                    if (settings_ex.type === "checker") {
                        //cuando el test es un simple paginador, el flow debe ser slide
                        settings_ex.flow = "train";
                    }

                    //aseguro que la base de calificación es una de las aceptadas
                    settings_ex.qbase = parseInt(settings_ex.qbase, 10);
                    switch (settings_ex.qbase) {
                        case 100:
                        case 20:
                        case 10:
                        case 9:
                        case 8:
                        case 7:
                        case 6:
                        case 5:
                            break;
                        default:
                            settings_ex.qbase = 10;
                    }

                    //tipo de iconos
                    if (settings_ex.icons === "csshexent") {
                        csshexent = true;
                    } else {
                        csshexent = false;
                    }

                    //--- public vars ------------------------------------
                    //hago público el id del último test que ha llamado a la función
                    setTest.lastcall = settings_ex.id;
                    //hacemos pública la nota final, el total, el umbral de prueba superada (threshold), y la tabla de resultados.
                    setTest.score = "-";
                    setTest.total = settings_ex.qbase;
                    threshold = parseInt(settings_ex.threshold, 10);
                    if (!($.isNumeric(threshold) && threshold > 0 && threshold <= 100)) {
                        threshold = 50;
                    }
                    threshold = settings_ex.qbase * (threshold / 100);
                    threshold = parseFloat(Math.round(threshold * 100) / 100); //redondeamos igual que el score
                    setTest.threshold = threshold;
                    setTest.objscore = null; //de momento creamos la variable pública pero le damos un valor nulo hasta que no se entregue el test
                    setTest.update = settings_ex.id; //hago público el id del último test que ha actualizado una variable pública
                    //-------------------------------------------


                    //guardo los divs para poder reconstruir el DOM si se pide un nuevo test
                    //primero el bloque del test
                    if ($myDiv.length > 0) {
                        listP[0] = $($('<div></div>').html($("#" + arguments[i].id).clone())).html(); //outerHTML
                    }
                    //ahora los problemas
                    for (i = 1; i < arguments.length; i++) {
                        //$listP[i] = $("#" + arguments[i].id).html();
                        listP[i] = $($('<div></div>').html($("#" + arguments[i].id).clone())).html(); //outerHTML
                    }
                    
                    //--- slide y train -----------------------------------
                    //guardo los ids de cada pregunta para el slide
                    if ((settings_ex.flow === "slide" || settings_ex.flow === "train") && args.length > 2) {
                        for (i = 1; i < arguments.length; i++) {
                            listSlidesIds.push(arguments[i].id);
                        }
                    }
                    //---------------------------------------------


                    //creo el html del examen antes que las preguntas para poder colocar los eventos
                    makeHtmlTest(settings_ex);
                    

                    


                    //-------- colocar las preguntas dentro del div del examen -------------------
                    //debo hacerlo antes de generar el código de cada pregunta ya que los eventos no se copiarán
                    if (settings_ex.inside && $myDiv.length>0) {
                        var listQ = []; //guardo las preguntas en un array de objetos jQuery
                        for (i = 1; i < arguments.length; i++) {
                            listQ[i - 1] = $("#" + arguments[i].id).replaceWith('<div data-replace="' + arguments[i].id + '"></div>');
                        }
                        var order = [];
                        for (i = 0; i < listQ.length; i++) {
                            //pongo el orden de las entradas
                            order.push(i);
                        }
                        if (settings_ex.random) {
                            //desordena aleatoriamente
                            order.sort(function () { return 0.5 - Math.random(); });
                        }
                        for (i = listQ.length - 1; i > -1; i--) {
                            //listQ[i]
                            $("#" + settings_ex.id).prepend(listQ[order[i]]);
                        }
                    }
                    //----------------------------------------------------------------------

                    //----------------------------------------------------------------------
                    //añado al evento onok de cada actividad que se active el botón de pasar la actividad
                    //debe ser antes de generar las actividades
                    if (settings_ex.type === "checker") {
                        for (i = 1; i < arguments.length; i++) {
                            if (i == arguments.length - 1) {
                                arguments[i].onchecker = function () {
                                    //muestro, si existe, el bloque con atributo data-info-ok=""
                                    //en esta actividad coloca el interior del bloque id_out
                                    var $info = $('[data-info-ok="' + settings_ex.id + '"]');
                                    if ($info.length) {
                                        $('#' + settings_ex.id + '_out').append('<div class="' + styles.testsolok + '">' + $info.html() + '</div>');
                                        $('[data-info-ok="' + settings_ex.id + '"]').show();
                                        $("#" + settings_ex.id + "_trnslider").hide();
                                        $("#" + settings_ex.id + "_sldctrl").css("display", "table");
                                        runSlide(arguments.length - 1); //debemos colocar los controles en el último paso ya que no se habían movido
                                    }
                                };
                            } else {
                                arguments[i].onchecker = function () {
                                    $("#" + settings_ex.id + "_trnctrl_next").prop("disabled", false);
                                };
                            }
                        }
                    }
                    //----------------------------------------------------------------------

                    //creo el html de cada pregunta
                    for (i = 1; i < arguments.length; i++) {
                        if (settings_ex.type === "pager" || settings_ex.type === "checker") {
                            setQuestion(arguments[i]);
                        } else {
                            setQuestion(arguments[i], settings_ex);
                        }
                    }

                    
                    //--- slide -----------------------------------
                    //guardo los ids de cada pregunta para el slide
                    if ((settings_ex.flow === "slide" || settings_ex.flow === "train") && args.length > 2)  {

                        if (settings_ex.random) {
                            //desordena aleatoriamente
                            listSlidesIds.sort(function () { return 0.5 - Math.random(); });
                        }

                        //oculto las preguntas de la 2 en adelante
                        for (i = 1; i < listSlidesIds.length; i++) {
                            $("#" + listSlidesIds[i]).hide();
                            if (settings_ex["wai-aria"]) {
                                $("#" + listSlidesIds[i]).attr('aria-hidden', true);
                            }
                        }

                    }
                    //---------------------------------------------
                    


                    //----------------------------------------------------------------------
                    //mover los controles
                    if ($('[data-move-btncheck="' + settings_ex.id + '"]').length) {
                        //muevo el botón de entrega
                        $('[data-move-btncheck="' + settings_ex.id + '"]').html($('#' + settings_ex.id + '_btnbox'));
                    }
                    if ($('[data-move-btnctrl="' + settings_ex.id + '"]').length) {
                        if(settings_ex.flow==="slide"){
                            //muevo los botones del slider
                            $('[data-move-btnctrl="' + settings_ex.id + '"]').html($('#' + settings_ex.id + '_sldctrl'));
                        }
                        if (settings_ex.flow === "train") {
                            //muevo los controles del train
                            $('[data-move-btnctrl="' + settings_ex.id + '"]').html($('#' + settings_ex.id + '_trnctrl'));
                        }
                    }
                    if ($('[data-move-prgbar="' + settings_ex.id + '"]').length) {
                        //muevo la barra de progreso de la modalidad train
                        $('[data-move-prgbar="' + settings_ex.id + '"]').html($('#' + settings_ex.id + '_trnslider'));
                    }
                    //----------------------------------------------------------------------
                    
                    $myBtn = $("#" + settings_ex.id + "_btn");
                    if (settings_ex.type === "pager" || settings_ex.type === "checker") {
                        $myBtn.hide();
                    } else {
                        //evento del boton solucion
                        $myBtn.on("click", setResults);       //función que crea y muestra la tabla de resultados
                    }


                    //botones del slide. Añado también los eventos en el tipo checker ya que los mostraré al final
                    if ((settings_ex.flow === "slide" || settings_ex.type === "checker") && args.length > 2) {

                        //muestro la primera diapositiva (actividad)
                        runSlide("",-1);

                        //pongo los eventos para los botones del slide
                        $("#" + settings_ex.id + "_sldctrl_prev").on("click", function () {
                            runSlide("prev");
                        });
                        $("#" + settings_ex.id + "_sldctrl_next").on("click", function () {
                            runSlide("next");
                        });

                        if (settings_ex.type === "checker") {
                            //oculto el slide
                            $("#" + settings_ex.id + "_sldctrl").hide();
                        }
                    }

                    //botones del train
                    if (settings_ex.flow === "train" && args.length > 2) {
                        //texto del botón siguiente
                        $("#" + settings_ex.id + "_sldctrl_next").text(lang.next);
                        //actualizamos la barra de progreso
                        if ($('#' + settings_ex.id + '_trnslider').length) {
                            refreshSlider(settings_ex.id + '_trnsliderprg', settings_ex.id + '_trnslidertxt', currentSlide + 1, listSlidesIds.length, settings_ex.sliderinfo, settings_ex.slidercolor);
                            $('#' + settings_ex.id + '_trnslider').show();
                            if (settings_ex["wai-aria"]) {
                                $('#' + settings_ex.id + '_trnslider').attr('aria-hidden', false);
                            }
                        }

                        if (settings_ex.type === "checker") {
                            //en el modo checker se empieza con el botón desactivado. Lo activará de nuevo el evento onok de cada actividad.
                            $("#" + settings_ex.id + "_trnctrl_next").prop("disabled", true);
                        }

                        $("#" + settings_ex.id + "_trnctrl_next").on("click", function () {
                            runTrain("next");
                        });
                    }

                    

                  
                    if (settings_ex.type === "test") {
                        //------- resultados previos ---------------------------------------------
                        if (settings_ex.showstorage) {

                            //añado el html de los resultados previos al final del div del test
                            var tbStore = getResults(settings_ex.storage, settings_ex.storagekey, settings_ex.id, settings_ex.delstorage);
                            tbStore = '<div data-store-wrap="' + settings_ex.id + '">\n' + tbStore + '</div>\n'; //lo envuelvo en un div para poder encontrarla en lo eventos y diferenciarla de otras tablas
                            if (tbStore) {

                                if ($('#' + settings_ex.id + ' fieldset[name="' + settings_ex.id + '"]').length) {
                                    $('#' + settings_ex.id + ' fieldset[name="' + settings_ex.id + '"]').append(tbStore);
                                } else {
                                    $("#" + settings_ex.id).append(tbStore);
                                }

                                //eventos de la tabla con los resultados previos
                                eventosStorage(settings_ex.storage, settings_ex.storagekey, settings_ex.id, '[data-store-wrap="' + settings_ex.id + '"] ');
                                //oculto la tabla por defecto
                                $('[data-storage-tblbox="' + settings_ex.id + '"] .' + styles.stotbl).hide().attr('aria-hidden', true);
                                $('[data-storage-tblbox="' + settings_ex.id + '"] .' + styles.stodiv).show().attr('aria-hidden', false);
                            }
                        }
                        //------- end resultados previos ---------------------------------------------
                    }

                    //------- eventos personalizados --------------------------------------------
                    try {
                        //opción de añadir una función que se ejecute al finalizar la preparación del test
                        if (typeof settings_ex.onready === 'function') {
                            settings_ex.onready.call(setTest);
                            //pongo como referencia la función setTest de forma que podré acceder a las funciones 
                            //que defina dentro de ella si las pongo como propiedades de la funcion (ej. setTest.miF = miF)
                        }
                    } catch (err) {
                        if (debug) { alert("test.onready: " + err); }
                    }
                    //------- end eventos personalizados --------------------------------------------


                } else {
                    // jQuery is not loaded
                    document.getElementById(testOpt.id).innerHTML = "<span style='color: red;'>" + "This requires jQuery!" + "</span>";
                }


            } catch (err) {
                if (err instanceof CustomException) {
                    err.show();
                }
                else {
                    if (debug) { alert("setTest(): " + err); }
                }
            } //end try...catch

        } //end funcion setTest
        //---- end setTest -------------------------------------------------------------





    function showOptions(){
        alert(JSON.stringify(settings));
        return this;
    }
		
    return { 
        Question: setQuestion,
        Test: setTest,
        Eval: setEval,
        /*
        Obtiene los resultados anteriores del storage, crea una tabla con los mismos y la coloca en el elemento idOut
        getStorage(idOut, tipus, stokey, iden)
        Ej. getStorage("id_bloque", "local", "", "iden_test_o_prob")
        */
        getStorage: getStorage,
        ShowOptions: showOptions
    };
}());
//-------------------------------------------------------------------

	
	
    jsGeorkBUILDER.prototype.Questions = Questions;
	


//-------------------------------------------------------------------
//modulo con información de la biblioteca utilizando el pattern module
//-------------------------------------------------------------------
jsGeorkBUILDER.prototype.modInfo = (function () {
		
    var bienvenida = lang.infbienvenida + libName + ". \n\n"; //variable privada del módulo
		
    function setInfo() { //método privado del módulo
        var sInfo = bienvenida;
        sInfo += lang.infversion + version + ". \n";
        sInfo += lang.infobjgbl + libName + ". \n";
        sInfo += lang.infjq + " \n";
        return sInfo;
    };
    return {
        aboutMe: lang.infme,
        getInfo: function () {
            //esto es un método público del módulo
            return setInfo();
        } 
    };
}());
//-------------------------------------------------------------------
	
	
	
//alias del prototipo para poder añadir funciones
jsGeork.fn = jsGeorkBUILDER.prototype;
	
	

//Coloco la copia local como variable global
window.jsGeork = jsGeork;
	



})(jQuery, document, window);

