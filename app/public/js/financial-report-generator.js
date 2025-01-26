document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formulario');
    const btnEnviar = document.getElementById('btnEnviar');
    const termo = document.getElementById('termo');

    // Cores 
    const chartColors = {
        receitas: 'rgb(54, 162, 235)', // Azul
        outrasfontes: 'rgb(75, 192, 192)', // Verde-água
        despesas: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 206, 86)'] // Vermelho, Azul, Amarelo
    };

    btnEnviar.addEventListener('click', async (e) => {
        e.preventDefault();

        // Limpar área de resultados anterior
        const resultadosAnteriores = document.querySelectorAll('#graficos-financeiros');
        resultadosAnteriores.forEach(el => el.remove());

        // Coletar dados do formulário
        const formData = {
            rendaMensal: parseFloat(document.getElementById('renda-mensal').value),
            outrasfontes: parseFloat(document.getElementById('outras-fontes').value),
            agua: parseFloat(document.getElementById('agua').value),
            luz: parseFloat(document.getElementById('luz').value),
            internet: parseFloat(document.getElementById('internet').value),
            compras: parseFloat(document.getElementById('compras').value),
            exames: parseFloat(document.getElementById('exames').value),
            medicamentos: parseFloat(document.getElementById('medicamentos').value),
            lazer: parseFloat(document.getElementById('lazer').value),
            transporte: parseFloat(document.getElementById('transporte').value)
        };

        // Validação de entrada
        for (const key in formData) {
            if (isNaN(formData[key]) || formData[key] < 0) {
                alert(`Por favor, insira um valor válido para ${key}`);
                return;
            }
        }

        // Calcular totais e identificar 3 principais despesas
        const totalReceita = formData.rendaMensal + formData.outrasfontes;
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
        graficosDiv.style.marginTop = '50px';
        graficosDiv.innerHTML = `
            <h3>Relatório Financeiro</h3>
            <canvas id="grafico-receitas" width="400" height="200"></canvas>
            <canvas id="grafico-despesas" width="400" height="200"></canvas>
        `;
        document.body.appendChild(graficosDiv);

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

        // Aguardar renderização dos gráficos
        await new Promise(resolve => setTimeout(resolve, 500));

           // Gerar PDF
    try {
        const canvas = await html2canvas(graficosDiv, {
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
});
    });

