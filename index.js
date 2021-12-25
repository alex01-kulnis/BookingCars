require('dotenv').config();
const express = require('express');
const router = require('./routes/index');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const PORT = process.env.PORT || 7000;

const app = express();
app.use(express.json());

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'customer API',
      description: 'customer API Information',
      concat: {
        name: 'Developer',
      },
      servers: ['http://localhost:5000'],
    },
  },

  apis: ['index.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api', router);

const start = async () => {
  try {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
