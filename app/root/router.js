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

router.post('/dashboard', (req, res) => {
  const formData = req.body;

  //console.log('Dados do formulário recebidos:', formData);

  const labels = Object.keys(formData); 
  const valores = Object.values(formData).map(value => Number(value)); 


  res.render('grafico', {
    labels: JSON.stringify(labels),
    valores: JSON.stringify(valores), 
  });
});
  
module.exports = router; 