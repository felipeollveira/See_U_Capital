const express = require('express')
const app = express();
const port = process.env.PORT || 3000; // usa variael de ambiente se tiver

app.use(express.static(__dirname + '/public'));


const router = require('./root/router');
app.use('/', router); 

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`); 
});

