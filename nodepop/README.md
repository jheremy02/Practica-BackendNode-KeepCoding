# NODEPOP

Api de servicio de de venta de articulos de segunda mano.

## Instalar dependencias

```sh

    npm install

```

## Inicializar la Base de datos y cargar datos de prueba

```sh
npm initdb

```

## Inicio de la aplicación

```sh
npm start

```
En modo desarrollo :

```sh
npm run dev

```

## Ruta Base

El api puede ser usad con  la ruta : [API](/api/advertisements)

## GET /advertisements

**Input Query**

- start : {int} para saltar resgistros
- limit  : {int} para limitar el numero de registros 
- sort : {string} indica el orden por el nombre del campo indicado
- tags : {string} nombre de tags para filtrar los registros

- type_advertisement : {string} filtrar por sell o buy (solo puedes pasarle uno de estos valores : sell , buy)

- price : {range} filtrar por rango de precio.

Ejemplo :

10-50   buscar anuncios en ese rango

10-    buscar anuncios con precio mayor a 10

-50    buscar anuncios con precio menor a 50

10     buscar anuncios con precio igual 10

- name : {string} filtrar registros cuyos nombres empiezen con el valor dado


**Ejemplo de consulta :**

/api/advertisements?start=0&limit=2&sort=price&includeTotal=true&tags=mobile&type_advertisement=sell&price=-3000&name=laptop

## GET /advertisements/tags

DEvuelve una lista de tags permitidos y disponibles en los registros de anuncios.

```json
{
    result: [
        "work",
        "lifestyle",
        "mobile",
        "motor"
            ]
}
```

## GET /api/advertisements/:id

Devuelve un registro especifico de anuncio con el id especificado.

## POST /api/advertisements

Crea un nuevo registro con los valores pasados en el body.

Campos en el body :

- name
- type_advertisements
- price
- image
- tags

Ejemplo enviando los datos como json:


```json
{ "name" : "laptop hp-406", 
"type_advertisement" : "sell", 
"price" : 1000,
"image" : "laptop.jpg", 
"tags" : [ "work", "lifestyle" ] }

```

## PUT /api/advertisements/:id

Permite actualizar un registro especifico correspondiente al id pasado como parametro , editará los valores que le enviemos en el body y retornara el registro actualizado.

Ejemplo en json para actualizar un registro :

/api/advertisements/:id

Valores del body en formato json : 

```json
    { "name" : "laptop hp-406 xp", 
    "price" : 3090,
    "tags" : ["work"] }
```

## DELETE api/advertisements/:id

Elimina un anuncio especifico correspondiente al id enviado como parametro.

Ejemplo :


/api/advertisements/629e379c52d2b491f11703e3

## Ver una vista web con la lista de anuncios: [NodePop](/advertisements)


