const audioElements = [];

function playSound(audioSrc, btn) { // Adicionamos 'btn' aqui
    const audio = new Audio(audioSrc);
    audioElements.push(audio);
    
    // Ativa o indicador visual
    btn.classList.add('playing');
    
    audio.play();

    audio.addEventListener('ended', () => {
        // Remove o indicador visual quando termina
        btn.classList.remove('playing');
        const index = audioElements.indexOf(audio);
        if (index > -1) audioElements.splice(index, 1);
    });
}

// Ligar cada botão (ajustado para passar o elemento)
const botoes = document.querySelectorAll('.sound-btn');
botoes.forEach((botao, index) => {
    botao.addEventListener('click', () => {
        playSound(`assets/sounds/som${index + 1}.mp3`, botao);
    });
});

// No stop-all, não esqueças de limpar as classes:
document.getElementById('stop-all').addEventListener('click', () => {
    audioElements.forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
    });
    audioElements.length = 0;
    botoes.forEach(b => b.classList.remove('playing')); // Limpa tudo
});