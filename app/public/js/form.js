// Objeto para armazenar os valores temporariamente
const formData = {};

// Acesso nos elementos HTML
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