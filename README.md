# Libreria de funciones globales para flujos

Esta es una libreria de funciones que podran ser utilizadas en formularios custom, evitando asi la repetición de codigo.

## Requerimientos

Se debe tener instalado [Node.Js](https://nodejs.org/en "Link de instalacion"), para la instalacion de los paquetes.

Una cuenta de github para realizar los commits y crear tags para el deploy.

## Pasos 

El primer paso para la utilización de la libreria es instalar las dependencias con `npm install`.

Esto habilita la posibilidad de realizar ediciones para luego posteriormente compilarlo.

**¿Como hago deploy de una nueva versión?**

Para lograr esto se llega a una convención que todos las versiones deben crearse desde la rama ***main.*** Que contiene los ultimos cambios ya testeados de los features añadidos.

Una vez en la rama ***main***, se realiza `git tag -a vX.X.X -m "Mensaje relevante de la version"`.

Luego se sube el tag creado con `git push origin vX.X.X` 

## Nomenclatura de versiones

Para crear un nuevo tag se necesita conocer acerca de la nomenclatura correcta de versiones. Para el caso se describe:

**vMAJOR.MINOR.PATCH**

Siendo:

1. Major: Se incrementa cuando la version ya no será compatible con una versión anterior.
2. Minor: Se incrementa cuando se añade funcionalidad nueva compatible con la versión anterior.
3. Patch: Se incrementa cuando se añade correciones compatibles con la versión anterior.

Ejemplo:

- Cambios incompatibles (MAJOR): Cambias de v1.2.3 a 2.0.0
- Nuevas funcionalidades (MINOR): Cambias de v1.2.3 a v1.3.0
- Correciones de errores (PATCH): Cambias de v1.2.3 a v1.2.4
