# Proyecto MERN

Este proyecto está hecho con stack MERN (MongoDB, Express, React, Node.js) dividido en dos carpetas: `client` y `server`. A continuación, se detallan los pasos para instalar las dependencias y ejecutar ambos entornos.

## Instalación de Dependencias

Para instalar las dependencias necesarias en ambas carpetas (`client` y `server`), navega a cada directorio y ejecuta el comando correspondiente.

### Instalación en `client` y ejecución.

```bash
$ git clone https://github.com/1taru/ing-software-g9.git
$ cd client
$ yarn install
$ yarn dev
```

Una vez hecho esto tendremos inicializada la parte de cliente. Queremos que paralelamente esté corriendo server, por lo que en otra terminal ejecutamos los comandos para instalar e inicializarla.

## Instalación en `server` y ejecución.

```bash
$ cd server
$ yarn install
$ npm start
```

Una vez hecho esto ya podremos hacer utilización de la página en la dirección [http://localhost:5173/](http://localhost:5173/).

## Estructura del Proyecto

### Directorio `client`

- `context/`
  - `userContext.jsx`: Define el contexto del usuario para gestionar la autenticación y los datos del usuario a lo largo de la aplicación.

- `public/`: Contiene los archivos públicos y estáticos que se servirán al cliente.

- `src/`
  - `components/`
    - `Buttons/`: Contiene los componentes que utiliza el inicio para desplegar las opciones disponibles a navegar para cada user dependiendo de su cargo.
    - `Navbar/`: Contiene el componente de la barra superior en la página.
    - `Hero.jsx`: Componente principal de la página de inicio.
  - `helpers/`
    - `Router.jsx`: Configura todas las rutas de la aplicación. Son rutas protegidas que dependiendo de si existe un usuario logeado o no, existirá una distinta renderización de componentes. Adicionalmente existe una ruta única para el administrador que es la del registro.
  - `pages/`
    - `Dashboard.jsx`: Página inicial que muestra las distintas acciones que puede realizar el usuario dependiendo de su cargo. Aquí se utiliza el componente Hero y Buttons.
    - `Login.jsx`: Página de inicio de sesión.
    - `Logout.jsx`: Se encarga del cierre de sesión.
    - `Register.jsx`: Página de registro de nuevos usuarios.

- `App.jsx`: Componente principal de la aplicación.
- `index.css`: Archivo de estilos base.
- `main.jsx`: Punto de entrada de la aplicación React.

### Directorio `server`

- `routes/`: Contiene los archivos de rutas para manejar las peticiones HTTP.
- `controllers/authController.js`: Contiene los endpoints de login, register, logout y getProfile.
- `models/`: Contiene los modelos de datos de MongoDB.
- `helpers/auth.js`: Helper para el register y login para crear y comparar las contraseñas encriptadas.

