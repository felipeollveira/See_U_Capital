// Objeto para armazenar os valores temporariamente
const formData = {};

// Acesso nos elementos HTML
<<<<<<< HEAD
const form = document.getElementById('formulario');
const btnVoltar = document.getElementById('btnVoltar');
const btnProximo = document.getElementById('btnProximo');
const btnEnviar = document.getElementById('btnEnviar'); // Botão para enviar o formulário

// Salvamento temporário de valores do input
form.addEventListener('input', (e) => {
    const { id, value } = e.target;
    formData[id] = value;
    //console.log(formData);
});

// Variável que controla a etapa atual do formulário
let etapaAtual = 0;

// Obtém o número total de etapas
const totalEtapas = document.querySelectorAll('.etapa').length;

// Função para controle de etapas do formulário
function controleEtapas() {
    document.querySelectorAll('.etapa').forEach((etapa, index) => {
        if (index === etapaAtual) {
            etapa.classList.remove('hidden');
            etapa.classList.add('flex');
        } else {
            etapa.classList.add('hidden');
            etapa.classList.remove('flex');
        }
    });

    // Controle de visibilidade dos botões
    if (etapaAtual === totalEtapas - 1) {
        btnProximo.style.display = 'none';
        btnEnviar.style.display = 'flex'; // Exibe o botão "ENVIAR" na última etapa
    } else {
        btnProximo.style.display = 'flex';
        btnEnviar.style.display = 'none'; // Oculta o botão "ENVIAR" nas demais etapas
    }

    if (etapaAtual === 0) {
        btnVoltar.style.display = 'none'; // Oculta o botão "VOLTAR" na primeira etapa
    } else {
        btnVoltar.style.display = 'flex'; // Exibe o botão "VOLTAR" em outras etapas
    }
}

// Evento de avanço no formulário
btnProximo.addEventListener('click', () => {
    const campos = document.querySelectorAll(`.etapa`)[etapaAtual].querySelectorAll('input');
    campos.forEach((campo) => {
        formData[campo.id] = campo.value;
    });

    if (etapaAtual < totalEtapas - 1) {
        etapaAtual++;
        controleEtapas();
    }
});

// Evento de retrocesso no formulário
btnVoltar.addEventListener('click', () => {
    if (etapaAtual > 0) {
        etapaAtual--;
        controleEtapas();
    }
});

// Inicializa o formulário na primeira etapa
controleEtapas();
=======
const form = document.getElementById('formulario'); // Elemento do formulário principal

// Salvamento temporário de valores do input
form.addEventListener('input', (e) => {
    e.preventDefault(); // Evita o comportamento padrão do evento (caso seja envio do formulário)
    const { id, value } = e.target; // Captura o id e o valor do campo de entrada
    formData[id] = value; // Atualiza o objeto `formData` com os valores fornecidos
});

// Função para adicionar novos inputs
function addInput(){
    // Seleciona todos os inputs dentro da div com id "outros"
    const inputs = document.querySelectorAll('#ref-outros input');
    let inputRevealed = false; // Variável para verificar se algum input foi mostrado

    // Procura o primeiro input desabilitado e habilita
    for (let input of inputs){
        if (input.classList.contains('hidden')){
            input.classList.remove('hidden'); // Remove a classe "hidden"
            input.classList.add('inputAnimation'); // Remove a classe "hidden"
            inputRevealed = true; // Indica que um input foi revelado
            break; // Para o loop após exibir um input
        }
    }

    // Verifica se todos os inputs já foram exibidos
    if (!inputRevealed) {
        const inputButton = document.querySelector('#ref-outros button');
        inputButton.disabled = true; // Desabilita o botão quando todos os inputs estiverem visíveis
    }
}
>>>>>>> front_end
