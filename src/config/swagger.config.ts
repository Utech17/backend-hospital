const port = process.env.API_PORT || 3900;
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
        url: `backend-hospital-skii.onrender.com:${port}${pre}`,
      },
    ],
  },
  basePath: '/api',
  apis: ["src/docs/*.yml"], 
};
export {
    swaggerOptions
}

