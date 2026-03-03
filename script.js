// Array para guardar todos os sons a tocar
const audioElements = [];

// Função para reproduzir um som
function playSound(audioSrc) {
    const audio = new Audio(audioSrc);
    audioElements.push(audio);
    audio.play();

    // Remove da lista quando o som acabar
    audio.addEventListener('ended', () => {
        const index = audioElements.indexOf(audio);
        audioElements.splice(index, 1);
    });
}

// Função para parar todos os sons
document.getElementById('stop-all').addEventListener('click', () => {
    audioElements.forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
    });
    audioElements.length = 0;
});

// Ligar cada botão a um som
const botoes = document.querySelectorAll('.sound-btn');
botoes.forEach((botao, index) => {
    botao.addEventListener('click', () => {
        playSound(`assets/sounds/som${index + 1}.mp3`);
    });
});