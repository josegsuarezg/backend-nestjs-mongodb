<div style="display: flex">
  <p align="center">
    <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
  </p>
  <p align="center">
    <a href="http://mongodb.com/" target="blank"><img src="https://cdn.worldvectorlogo.com/logos/mongodb-icon-1.svg" width="200" alt="MongoDB Logo" /></a>
  </p>
</div>

# BACKEND CON AUTENTIZACIÓN Y AUTORIZACIÓN DE USUARIOS EN NESTJS CON JWT Y MONGODB COMO BASE DE DATOS

1. Clonar el repositorio
   ```
   https://github.com/josegsuarezg/backend-nestjs-mongodb.git
   ```
   
2. Instalar dependencias
    ```
    npm install
    yarn install
    pnpm install
    ```

3. Crear un archivo .env en la raíz del proyecto con las siguientes variables de entorno
    ```
    PORT=3000
    MONGODB_URI=mongodb://localhost:27017/nestjs-mongodb
    JWT_SECRET=secret
    ```

4. Iniciar el servidor
    ```
    npm run start
    yarn start
    pnpm start
    ```
5. Iniciar el servidor en modo desarrollo
    ```
    npm run start:dev
    yarn start:dev
    pnpm start:dev
    ```
6. Iniciar el servidor en modo producción
    ```
    npm run start:prod
    yarn start:prod
    pnpm start:prod
    ```
7. Iniciar el servidor en modo debug
    ```
    npm run start:debug
    yarn start:debug
    pnpm start:debug
    ```
    
## Rutas y Endpoints

### Rutas públicas
- **POST** /auth/login
- **POST** /auth/register

### Rutas privadas
- **GET** /auth/verify-email/:token
- **POST** /auth/forgot-password
- **POST** /auth/reset-password/:token
- **POST** /auth/logout
- **POST** /auth/logout-all
- **GET** /auth/me
- **GET** /auth/user
