const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // variável de ambiente, se disponível


const router = require('./root/router');

app.use('/', router); 

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`); 
});

