// Objeto para armazenar os valores temporariamente
const formData = {};

// Acesso nos elementos HTML
const form = document.getElementById('formulario'); // Elemento do formulário principal
const btnVoltar = document.getElementById('btnVoltar'); // Botão para voltar às etapas anteriores
const btnProximo = document.getElementById('btnProximo'); // Botão para avançar para a próxima etapa

// Salvamento temporário de valores do input
form.addEventListener('input', (e) => {
    e.preventDefault(); // Evita o comportamento padrão do evento (caso seja envio do formulário)
    const { id, value } = e.target; // Captura o id e o valor do campo de entrada
    formData[id] = value; // Atualiza o objeto `formData` com os valores fornecidos
    console.log(formData); // Exibe o estado atual de `formData` no console
});

// Variável que controla a etapa atual do formulário
let etapaAtual = 0;

// Obtém o número total de etapas (baseado na classe `.etapa`)
const totalEtapas = document.querySelectorAll('.etapa').length;

// Função para controle de etapas do formulário
function controleEtapas() {
    // Seleciona todas as etapas e aplica as classes adequadas para exibição ou ocultação
    document.querySelectorAll('.etapa').forEach((etapa, index) => {
        if (index === etapaAtual) {
            // Exibe a etapa atual
            etapa.classList.remove('absolute', 'hidden', 'voltarAnimation');
            etapa.classList.add('flex');
            etapa.classList.add('proximoAnimation');
        } else if (index < etapaAtual) {
            // Define o estado para as etapas anteriores (ocultadas com animação de volta)
            etapa.classList.add('absolute', 'hidden', 'voltarAnimation');
            etapa.classList.remove('proximoAnimation');
        } else {
            // Define o estado para as etapas posteriores (ocultadas com animação de avanço)
            etapa.classList.add('absolute', 'hidden', 'proximoAnimation');
            etapa.classList.remove('voltarAnimation');
        }
    });
}

// Evento de avanço no formulário
btnProximo.addEventListener('click', () => {
    // Captura todos os inputs da etapa atual
    const campos = document.querySelectorAll(`.etapa`)[etapaAtual].querySelectorAll('input');
    
    // Salva os valores dos campos no objeto `formData`
    campos.forEach((campo) => {
        formData[campo.id] = campo.value;
    });

    // Avança para a próxima etapa se não for a última
    if (etapaAtual < totalEtapas - 1) {
        etapaAtual++; // Incrementa a etapa atual
        controleEtapas(); // Atualiza a interface do formulário
    }
});

// Evento de retrocesso no formulário
btnVoltar.addEventListener('click', () => {
    // Volta para a etapa anterior se não estiver na primeira
    if (etapaAtual > 0) {
        etapaAtual--; // Decrementa a etapa atual
        controleEtapas(); // Atualiza a interface do formulário
    }
});

// Inicializa o formulário na primeira etapa
controleEtapas();
