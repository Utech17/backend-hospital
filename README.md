# Nombre de la API
**hospital**

## Introducción
Esta API está diseñada para gestionar un sistema hospitalario. Utiliza el ORM Sequelize para interactuar con la base de datos y sigue un modelo de capas, inspirado en MVC, con una estructura que mejora la legibilidad, el mantenimiento y la escalabilidad.
Actualmente, la API incluye 35 tablas para cubrir diversas funcionalidades y relaciones del sistema.

### Cómo Ejecutar

**Paso 1:**  
Crea la base de datos en el gestor MySQL. El nombre de la base de datos hospital.

**Paso 2:**  
Copia el archivo `.env.example` y pégalo en la raíz del proyecto.

**Paso 3:**  
Renombra el archivo copiado a `.env`.

**Paso 4:**  
Rellena las variables de entorno correspondientes. La variable `DATABASE_NAME` debe tener el mismo valor en minúsculas que el nombre que creaste en el paso 1.

**Paso 5:**  
Instala las dependencias con el comando `npm install`.

**Paso 6:**  
Levanta el servidor con el comando `npm run dev`, que compila el código TypeScript y ejecuta el código JavaScript generado, ya que este es un script combinado.

#### Estructura del Proyecto

/src
  ├── /config       
  ├── /controllers  
  ├── /interfaces   
  ├── /middlewares  
  ├── /models       
  ├── /routes       
  ├── /services     
  ├── /validators 