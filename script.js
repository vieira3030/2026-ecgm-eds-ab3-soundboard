// Som atual a tocar
let audioAtual = null;
let botaoAtual = null;

const botoes = document.querySelectorAll('.sound-btn');

// Função para reproduzir um som
function playSound(audioSrc, btn) {
    // Para o som anterior e remove feedback visual
    if (audioAtual) {
        audioAtual.pause();
        audioAtual.currentTime = 0;
    }
    if (botaoAtual) {
        botaoAtual.classList.remove('playing');
    }

    // Toca o novo som e ativa feedback visual
    audioAtual = new Audio(audioSrc);
    botaoAtual = btn;
    btn.classList.add('playing');
    audioAtual.play();

    // Remove feedback visual quando o som acabar
    audioAtual.addEventListener('ended', () => {
        btn.classList.remove('playing');
        audioAtual = null;
        botaoAtual = null;
    });
}

// Ligar cada botão ao som correspondente
botoes.forEach((botao, index) => {
    botao.addEventListener('click', () => {
        playSound(`assets/sounds/som${index + 1}.mp3`, botao);
    });
});

// Botão parar todos
document.getElementById('stop-all').addEventListener('click', () => {
    if (audioAtual) {
        audioAtual.pause();
        audioAtual.currentTime = 0;
        audioAtual = null;
    }
    if (botaoAtual) {
        botaoAtual.classList.remove('playing');
        botaoAtual = null;
    }
});