// Som atual a tocar
let audioAtual = null;

// Função para reproduzir um som
function playSound(audioSrc) {
    // Para o som anterior se existir
    if (audioAtual) {
        audioAtual.pause();
        audioAtual.currentTime = 0;
    }

    // Toca o novo som
    audioAtual = new Audio(audioSrc);
    audioAtual.play();
}

// Botão parar todos
document.getElementById('stop-all').addEventListener('click', () => {
    if (audioAtual) {
        audioAtual.pause();
        audioAtual.currentTime = 0;
        audioAtual = null;
    }
});

// Ligar cada botão ao som correspondente
const botoes = document.querySelectorAll('.sound-btn');
botoes.forEach((botao, index) => {
    botao.addEventListener('click', () => {
        playSound(`assets/sounds/som${index + 1}.mp3`);
    });
});