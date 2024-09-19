Hola! Soy Azul y este es mi projecto para demostrar mis habilidades como software dev!

# Aplicación de Notas

## Descripción

Esta es una aplicación de notas de pila completa construida con el stack MERN (MongoDB, Express, React, Node.js). Cuenta con autenticación de usuarios, creación y gestión de notas con una interfaz moderna y receptiva. El frontend está construido con React y Material-UI, mientras que el backend utiliza Express y MongoDB para el almacenamiento de datos y la autenticación.
Tambien puedes crear tu usuario, acceder a tu cuenta, y salir de ella.
Puedes asumir un rol y acorde a ello las funciones de la app cambiaran.
Si eliges el rol de empleado, por ejemplo, no podras ver las notas ni borrarlas. Tampoco editar los usuarios(Que si podras con el rol de "Admin")

## Características

- **Autenticación de Usuarios:** Inicio de sesión y registro seguros con tokens JWT.
- **Gestión de Notas:** Crear, leer, actualizar y eliminar notas.
- **Diseño Receptivo:** Interfaz moderna con Material-UI y styled-components.
- **Enrutamiento:** React Router para el enrutamiento en el cliente.
- **Gestión de Estado:** Redux para la gestión del estado.

## Tecnologías Utilizadas

### Frontend

- **React**: ^18.3.1
- **Material-UI**: ^6.0.2
- **Styled-Components**: ^6.1.13
- **React Router DOM**: ^6.26.1
- **Redux Toolkit**: ^2.2.7
- **React Testing Library**: ^13.4.0

### Backend

- **Node.js**: ^18.3.1
- **Express**: ^4.19.2
- **MongoDB**: ^6.13.0
- **JWT**: ^9.0.2
- **Bcrypt**: ^5.1.1
- **Mongoose**: ^6.13.0

## Cómo Empezar

Para obtener una copia local y ponerla en funcionamiento, sigue estos pasos:

### Requisitos Previos

- Node.js y npm (Node Package Manager) instalados en tu máquina.

### Instalación

1. **Clona el repositorio:**

   ```bash
   git clone
   ```

2. **Navega al directorio del proyecto:**

   ```bash
   cd notes-app
   ```

3. **Configura el backend:**

   ```bash
   cd server
   npm install
   npm run dev
   ```

4. **Configura el frontend:**

   Abre una nueva ventana o pestaña de terminal y navega al directorio del cliente:

   ```bash
   cd ../client
   npm install
   npm start
   ```

5. **Variables de Entorno**

   Crea un archivo `.env` en el directorio `server` con las siguientes variables de entorno:

   ```plaintext
    NODE_ENV = development
    DATABASE_URI=tu_cadena_de_conexión_mongodb
    ACCESS_TOKEN_SECRET=tu_secreto_jwt
    REFRESH_TOKEN_SECRET=tu_secreto_jwt_refresh
   ```

   Para crear tu access token y tu refresh token, abre la terminal y typea:
   node
   -se abrira la terminal de comandos de node, ahora copy paste:

   > require('crypto').randomBytes(64).toString('hex')
   > esto va a darte un string muy largo, alfanumerico que debes copiar y pegar como enviroment variable (ACCESS_TOKEN_SECRET,REFRESH_TOKEN_SECRET).

## Uso

- **Frontend:** La aplicación se ejecuta en `http://localhost:3000`.
- **Backend:** La API se ejecuta en `http://localhost:3500`.

Puedes interactuar con la aplicación visitando la URL del frontend y utilizando las características proporcionadas.
