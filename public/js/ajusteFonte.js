// Controle de ajuste de fonte genérico
(function () {
    // Variáveis para controle do tamanho da fonte
    let tamanhoFonte = 1; // tamanho inicial em rem
    const tamanhoMax = 1.2; // tamanho máximo em rem
    const tamanhoMin = 0.8; // tamanho mínimo em rem

    // Função para atualizar o tamanho da fonte no documento
    function atualizarFonte() {
        document.documentElement.style.fontSize = tamanhoFonte + 'rem';
    }

    // Função para inicializar os botões de ajuste de fonte
    function inicializarAjusteFonte() {
        const botaoAumentar = document.getElementById("azao");
        const botaoDiminuir = document.getElementById("azinho");

        // Verifica se os botões estão presentes na página
        if (botaoAumentar && botaoDiminuir) {
            botaoAumentar.addEventListener("click", function () {
                if (tamanhoFonte < tamanhoMax) {
                    tamanhoFonte += 0.1; // aumenta em 0.1rem
                    atualizarFonte();
                }
            });

            botaoDiminuir.addEventListener("click", function () {
                if (tamanhoFonte > tamanhoMin) {
                    tamanhoFonte -= 0.1; // diminui em 0.1rem
                    atualizarFonte();
                }
            });
        } else {
            console.warn("Botões de ajuste de fonte não encontrados na página.");
        }
    }

    // Executa a inicialização após o carregamento da página
    document.addEventListener("DOMContentLoaded", inicializarAjusteFonte);
})();
