const express = require('express')
const app = express();
const port = process.env.PORT || 3000; 
const path = require('path');

app.set('views', path.join(__dirname, 'public/pages'));  // Caminho da pasta 'pages'

// Definir o motor de template para EJS
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const router = require('./root/router');
app.use('/', router); 

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`); 
});