document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formulario');
    const btnGrafico = document.getElementById('gerar-grafico');
    const boxGrafico = document.getElementById('box-grafico')
    const graficos = document.getElementById('graficos')

    // Cores 
    const chartColors = {
        receitas: 'rgb(54, 162, 235)', // Azul
        financas: 'rgb(75, 192, 192)', // Verde-água
        despesas: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 206, 86)'] // Vermelho, Azul, Amarelo
    };

    btnGrafico.addEventListener('click', async (e) => {
        e.preventDefault();

        // Limpar área de resultados anterior
        const resultadosAnteriores = document.querySelectorAll('#graficos-financeiros');
        resultadosAnteriores.forEach(el => el.remove());

        // Coletar dados do formulário
        const formData = {
            rendaMensal: parseFloat(document.getElementById('renda-mensal').value),
            agua: parseFloat(document.getElementById('agua').value) || 0,
            luz: parseFloat(document.getElementById('luz').value) || 0,
            internet: parseFloat(document.getElementById('internet').value) || 0,
            gas: parseFloat(document.getElementById('gas').value) || 0,
            compras: parseFloat(document.getElementById('compras').value) || 0,
            exames: parseFloat(document.getElementById('consultas-exames').value) || 0,
            medicamentos: parseFloat(document.getElementById('medicamentos').value) || 0,
            lazer: parseFloat(document.getElementById('viagens-passeios').value) || 0,
            transporte: parseFloat(document.getElementById('transporte').value) || 0,
            financas: parseFloat(document.getElementById('financas').value) || 0,
            outros1: parseFloat(document.getElementById('outros1').value) || 0,
            outros2: parseFloat(document.getElementById('outros2').value) || 0,
            outros3: parseFloat(document.getElementById('outros3').value) || 0,
            outros4: parseFloat(document.getElementById('outros4').value) || 0,
            outros5: parseFloat(document.getElementById('outros5').value) || 0
        };

        // Validação de entrada
        for (const key in formData) {
            if (isNaN(formData[key]) || formData[key] < 0) {
                alert(`Por favor, insira um valor válido para ${key}`);
                return;
            }
        }

        // Calcular totais e identificar 3 principais despesas
        const totalReceita = formData.rendaMensal;
        const despesasArray = [
            { nome: 'Compras', valor: formData.compras },
            { nome: 'Água', valor: formData.agua },
            { nome: 'Luz', valor: formData.luz },
            { nome: 'Internet', valor: formData.internet },
            { nome: 'Exames', valor: formData.exames },
            { nome: 'Medicamentos', valor: formData.medicamentos },
            { nome: 'Lazer', valor: formData.lazer },
            { nome: 'Transporte', valor: formData.transporte }
        ];

        // Ordenar despesas do maior para o menor
        const despesasOrdenadas = despesasArray.sort((a, b) => b.valor - a.valor);
        const tresMaioresDespesas = despesasOrdenadas.slice(0, 3);

        // Criar área para gráficos no final da página
        const graficosDiv = document.createElement('div');
        graficosDiv.id = 'graficos-financeiros';
        
        graficosDiv.innerHTML = `
            <h1 class="text-3xl">Relatório Financeiro</h1>
            <canvas id="grafico-receitas" class="w-[400px] h-[200px] max-sm:w-[350px] max-sm:h-[150px]"></canvas>
            <canvas id="grafico-despesas" class="w-[400px] h-[200px] max-sm:w-[350px] max-sm:h-[150px]"></canvas>
        `;
        graficos.appendChild(graficosDiv);
        boxGrafico.classList.add('flex');
        boxGrafico.classList.remove('hidden');
        form.classList.add('hidden');

        // Renderizar gráfico de pizza
        const ctx1 = document.getElementById('grafico-receitas').getContext('2d');
        new Chart(ctx1, {
            type: 'pie',
            data: {
                labels: [...tresMaioresDespesas.map(d => d.nome), 'Receita Total'],
                datasets: [{
                    data: [...tresMaioresDespesas.map(d => d.valor), totalReceita],
                    backgroundColor: [
                        ...chartColors.despesas.slice(0, tresMaioresDespesas.length),
                        chartColors.receitas
                    ]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Receitas Totais e 3 Maiores Despesas'
                    }
                }
            }
        });

        // Renderizar gráfico de barras
        const ctx2 = document.getElementById('grafico-despesas').getContext('2d');
        new Chart(ctx2, {
            type: 'bar',
            data: {
                labels: [...despesasArray.map(d => d.nome), 'Receita Principal', 'Outras Fontes'],
                datasets: [{
                    label: 'Despesas e Receitas',
                    data: [...despesasArray.map(d => d.valor), formData.rendaMensal, formData.outrasfontes],
                    backgroundColor: [...chartColors.despesas, chartColors.receitas, chartColors.outrasfontes]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Detalhamento de Despesas e Receitas'
                    }
                }
            }
        });

        // // Aguardar renderização dos gráficos
        // await new Promise(resolve => setTimeout(resolve, 500));
    });
});

// Gerar PDF
async function gerarPDF(){
    const graficosFinanceiros = document.getElementById('graficos-financeiros')

    try {
        const canvas = await html2canvas(graficosFinanceiros, {
            scale: 2,
            useCORS: true,
            logging: true // Ative logs para depuração
        });

        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({
            orientation: 'p',
            unit: 'mm',
            format: 'a4'
        });

        const imgWidth = 195; // Largura da imagem no PDF
        const imgHeight = canvas.height * imgWidth / canvas.width; // Altura proporcional
        const imgData = canvas.toDataURL('image/png');

        pdf.addImage(imgData, 'PNG', 7, 10, imgWidth, imgHeight);
        pdf.save('Relatorio_Financeiro.pdf');
    } catch (error) {
        console.error('Erro ao gerar o PDF:', error);
        alert('Ocorreu um erro ao gerar o PDF. Verifique os logs do console.');
    }
 }

function voltarFormulario(){
    const form = document.getElementById('formulario');
    const boxGrafico = document.getElementById('box-grafico')

    boxGrafico.classList.add('hidden');
    form.classList.remove('hidden')
}