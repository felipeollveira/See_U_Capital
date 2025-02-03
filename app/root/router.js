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


module.exports = router; 