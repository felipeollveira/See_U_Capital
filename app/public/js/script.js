// Acesso nos elementos HTML
let btnComecar = document.getElementById('btnComecar');
let termo = document.getElementById('termo');
let formulario = document.getElementById('formulario');

// Aceito dos termos - Acesso as perguntas
btnComecar.addEventListener('click', ()=>{
    termo.classList.add('hiddenBox');           // Adiciona classe para esconder o Termo
    formulario.classList.remove('hidden');      // Remove classe para aparecer o Formulario
<<<<<<< HEAD
    formulario.classList.add('flex');           // Adiciona classe para estruturar lado a lado (peruntas, botões)
    formulario.classList.add('rendaAnimation'); // Adiciona uma animação da pergunta entrando
=======
    formulario.classList.add('formAnimation'); // Adiciona uma animação da pergunta entrando
>>>>>>> front_end
});