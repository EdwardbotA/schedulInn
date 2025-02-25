# SchedulInn

<img src="https://img.shields.io/badge/React-19.0.0-blue" alt="React">
<img src="https://img.shields.io/badge/TypeScript-5.7.2-blue" alt="TypeScript">
<img src="https://img.shields.io/badge/Tailwind_CSS-4.0.7-rebeccapurple" alt="Tailwind CSS">
<img src="https://img.shields.io/badge/Firebase-11.3.1-orange" alt="Firebase">
<img src="https://img.shields.io/badge/Vite-6.1.0-purple" alt="Vite">

<img style="width: 100%; margin-top: 20px" src="./src/assets/schedulInnLogo.png" alt="SchedulInn Logo">

## Descripción del Proyecto

SchedulInn es un sistema de gestión de hoteles que permite a los administradores y usuarios gestionar hoteles y habitaciones de manera sencilla a través de una interfaz web.

## Estructura del Proyecto

- public/
  - schedulInnLogoFav.png
- src/
  - assets/
    - schedulInnLogo.png
  - components/
    - AddHotelForm/
    - AddRoomForm/
    - AdminHotelList/
    - Button/
    - EditHotelForm/
    - EditRoomForm/
    - ErrorMessage/
    - Header/
    - LoginForm/
    - MainTitle/
    - RegisterForm/
  - config/
  - context/
  - interface/
  - pages/
  - services/
  - utils/
  - index.css
  - main.tsx
  - routes.tsx
  - vite-env.d.ts
- .env
- .gitignore
- db.json
- eslint.config.js
- index.html
- package.json
- README.md
- tsconfig.app.json
- tsconfig.json
- tsconfig.node.json
- vite.config.ts


## Tecnologías Utilizadas

- **React**: Biblioteca para construir interfaces de usuario.
- **TypeScript**: Lenguaje de programación que extiende JavaScript.
- **Firebase**: Plataforma para el desarrollo de aplicaciones web y móviles.
- **React Hook Form**: Biblioteca para manejar formularios en React.
- **React Query**: Biblioteca para el manejo de datos asíncronos en React.
- **Tailwind CSS**: Framework de CSS para el diseño de interfaces.
- **Vite**: Herramienta de construcción rápida para proyectos web.
- **EmailJS**: Servicio para enviar correos electrónicos desde aplicaciones web.
- **JSON Server**: Herramienta para crear una API REST falsa.

## Instalación

1. Clona el repositorio:

   ```sh
   git clone https://github.com/tu-usuario/schedulInn.git
   cd schedulInn
   ```

2. Instala las dependencias:

   ```sh
    npm install
   ```

3. Configura las variables de entorno en el archivo .env:
   ```js
   VITE_FIREBASE_API_KEY = your_firebase_api_key;
   VITE_FIREBASE_AUTH_DOMAIN = your_firebase_auth_domain;
   VITE_FIREBASE_PROJECT_ID = your_firebase_project_id;
   VITE_FIREBASE_STORAGE_BUCKET = your_firebase_storage_bucket;
   VITE_FIREBASE_MESSAGING_SENDER_ID = your_firebase_messaging_sender_id;
   VITE_FIREBASE_APP_ID = your_firebase_app_id;
   VITE_SERVICE_ID = your_emailjs_service_id;
   VITE_TEMPLATE_ID = your_emailjs_template_id;
   VITE_PUBLIC_KEY = your_emailjs_public_key;
   ```

## Scripts Disponibles

- npm run dev: Inicia el servidor de desarrollo.
- npm run build: Construye la aplicación para producción.
- npm run lint: Ejecuta ESLint para encontrar y arreglar problemas en el código.
- npm run preview: Previsualiza la aplicación construida.
- npm run server: Inicia el servidor JSON para la API falsa.

## Estructura de Carpetas

- src/components: Contiene los componentes reutilizables de la aplicación.
- src/context: Contiene el contexto global de la aplicación.
- src/interface: Contiene las interfaces TypeScript utilizadas en la aplicación.
- src/pages: Contiene las páginas principales de la aplicación.
- src/services: Contiene los servicios para interactuar con Firebase y otras APIs.
- src/utils: Contiene utilidades y funciones auxiliares.

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo LICENSE para más detalles.
