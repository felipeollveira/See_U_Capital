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

        const despesasResidenciais = formData.agua + formData.luz + formData.internet + formData.gas + formData.compras;
        const despesasSaude = formData.exames + formData.medicamentos;
        const lazer = formData.lazer;
        const transporte = formData.transporte;
        const economia = formData.financas;
        const outros = formData.outros1 + formData.outros2 + formData.outros3 + formData.outros4 + formData.outros5;

        // // Calcular totais e identificar 3 principais despesas
        // const totalReceita = formData.rendaMensal;
        // const despesasArray = [
        //     { nome: 'Compras', valor: formData.compras },
        //     { nome: 'Água', valor: formData.agua },
        //     { nome: 'Luz', valor: formData.luz },
        //     { nome: 'Internet', valor: formData.internet },
        //     { nome: 'Exames', valor: formData.exames },
        //     { nome: 'Medicamentos', valor: formData.medicamentos },
        //     { nome: 'Lazer', valor: formData.lazer },
        //     { nome: 'Transporte', valor: formData.transporte }
        // ];

        // Ordenar despesas do maior para o menor
        // const despesasOrdenadas = despesasArray.sort((a, b) => b.valor - a.valor);
        // const tresMaioresDespesas = despesasOrdenadas.slice(0, 3);

        // Criar área para gráficos no final da página
        const graficosDiv = document.createElement('div');
        graficosDiv.id = 'graficos-financeiros';
        
        graficosDiv.innerHTML = `
            <canvas id="grafico-receitas" class="w-[400px] h-[200px] max-sm:w-[350px] max-sm:h-[150px]"></canvas>
            <br>
            <br>
            <canvas id="grafico-despesas" class="w-[400px] h-[300px] max-sm:w-[350px] max-sm:h-[150px]"></canvas>
        `;
        graficos.appendChild(graficosDiv);
        boxGrafico.classList.add('flex');
        boxGrafico.classList.remove('hidden');
        form.classList.add('hidden');

        // Gráfico de pizza
        const ctx1 = document.getElementById('grafico-receitas').getContext('2d');
        new Chart(ctx1, {
            type: 'pie',
            data: {
                labels: [`Residencial - R$${despesasResidenciais}`, `Saúde - R$${despesasSaude}`, `Lazer - R$${lazer}`, `Transporte - R$${transporte}`, `Economia - R$${economia}`, `Outros - R$${outros}`],
                datasets: [{
                    data: [despesasResidenciais, despesasSaude, lazer, transporte, economia, outros]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Visão Geral'
                    }
                }
            }
        });

        // Gráfico de barras
        const canvas = document.getElementById('grafico-despesas');
        canvas.width = 500;
        canvas.height = 300;

        const ctx2 = canvas.getContext('2d');
        new Chart(ctx2, {
            type: 'bar',
            data: {
                labels: ['Gráfico Detalhado'],
                datasets: [{
                    label: 'Renda Mensal',
                    data: [formData.rendaMensal],
                }]
            },
            options: {
                responsive: false,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Detalhamento de Despesas e Receitas'
                    }
                }
            }
        });
    });
});

// Função para converter imagem em base64
function getImageAsBase64(imageUrl) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            
            const base64 = canvas.toDataURL('image/jpeg');
            resolve(base64);
        };
        
        img.onerror = () => {
            reject(new Error('Erro ao carregar a imagem'));
        };
        
        img.src = imageUrl;
    });
}

// Função para gerar o PDF
async function gerarPDF() {
    try {
        // Carrega a imagem de fundo
        const backgroundImage = await getImageAsBase64('../imgs/pdf-padrao.png');

        // Captura apenas os gráficos
        const graficosElement = document.getElementById('graficos-financeiros');
        const graficosCanvas = await html2canvas(graficosElement, {
            scale: 2,
            useCORS: true,
            logging: false,
            backgroundColor: 'transparent'
        });

        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });

        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        // Adiciona a imagem de fundo preenchendo toda a página
        pdf.addImage(backgroundImage, 'JPEG', 0, 0, pageWidth, pageHeight);

        // Calcula as dimensões para os gráficos
        const graficosAspectRatio = graficosCanvas.width / graficosCanvas.height;
        const graficosWidth = pageWidth * 0.6;
        const graficosHeight = graficosWidth / graficosAspectRatio;

        // Centraliza os gráficos
        const xOffset = (pageWidth - graficosWidth) / 2;
        const yOffset = pageHeight * 0.15;

        // Adiciona os gráficos como uma camada superior
        const graficosData = graficosCanvas.toDataURL('image/png', 1.0);
        pdf.addImage(graficosData, 'PNG', xOffset, yOffset, graficosWidth, graficosHeight);

        pdf.save('Relatorio_Financeiro_Completo.pdf');
    } catch (error) {
        console.error('Erro ao gerar o PDF:', error);
        alert('Ocorreu um erro ao gerar o PDF. Verifique os logs do console.');
    }
}

// Função para voltar ao formulário
function voltarFormulario() {
    const form = document.getElementById('formulario');
    const boxGrafico = document.getElementById('box-grafico');

    boxGrafico.classList.add('hidden');
    form.classList.remove('hidden');
}