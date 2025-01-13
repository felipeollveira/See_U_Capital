let btnComecar = document.getElementById('btnComecar');
let termo = document.getElementById('termo');
let formulario = document.getElementById('formulario');

btnComecar.addEventListener('click', ()=>{
    termo.classList.add('hiddenBox')
    formulario.classList.remove('hidden')
    formulario.classList.add('flex')
    formulario.classList.add('rendaAnimation')
});