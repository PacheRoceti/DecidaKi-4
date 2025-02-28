document.addEventListener('DOMContentLoaded', function() {
    let voiceActive = false; // Variável para verificar se a leitura está ativada

    // Função para falar o texto
    function speakText(text) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'pt-BR'; // Define o idioma para português
        window.speechSynthesis.speak(utterance);
    }

    // Evento para capturar o texto onde o mouse está posicionado
    document.body.addEventListener('mouseover', function(event) {
        const target = event.target;
        if (voiceActive && (target.tagName === 'P' || target.tagName === 'SPAN' || target.tagName === 'DIV')) {
            window.speechSynthesis.cancel(); // Cancela qualquer fala anterior
            const currentText = target.innerText; // Captura o texto do elemento
            speakText(currentText); // Lê o texto em voz alta
        }
    });

    // Evento de clique no botão para ativar/desativar a leitura em voz alta
    document.getElementById('readButton').addEventListener('click', function() {
        voiceActive = !voiceActive; // Alterna entre ativar e desativar
        if (voiceActive) {
            alert('Leitura em voz alta ativada. Passe o mouse sobre o texto para ouvi-lo.');
            document.getElementById('readButton').textContent = "Desativar Audiodescrição";
        } else {
            alert('Leitura em voz alta desativada.');
            document.getElementById('readButton').textContent = "Ativar Audiodescrição";
            window.speechSynthesis.cancel(); // Cancela qualquer fala em andamento
        }
    });
});
