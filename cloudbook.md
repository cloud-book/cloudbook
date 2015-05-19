# Cloudbook

## Definición del proyecto

Cloudbook es una aplicación desarrollada por el equipo LliureX para la creación de libros digitales interactivos de forma facil e intuitiva. Para ello se ha elegido una interfaz WYSIWYG ( lo que ves es lo que obtienes ) similar al Writer de LibreOffice o al Scribus, de forma que en todo momento estas viendo como quedara el resultado al final a diferencia de editores como el Kompozer, donde no podemos ver el resultado hasta que no se exporta o renderiza.

## Tecnologias utilizadas

Para crear el Cloudbook se ha elegido los lenguajes HTML5, Javascript, CSS y Node.JS . Todas estas tecnologias se utilizaran en conjunto con nwjs, que es un Chromium ( Google Chrome libre ) modificado para que se pueda utilizar nodejs dentro del navegador. Se necesita nodejs, ya que se accedera al sistema operativo tanto para acceder a ficheros como para ejecutar ciertos comandos para conversion entre formatos.

Ademas de esto se esta utilizando un sistema de contruccion para automatizar ciertas tareas como son la generacion de las traducciones, contruccion del proyecto, etc. Dicho sistema es __GULP__ , que es un sistema de contruccion basado en javascript y en ciertas tareas.

## Partes del proyecto

Se ha optado por una aplicacion "Single page", como Twitter. Por lo que solo hay un punto de entrada y dependiendo de las necesidades se van cargando unos modulos u otros. Para dicha carga se utiliza una libreria desarrollada por el equipo. Se barajaron posibilidades como commonjs, requirejs o browserify, pero se descartaron por estar en desuso, aumentar la complejidad del proyecto o por no adecuarse al funcionamiento esperado de una parte del proyecto. La libreria en cuestion se utiliza a lo largo del proyecto con el nombre de CBUtil.

### Secciones 

Para la creación de los libros se requiren tener secciones donde se organiza el contenido. Estas secciones tienen un identificador unico con el cual sera almacenado en la capa de datos. Las secciones en el proyecto se llaman CBSections

### Objetos Cloudbook

Llamados tambien CBObjects. Son la base de toda la información del libro. Cloudbook ofrece un objeto base , del cual todos los componentes deben heredar, que ofrece funcionalidades basicas ( redimensionado del objeto, rotacion, posicionamiento de capas, etc).

### Almacenamiento de los datos

Para facilitar el trabajo con toda la información se ha creado una capa de datos, la cual se encarga de guardar y ofrecer objetos y secciones. Actualmente toda esta informacion se guarda en memoria, por lo que queda pendiente realizar un modulo para que haga cache de la información y descargue memoria.

### Librerias
#### Desarrollo propio

CBUtil se compone de diversas funciones para ofrecer el patron de diseño singleton, herencia , namespaces y la funcion antes comentada para importar modules llamada __req__. La funcion req cargara el modulo indicado y dejara todo el codigo contenido dentro de la variable a la cual se le asigne, de esta forma se evitara que se pueda solapar funcionalidad. Este comportamiento es similar al que se realiza en nodejs al hacer un require de un modulo.
#### Externas

* __HANDLEBARS__. Para el desarrollo de la aplicacion hay muchos momentos en los cuales desde javascript se tiene que renderizar html. Para facilitar la legibilidad del codigo se plantea utilizar un motor de plantillas. En este caso se decide usar handlebars, que está basado en mustache, pero añade ciertas funcionalidades. Ademas sobre dicho motor de plantillas se utiliza un handler para hacer que sea internacionalizable. 
* __jQuery , jQuery-UI__. Se utilizan para el acceso a elementos representados, para enlazar acciones a botones, para mostrar dialogos, etc.
* __jQuery-layout__. Se require una pantalla dividida en varias zonas claras : una botonera, una zona de trabajo, una zona con las distintas secciones y una barra de notificaciones. La zona de las secciones debera ser redimensionable en el eje x para poder ver todas las secciones de forma comoda. jquery-layout ofrece todas estas configuraciones sin añadir demasiada complejidad. 
* __jQuery-hotkeys__. Jquery-layout y muchos de los componentes que se utilizan requiren de jquery-hotkeys para el correcto funcionamiento, asi que se ha puesto de forma comun para que no lo tengan que depender. Ademas en un futuro se desea poder hacer ciertas acciones mediante atajos de teclado.



### Componentes

Cloudbook tiene como meta ser un editor facilmente extensible mediante componentes que añaden funcionalidades. Por ejemplo, para añadir texto al libro tendremos un elemento texto que sera una caja de texto. Este elemento no estara vinculado a la aplicación, de forma que si se decidiera eliminar dicho componente el funcionamiento de la aplicacion seria el mismo, o se podria sustituir por otro elemento. Ningun componente del cloudbook es necesario para su funcionamiento, por lo que esta desacoplado con todos sus elementos. 

Debido a estar desacoplado con el resto del sistema, los componentes deben de ser los encargados de mucha de la funcionalidad. Cada componente debera de implementar la funcionalidad para las distintas exportaciones : HTML, PDF, EPUB, etc. Todas estas exportaciones tendran una logica basica en el core del cloudbook, pero los componentes seran los responsables de seguir las indicaciones para exportar. Por
ejemplo un video: en la exportacion a HTML, el componente devolvera una etiqueta html5 de tipo video, pero en el caso de la exportacion a PDF podria devolver un frame de dicho video que se deberia de calcular en el proceso de exportacion. Toda esta funcionalidad el core del cloudbook sera desconocedor, lo unico que sabra es que al llamar al metodo de un componente de exportacion a HTML5 este recibira una etiqueta que añadira al documento que este generando. No obstante si un componente no provee de dicha funcion para la exportacion, lo que sucedera es que se asumira que ese componente no se puede exportar al formato indicado.


Todos los componentes tienen una base comun : 

* core.js
* metadata.json 

El fichero core.js es quien contiene toda la logica principal del componente. Este contendra la logica necesaria para funcionar tanto en el editor como para exportar a todos los formatos necesarios.

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

__idtype__ Cada uno de los componentes tiene un identificador unico que se utilizara para restaurar los ficheros del proyecto. De forma que si hay algun proyecto guardado que se ha creado con mas componentes de los que tienes en tu cloudbook no podra cargarlo debido al desconocimiento de la estructura.

__Label__ sera la etiqueta que se muestrara en el menu de insertar. Esta etiqueta puede estar categorizado. Para ello se utiliza el campo __category__ que podra ser root, o otro nombre, siendo root la clave para decir que no estara dentro de ninguna categoria.

__version__ se utilizara en caso de incompatibilidad entre versiones del componente.

__icon__ sera la imagen que se muestra en la barra de botones rapidos.


Ademas de estos campos se pueden necesitar otros:

__description__ : Campo utilizado para añadir tooltips sobre los botones y entradas del menu insertar

__external_scripts__ : Puede ser que algun componente necesite de alguna libreria para que funcione correctamente. Por ejemplo, un juego del ahorcado , podemos utilizar algun motor ya creado y utilizarlo. Tambien puede ser el caso del componente de tipo texto, que necesita de un editor de texto externo. En este campo se añadiran aquellos scripts que sean necesarios para el funcionamiento tanto en el editor como en la exportacion html. Estas rutas seran relativas al directorio del componente. Por ejemplo si tenemos la estructura :

```
    ├── core.js
    ├── metadata.json
    └── lib_external
        ├── jquery.js
        └── prototype.js
```
 el contenido del campo __external_scripts__ seria [ 'lib_external/jquery.js', 'lib_external/prototype.js' ]

__external_css__ es similar al caso de external_scripts, pero en este caso se utiliza para ficheros css

Todos los ficheros necesarios para el funcionamiento del componente deben de estar situados en esta carpeta y la estructura sera __lib__ para almacenar las librerias del componente que no hayan generado otros; __lib_external__ para librerias que se usen pero sean desarrolladas por un equipo externo, como son jquery, prototype, etc.

__disabled__ es un campo booleano para definir si dicho componente debe ser cargado en el cloudbook

### Exportaciones

Como se ha comentado antes, el core tiene unas reglas basicas para realizar la exportacion. Esto es debido a que aunque cada componente sea independiente, tiene que haber un punto donde se una todo. Ademas, dichas exportaciones pueden ser que tengan alguna personalizacion (numero de pagina, pie o encabezado, indice , etc).

#### HTML5

Para realizar la exportacion a html5 no se require de ninguna ayuda externa. Se generara una carpeta que contendra todos los ficheros necesarios. El fichero index.html se genera mediante una funcion que obtiene las distintas secciones y el contenido de cada una de ellas. Ademas se consulta el fichero metadata.json de cada componente que se renderize para ver si contiene external_scripts, y en caso de que contenga algo, dichas librerias se añaden a una carpeta de recursos donde estaran las librerias necesarias.

La carpeta con el resultado final tambien contiene otra carpeta que contendra aquellos ficheros de tipo multimedia o que sean requeridos por los componentes como necesarios. Aqui vendrian las imagenes, videos, sonidos, etc.
#### PDF

Para la exportacion de PDF se utiliza una utilidad llamada __wkhtmltopdf__, que mediante un html genera un pdf. El html generado para este proceso no es el mismo que el anterior, ya que para elementos interactivos se les da una solucion que sea util en la exportacion a PDF. Por lo tanto antes de pasar a PDF se le da un preprocesado que se genera en varios html, que finalmente wkhtmltopdf se encargara de unir.

#### EPUB

La exportacion a EPUB se realiza mediante la libreria epub-gen instalada desde npm. Esta libreria acepta html para generar el epub. Por lo que se ha seguido el mismo patron que con la exportacion a PDF, con la diferencia que en este punto no se genera ningun fichero intermedio, sino que el preprocesado se hace en memoria. Esta libreria esta pensada para nodejs.

#### WEBZIP

El formato webzip es basicamente un HTML comprimido con un zip. Para ello se ha utilizado la libreria zip-folder del repositorio npm. Esta libreria esta pensada para nodejs.

### Internacionalizacion


### Tematizacion

### Automatizacion de tareas : GULP

Para realizar las tareas de extraccion de cadenas, transformación de dichos fichero a formato JED y contruccion del proyecto se ha optado por GULP. A diferencia de GRUNT, este permite mucha mas personalizacion debido a la naturaleza de programar las tareas mediante código.





* JED
* PO2JSON
* GULP
* JSXGETTEXT
* NWBUILDER





#Enlaces

* http://nwjs.io/ - Motor utilizado para el cloudbook
* http://github.com/cloud-book/cloudbook - Codigo fuente del cloudbook
* http://cloud-book.github.io/ - Página web del proyecto