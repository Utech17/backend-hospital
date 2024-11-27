const port = process.env.API_PORT || 3800;
const pre = "/api";
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Mi API",
      version: "1.0.0",
      description: "Documentación de mi API",
    },
    servers: [
      {
        url: `http://localhost:${port}${pre}`,
      },
    ],
  },
  basePath: '/api',
  apis: ["src/routes/*.ts"], 
};
export {
    swaggerOptions
}

