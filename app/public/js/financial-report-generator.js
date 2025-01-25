document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formulario');
    const btnEnviar = document.getElementById('btnEnviar');

    btnEnviar.addEventListener('click', async (e) => {
        e.preventDefault();

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
            transporte: parseFloat(document.getElementById('transporte').value),
            financas: parseFloat(document.getElementById('financas').value)
        };

        // Calcular totais e insights
        const totalReceita = formData.rendaMensal + formData.outrasfontes;
        const totalDespesas = Object.values(formData)
            .filter(valor => !isNaN(valor) && valor !== formData.rendaMensal && valor !== formData.outrasfontes)
            .reduce((total, valor) => total + valor, 0);
        const saldoRestante = totalReceita - totalDespesas;
        const percentualEconomia = (formData.financas / totalReceita) * 100;

        // Criar área de resultados
        const resultadosDiv = document.createElement('div');
        resultadosDiv.innerHTML = `
            <h2>Resumo Financeiro</h2>
            <p>Receita Total: R$ ${totalReceita.toFixed(2)}</p>
            <p>Despesas Totais: R$ ${totalDespesas.toFixed(2)}</p>
            <p>Saldo Restante: R$ ${saldoRestante.toFixed(2)}</p>
            <p>Percentual de Economia: ${percentualEconomia.toFixed(2)}%</p>
        `;

        // Criar área para gráficos
        const graficosDiv = document.createElement('div');
        graficosDiv.innerHTML = `
            <canvas id="grafico-receitas" width="400" height="200"></canvas>
            <canvas id="grafico-despesas" width="400" height="200"></canvas>
        `;
        
        document.body.appendChild(resultadosDiv);
        document.body.appendChild(graficosDiv);

        // Renderizar gráficos (usando Chart.js)
        const ctx1 = document.getElementById('grafico-receitas').getContext('2d');
        new Chart(ctx1, {
            type: 'pie',
            data: {
                labels: ['Renda Principal', 'Outras Fontes'],
                datasets: [{
                    data: [formData.rendaMensal, formData.outrasfontes],
                    backgroundColor: ['#36A2EB', '#FFCE56']
                }]
            }
        });

        const ctx2 = document.getElementById('grafico-despesas').getContext('2d');
        new Chart(ctx2, {
            type: 'bar',
            data: {
                labels: ['Água', 'Luz', 'Internet', 'Compras', 'Exames', 'Medicamentos', 'Lazer', 'Transporte'],
                datasets: [{
                    label: 'Despesas',
                    data: [
                        formData.agua, 
                        formData.luz, 
                        formData.internet, 
                        formData.compras, 
                        formData.exames, 
                        formData.medicamentos, 
                        formData.lazer, 
                        formData.transporte
                    ],
                    backgroundColor: '#FF6384'
                }]
            }
        });

        // Gerar PDF
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF();
        
        pdf.text('Relatório Financeiro', 10, 10);
        pdf.text(`Receita Total: R$ ${totalReceita.toFixed(2)}`, 10, 20);
        pdf.text(`Despesas Totais: R$ ${totalDespesas.toFixed(2)}`, 10, 30);
        pdf.text(`Saldo Restante: R$ ${saldoRestante.toFixed(2)}`, 10, 40);
        pdf.text(`Percentual de Economia: ${percentualEconomia.toFixed(2)}%`, 10, 50);
        
        pdf.save('Relatorio_Financeiro.pdf');
    });
});
