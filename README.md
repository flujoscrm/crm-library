# Librería de funciones globales para flujos

Esta es una librería de funciones que podrán ser utilizadas en formularios custom, evitando asi la repetición de código y mejorando la mantenibilidad en general.

## Requerimientos

Se debe tener instalado [Node.js](https://nodejs.org/ "Sitio Web oficial de Node.js"), para la
instalación de los paquetes.

Una cuenta de github para realizar los commits y crear tags para el deploy.

## Desarrollo

El primer paso para desarrollar la librería es instalar las dependencias con `npm install`.

Esto habilita la posibilidad de realizar ediciones para luego compilarlo.

### Arquitectura de la libreria

Donde principalmente se estaria realizando cambios son en la carpeta **src** y **test** donde en la primera se tiene un archivo .js con el nombre relacionado a las funciones que contiene, ejemplo: date.js contiene funciones relacionadas a fecha , hora , etc. 

En cambio en la segunda carpeta se tienen archivos de test unitarios por cada modulo, esto garantiza que el cambio que realizemos sea retrocompatible con versiones anteriores, o en todo caso nos indica que la versión ya no es compatible con versiones anteriores.

### ¿Cómo empaqueto mis cambios realizados?

Para lograr esto solo se necesita realizar `npm run build`, que crea una carpeta **dist**,
el cual contiene el archivo empaquetado de la librería con el nombre **index.min.js**

### ¿Cómo hago deploy de una nueva versión?

Para lanzar una nueva versión, se crea un release de la rama **main**.
La rama **main** debe contener los últimos cambios ya testeados.

Una vez listos los cambios en **main**, desde la interfáz de GitHub se utiliza la opción **Create a new release**.
Al crear un nuevo tag con el número de versión, es importante seguir las convenciones especificadas más adelante.
Finalmente se procede con la publicación utilizando la opción **Publish release**.

Al realizar la publicación, el CDN automáticamente toma los cambios y disponibiliza la nueva versión.

### ¿Como ejecuto un test?

Para ejecutar un test simplemente se debe ejecutar `npm run test` luego de haber instalado los paquetes.

## Nomenclatura de versiones (SemVer)

Para crear un nuevo tag se necesita conocer acerca de la nomenclatura correcta de
versiones ([SemVer](https://semver.org/ "Portal de Semantic Versioning")).

Para el caso se describe:

**vMAJOR.MINOR.PATCH**

Siendo:

1. Major: Se incrementa cuando la version ya no será compatible con una versión anterior.
2. Minor: Se incrementa cuando se añade funcionalidad nueva compatible con la versión anterior.
3. Patch: Se incrementa cuando se añade correcciones compatibles con la versión anterior.

Ejemplo:

- Cambios incompatibles (MAJOR): Cambias de v1.2.3 a 2.0.0
- Nuevas funcionalidades (MINOR): Cambias de v1.2.3 a v1.3.0
- Correcciones de errores (PATCH): Cambias de v1.2.3 a v1.2.4

## Inclusión con CDN

Como CDN utilizamos jsDelivr. El URL definido es relativo al repositorio GitHub.

Para incluir la última versión, el URL es:

```
https://cdn.jsdelivr.net/gh/flujoscrm/crm-library/dist/index.min.js
```

También es posible, y recomendable, especificar una versión en particular. Teniendo
en cuenta la nomenclatura SemVer, se puede especificar a nivel de MAJOR, MINOR, o PATCH release:

```
https://cdn.jsdelivr.net/gh/flujoscrm/crm-library@1/dist/index.min.js
https://cdn.jsdelivr.net/gh/flujoscrm/crm-library@1.2/dist/index.min.js
https://cdn.jsdelivr.net/gh/flujoscrm/crm-library@1.2.3/dist/index.min.js
```
