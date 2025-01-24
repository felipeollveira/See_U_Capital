const express = require('express');
const router = express.Router(); 
const path = require('path');


router.get('/', (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '..', 'public', 'index.html')); 
    } catch (error) {
      console.error('Erro ao renderizar a página:', error); 
      res.status(500).send('Erro Interno do Servidor'); 
    }
});

router.post('/submit', (req, res) => {
  const formData = req.body;

  console.log('Dados do formulário recebidos:', formData);


  const labels = Object.keys(formData); // Pegando as chaves como labels
  const valores = Object.values(formData).map(value => Number(value)); // Pegando os valores numéricos

  // Renderizando a página do gráfico
  res.render('grafico', {
    labels: JSON.stringify(labels), // Enviando labels para o frontend
    valores: JSON.stringify(valores), // Enviando valores para o frontend
  });
});
  
module.exports = router; 