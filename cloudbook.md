# Cloudbook

## Definición del proyecto

Cloudbook es una aplicación desarrollada por el equipo LliureX para la creación de libros digitales interactivos de forma fácil e intuitiva. Para ello se ha elegido una interfaz WYSIWYG ( lo que ves es lo que obtienes ) similar al Writer de LibreOffice o al Scribus, de forma que en todo momento estas viendo como quedara el resultado al final a diferencia de editores como el Kompozer, donde no podemos ver el resultado hasta que no se exporta o renderiza.

## Tecnologías utilizadas

Para crear el Cloudbook se ha elegido los lenguajes HTML5, Javascript, CSS y Node.JS . Todas estas tecnologías se utilizaran en conjunto con nwjs, que es un Chromium ( Google Chrome libre ) modificado para que se pueda utilizar nodejs dentro del navegador. Se necesita nodejs, ya que se accederá al sistema operativo tanto para acceder a ficheros como para ejecutar ciertos comandos para conversión entre formatos.

Además de esto se esta utilizando un sistema de construcción para automatizar ciertas tareas como son la generación de las traducciones, construcción del proyecto, etc. Dicho sistema es __GULP__ , que es un sistema de construcción basado en javascript y en ciertas tareas.

## Partes del proyecto

Se ha optado por una aplicación "Single page", como Twitter. Por lo que solo hay un punto de entrada y dependiendo de las necesidades se van cargando unos módulos u otros. Para dicha carga se utiliza una librería desarrollada por el equipo. Se barajaron posibilidades como commonjs, requirejs o browserify, pero se descartaron por estar en desuso, aumentar la complejidad del proyecto o por no adecuarse al funcionamiento esperado de una parte del proyecto. La librería en cuestión se utiliza a lo largo del proyecto con el nombre de CBUtil.

### Secciones 

Para la creación de los libros se requieren tener secciones donde se organiza el contenido. Estas secciones tienen un identificador único con el cual sera almacenado en la capa de datos. Las secciones en el proyecto se llaman CBSections

### Objetos Cloudbook

Llamados también CBObjects. Son la base de toda la información del libro. Cloudbook ofrece un objeto base , del cual todos los componentes deben heredar, que ofrece funcionalidades básicas ( redimensionado del objeto, rotación, posicionamiento de capas, etc).

### Almacenamiento de los datos

Para facilitar el trabajo con toda la información se ha creado una capa de datos, la cual se encarga de guardar y ofrecer objetos y secciones. Actualmente toda esta información se guarda en memoria, por lo que queda pendiente realizar un módulo para que haga cache de la información y descargue memoria.

### Librerías
#### Desarrollo propio

__CBUtil__ se compone de diversas funciones para ofrecer el patrón de diseño singleton, herencia , namespaces y la función antes comentada para importar modules llamada __req__. La función req cargara el módulo indicado y dejara todo el código contenido dentro de la variable a la cual se le asigne, de esta forma se evitara que se pueda solapar funcionalidad. Este comportamiento es similar al que se realiza en nodejs al hacer un require de un módulo.

__CBI18n__ es una librería que prepara el entorno para ofrecer la funcionalidad de traducción. Esta librería se basa en __JED__, que es una librería de traducciones, pero facilita las cosas para que se pueda usar mas rápidamente y sin tener que configurar nada.

#### Externas

* __HANDLEBARS__. Para el desarrollo de la aplicación hay muchos momentos en los cuales desde javascript se tiene que renderizar html. Para facilitar la legibilidad del código se plantea utilizar un motor de plantillas. En este caso se decide usar handlebars, que está basado en mustache, pero añade ciertas funcionalidades. Ademas sobre dicho motor de plantillas se utiliza un handler para hacer que sea internacionalizable. 
* __jQuery , jQuery-UI__. Se utilizan para el acceso a elementos representados, para enlazar acciones a botones, para mostrar diálogos, etc.
* __jQuery-layout__. Se requiere una pantalla dividida en varias zonas claras : una botonera, una zona de trabajo, una zona con las distintas secciones y una barra de notificaciones. La zona de las secciones deberá ser redimensionable en el eje x para poder ver todas las secciones de forma comoda. jquery-layout ofrece todas estas configuraciones sin añadir demasiada complejidad. 
* __jQuery-hotkeys__. Jquery-layout y muchos de los componentes que se utilizan requieren de jquery-hotkeys para el correcto funcionamiento, así que se ha puesto de forma común para que no lo tengan que depender. Además en un futuro se desea poder hacer ciertas acciones mediante atajos de teclado.



### Componentes

Cloudbook tiene como meta ser un editor fácilmente extensible mediante componentes que añaden funcionalidades. Por ejemplo, para añadir texto al libro tendremos un elemento texto que sera una caja de texto. Este elemento no estará vinculado a la aplicación, de forma que si se decidiera eliminar dicho componente el funcionamiento de la aplicación seria el mismo, o se podría sustituir por otro elemento. Ningún componente del cloudbook es necesario para su funcionamiento, por lo que esta desacoplado con todos sus elementos. 

Debido a estar desacoplado con el resto del sistema, los componentes deben de ser los encargados de mucha de la funcionalidad. Cada componente deberá de implementar la funcionalidad para las distintas exportaciones : HTML, PDF, EPUB, etc. Todas estas exportaciones tendrán una lógica básica en el core del cloudbook, pero los componentes serán los responsables de seguir las indicaciones para exportar. Por
ejemplo un vídeo: en la exportación a HTML, el componente devolverá una etiqueta html5 de tipo vídeo, pero en el caso de la exportación a PDF podría devolver un frame de dicho vídeo que se debería de calcular en el proceso de exportación. Toda esta funcionalidad el core del cloudbook sera desconocedor, lo único que sabrá es que al llamar al método de un componente de exportación a HTML5 este recibirá una etiqueta que añadirá al documento que este generando. No obstante si un componente no provee de dicha función para la exportación, lo que sucederá es que se asumirá que ese componente no se puede exportar al formato indicado.


Todos los componentes tienen una base común : 

* core.js
* metadata.json 

El fichero core.js es quien contiene toda la lógica principal del componente. Este contendrá la lógica necesaria para funcionar tanto en el editor como para exportar a todos los formatos necesarios.

El fichero metadata.json es un fichero json con la siguiente estructura:
```
{
    "idtype" : "87d7b00a-a296-4cd9-af13-f8d9685a6dec", 
    "description":"Append PMS to content",
    "label": "PMS",
    "icon" : "icon.png",
    "version" : "0.2.0",
    "category": "activity",
    "external_scripts" : ["lib_external/jsgeork/jquery.jsgeork.js"],
    "external_css" : ["lib_external/jsgeork/jquery.jsgeork.css","lib/pms.css"]
}

```
Donde los campos obligatorios son :
* idtype
* label
* version
* category
* icon

__idtype__ Cada uno de los componentes tiene un identificador único que se utilizara para restaurar los ficheros del proyecto. De forma que si hay algún proyecto guardado que se ha creado con mas componentes de los que tienes en tu cloudbook no podrá cargarlo debido al desconocimiento de la estructura.

__Label__ sera la etiqueta que se mostrara en el menú de insertar. Esta etiqueta puede estar categorizado. Para ello se utiliza el campo __category__ que podrá ser root, o otro nombre, siendo root la clave para decir que no estará dentro de ninguna categoría.

__version__ se utilizara en caso de incompatibilidad entre versiones del componente.

__icon__ sera la imagen que se muestra en la barra de botones rápidos.


Ademas de estos campos se pueden necesitar otros:

__description__ : Campo utilizado para añadir tooltips sobre los botones y entradas del menú insertar

__external_scripts__ : Puede ser que algún componente necesite de alguna librería para que funcione correctamente. Por ejemplo, un juego del ahorcado , podemos utilizar algún motor ya creado y utilizarlo. También puede ser el caso del componente de tipo texto, que necesita de un editor de texto externo. En este campo se añadirán aquellos scripts que sean necesarios para el funcionamiento tanto en el editor como en la exportación html. Estas rutas serán relativas al directorio del componente. Por ejemplo si tenemos la estructura :

```
    ├── core.js
    ├── metadata.json
    └── lib_external
        ├── jquery.js
        └── prototype.js
```
 el contenido del campo __external_scripts__ seria [ 'lib_external/jquery.js', 'lib_external/prototype.js' ]

__external_css__ es similar al caso de external_scripts, pero en este caso se utiliza para ficheros css

Todos los ficheros necesarios para el funcionamiento del componente deben de estar situados en esta carpeta y la estructura sera __lib__ para almacenar las librerías del componente que no hayan generado otros; __lib_external__ para librerías que se usen pero sean desarrolladas por un equipo externo, como son jquery, prototype, etc.

__disabled__ es un campo booleano para definir si dicho componente debe ser cargado en el cloudbook

### Exportaciones

Como se ha comentado antes, el core tiene unas reglas básicas para realizar la exportación. Esto es debido a que aunque cada componente sea independiente, tiene que haber un punto donde se una todo. Además, dichas exportaciones pueden ser que tengan alguna personalizacion (numero de pagina, pie o encabezado, índice , etc).

#### HTML5

Para realizar la exportación a html5 no se require de ninguna ayuda externa. Se generara una carpeta que contendra todos los ficheros necesarios. El fichero index.html se genera mediante una función que obtiene las distintas secciones y el contenido de cada una de ellas. Además se consulta el fichero metadata.json de cada componente que se renderize para ver si contiene external_scripts, y en caso de que contenga algo, dichas librerías se añaden a una carpeta de recursos donde estarán las librerías necesarias.

La carpeta con el resultado final también contiene otra carpeta que contendrá aquellos ficheros de tipo multimedia o que sean requeridos por los componentes como necesarios. Aquí vendrían las imágenes, vídeos, sonidos, etc.
#### PDF

Para la exportación de PDF se utiliza una utilidad llamada __wkhtmltopdf__, que mediante un html genera un pdf. El html generado para este proceso no es el mismo que el anterior, ya que para elementos interactivos se les da una solución que sea útil en la exportación a PDF. Por lo tanto antes de pasar a PDF se le da un preprocesado que se genera en varios html, que finalmente wkhtmltopdf se encargara de unir.

#### EPUB

La exportación a EPUB se realiza mediante la librería epub-gen instalada desde npm. Esta librería acepta html para generar el epub. Por lo que se ha seguido el mismo patrón que con la exportación a PDF, con la diferencia que en este punto no se genera ningún fichero intermedio, sino que el preprocesado se hace en memoria. Esta librería esta pensada para nodejs.

#### WEBZIP

El formato webzip es básicamente un HTML comprimido con un zip. Para ello se ha utilizado la librería zip-folder del repositorio npm. Esta librería esta pensada para nodejs.

### Internacionalización

Toda la aplicación es multi idioma. Para ello se utiliza una librería de internacionalización llamada JED. Esta libreria espera unos ficheros en formato json que contendrá las cadenas de texto originales y la traducción al idioma correspondiente. Pero este tipo de fichero no es el mismo que el utilizado en las traducciones de linux como estándar. El estándar en las aplicaciones de linux son el fichero "PO" . Con el fin de facilitar la traducción al equipo de traducción se busca una conversión entre ambos formatos.

La fase inicial de todo este proceso parte de extraer las cadenas de los ficheros. Esta tarea se realiza con la librería "jsxgettext", la cual buscara en los ficheros js o hbs(handlebars) aquellas cadenas que estén dentro de una funcion gettext. Para los ficheros js se utiliza la función gettext de la librería CBI18n. En el caso de HANDLEBARS, se creado un helper llamado gettext que recibe una cadena y la traduce. Para extraer las cadenas se ha creado una tarea de GULP que utilizara jsxgettext y el resultado lo acabara guardando en un fichero llamado cloudbook.pot, que es el esperado por los traductores para realizar su trabajo.

Posteriormente los traductores, en base al fichero cloudbook.POT, generaran tantos ficheros de extensión po como idiomas se soporten. Estos ficheros se dejaran en la carpeta po del proyecto, para posteriormente lanzar otra tarea de GULP que transformara los ficheros po al formato JED. Esta tarea de GULP utilizara la librería po2json, que tambien soporta el formato JED. El resultado se dejara en la carpeta src/i18n que mas tarde Cloudbook utilizara  el fichero adecuado según el idioma en que se encuentra.

### Automatización de tareas : GULP

Para realizar las tareas de extracción de cadenas, transformación de dichos fichero a formato JED y construcción del proyecto se ha optado por GULP. A diferencia de GRUNT, este permite mucha mas personalizacion debido a la naturaleza de programar las tareas mediante código.

#Enlaces

* http://nwjs.io/ - Motor utilizado para el cloudbook
* http://github.com/cloud-book/cloudbook - Codigo fuente del cloudbook
* http://cloud-book.github.io/ - Página web del proyecto
* http://gulpjs.com/ - Motor de automatización de tareas
* http://slexaxton.github.io/Jed/ - Librería para internacionalizar la aplicación
* https://github.com/zaach/jsxgettext - Herramienta para extraer las cadenas de los ficheros
* https://github.com/mikeedwards/po2json - Herramienta para convertir ficheros po al formato JSON( y al formato JED)
* https://github.com/mllrsohn/node-webkit-builder - Helper para empaquetar las aplicaciones de node-webkit
* https://github.com/sole/node-zip-folder - crea ficheros zip 
* http://wkhtmltopdf.org/ - Librería utilizada para la conversión de html a pdf
* http://handlebarsjs.com/ - Motor de plantillas
* https://jquery.com/ 
* https://jqueryui.com/
* http://layout.jquery-dev.com/ - Gestor del layout
* https://github.com/jeresig/jquery.hotkeys - Plugin para los atajos de teclado
* http://mindmup.github.io/bootstrap-wysiwyg/ - Editor de texto en el que esta basado la barra del componente textbox
* http://jsgeork.geork.com/ - Motor utilizado para las actividades interactivas 
