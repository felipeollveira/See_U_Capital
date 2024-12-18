const express = require('express');
const router = express.Router(); 

router.get('/', (req, res) => {
    try {
        res.send("Olá Mundo!"); 
    } catch (error) {
      console.error('Erro ao renderizar a página:', error); 
      res.status(500).send('Erro Interno do Servidor'); 
    }
});

module.exports = router; 