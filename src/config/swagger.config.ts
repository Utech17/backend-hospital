const port = process.env.DATABASE_PORT!;
const apiUrl = process.env.API_URL || 'http://localhost';
const pre = "/api";

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API MEDIPLUS",
      version: "1.0.0",
      description: "Documentación de la API de MEDIPLUS",
    },
    servers: [
      {
        url: `${apiUrl}:${port}${pre}`,
      },
    ],
  },
  basePath: '/api',
  apis: ["src/docs/*.yml"], 
};

export { swaggerOptions }