# Reto Backend Swapi
Integración de la API Swapi con node.js, aws Lambda, DynamoDb

## Instalación

Node.js v16.14.0

Ejecutar los Comandos para Instalar las Dependencias de Node.js

```sh
npm install
```

## Aws Serverless

Despliege en local con Serverless Offline

```sh
npm run start
```

Despliege en Aws

```sh
serverless deploy
```

#### Información de Apis

Obtener Información de de un Personaje de Swapi [GET]

```sh
https://rh9djww5n8.execute-api.us-east-1.amazonaws.com/dev/api/people/:id
```

Guardar Un personaje de Swapi en DynamoDb [POST]

```sh
https://rh9djww5n8.execute-api.us-east-1.amazonaws.com/dev/api/people/submit
```

Obtener Todos los personajes Guardados en el DynamoDb [GET]

```sh
https://rh9djww5n8.execute-api.us-east-1.amazonaws.com/dev/api/people
```

## Swagger

Desplegar en local la Documentación Swagger Open Api con Redoc

```sh
npm run start-oas
```

Validar el Esquema Open Api

```sh
npm run test-oas
```

Para Construir el Esquema Completo Open Api

```sh
npm run build-oas
```

## Pruebas Unitarias

Ejecutar las Pruebas Unitarias (Cucumber)

```sh
npm run test
```
