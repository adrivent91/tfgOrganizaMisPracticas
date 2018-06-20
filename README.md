# tfgOrganizaMisPracticas

## Autora

Adriana Ventuna Candela, UCM (Universidad Complutense de Madrid). Junio 2018.

## Descripción

Herramienta de apoyo para la organización y visualización de las tareas de los alumnos a lo largo del curso. Se ha optado por una aplicaciónpara dispositivos móviles destinada a los estudiantes. La aplicación permite la visualización de las tareas pendientes y terminadas durante el curso, así como la información de dichas tareas con sus respectivas calificaciones, la información de la asignatura a la que pertenece cada tarea y la información del profesor. También se desarrollan dos web para el mantenimiento de la aplicación por parte del administrador y el profesorado. El administrador se encarga de realizar una gestión de la base de datos. Los profesores se encargan de realizar una gestión de las entregas y notas de las tareas de cada una de sus asignaturas que tienen a lo largo del curso.

Enlace al video de Youtube con la app funcionando en un dispositivo Android: [https://youtu.be/3bRHtr62gjY](https://youtu.be/3bRHtr62gjY)


## Requisitos

 * Servidor Web correctamente configurado. Algunas opciones son Apache, NGINX, XAMPP, etc.
 * PHP 7.X
 * Servidor de MySQL instalado.
 * Para la aplicación de Android e IOS: Apache Cordova, junto a las SDKs de Android e IOS, Android Studio y XCode (comprobar la web oficial de Apache Cordova para más detalles).
 

## Información de la estructura:

### api

La carpeta **api** contiene el código donde se gestionan las funcionalidades de la aplicacion que usa cordova, es decir, es donde se gestionan las peticiones json.

### app_web

La carpeta **app_web** es donde se encuentran los ficheros HTML, CSS Y JAVASCRIPT que utilizan los profesores y administrador.

### application

La carpeta **server** gestiona los elementos que tienen en comun ambas aplicaciones, como es la conexion de la base de datos y las clases (facultad, alumno...), y tambien las utilidades que usas ambas web (declaracion de hashing y web)

La carpeta **web** gestiona las peticiones json que realizan el administrador y el profesor. Esta dividida en admin y teacher, para distinguir cuales hace cada cliente. **login** y **edit_passw** son los elementos que tienen en comun ambas web

### organizUCM

La carpeta **organizUCM** contiene los ficheros que conforman el proyecto de Apache Cordova. 

### mysql_scripts

La carpeta **mysql_scripts** contiene los scripts de mysql necesarios para crear las tablas e insertar los datos.

## Instalación (Servidor Web)

 * Copiar las carpetas api, app_web y application en la ruta configurada en el servidor Web (típicamente es /var/www).
 * Configurar los permisos de manera que el usuario (www-data en sistemas UNIX/Linux) pueda acceder a dichos ficheros.
 
 
## Instalación (base de datos)

 * Desde phpmyadmin o una terminal, crear una base de datos de nombre: **ORGANIZ_PRACTICAS** (codificación UTF-8).
 * Crear un usuario con las siguientes credenciales:
   * nombre:  **dbo_op**
   * contraseña: **secret123_dbo_op**
 * Desde phpmyadmin o una terminal, importar los scripts siguientes (en este orden):
   * _dataBase.sql_. Crea las tablas
   * _InsertData.sql_. Opcional. Carga datos de prueba.


## Instalación (Android e IOS)

 * Modificar la variable **server_addr** del archivo app_cordova_android_ios/index.html con la dirección IP de la máquina que tiene instalado el servidor Web.
 * Compilar el proyecto con cordova
 * Instalar la app en un smartphone (Android o IOS) utilizando Android Studio o XCode.