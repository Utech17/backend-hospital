# Nombre de la API
**API IWU**

## Introducción
Esta es una API base que incluye ejemplos de dos tablas utilizando el ORM Sequelize. La programación de esta API está estructurada bajo el modelo de capas, donde cada capa tiene un objetivo específico. Aunque sigue el patrón MVC, tiene más profundidad, dedicando ciertas capas a un fin y haciendo el mantenimiento del código más legible.

### Cómo Ejecutar

**Paso 1:**  
Crea la base de datos en el gestor de tu preferencia (MySQL, PostgreSQL, etc.). El nombre de la base de datos creada debe estar en minúsculas.

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