let audioAtual = null;
let botaoAtual = null;

const grelhaSons = document.getElementById('sound-grid');
const botoes = document.querySelectorAll('.sound-btn');
const inputDeAudio = document.getElementById('upload-input');

function mostrarNotificacao(mensagem, tipo = 'erro') {
    const aviso = document.createElement('div');
    aviso.textContent = mensagem;
    aviso.style.position = 'fixed';
    aviso.style.top = '20px';
    aviso.style.left = '50%';
    aviso.style.transform = 'translateX(-50%)';
    aviso.style.backgroundColor = tipo === 'sucesso' ? '#00c896' : '#e94560';
    aviso.style.color = 'white';
    aviso.style.padding = '15px 30px';
    aviso.style.borderRadius = '10px';
    aviso.style.boxShadow = '0 5px 15px rgba(0,0,0,0.5)';
    aviso.style.fontWeight = 'bold';
    aviso.style.zIndex = '9999';
    aviso.style.transition = 'opacity 0.4s ease';

    document.body.appendChild(aviso);

    setTimeout(() => {
        aviso.style.opacity = '0';
        setTimeout(() => aviso.remove(), 400);
    }, 3000);
}

function mostrarErro(mensagem) {
    mostrarNotificacao(mensagem, 'erro');
}

function playSound(audioSrc, btn) {
    if (audioAtual) {
        audioAtual.pause();
        audioAtual.currentTime = 0;
    }
    if (botaoAtual) {
        botaoAtual.classList.remove('playing');
    }

    audioAtual = new Audio(audioSrc);
    botaoAtual = btn;
    btn.classList.add('playing');
    audioAtual.play();

    audioAtual.addEventListener('ended', () => {
        btn.classList.remove('playing');
        audioAtual = null;
        botaoAtual = null;
    });
}

botoes.forEach((botao, index) => {
    botao.addEventListener('click', () => {
        playSound(`assets/sounds/som${index + 1}.mp3`, botao);
    });
});

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

if (inputDeAudio) {
    inputDeAudio.addEventListener('change', (e) => {
        const ficheiro = e.target.files[0];
        if (!ficheiro) return;

        if (!ficheiro.type.startsWith('audio/')) {
            mostrarErro('Por favor, selecione um ficheiro de áudio válido.');
            e.target.value = ''; 
            return;
        }

        const somUrl = URL.createObjectURL(ficheiro);
        const novoBotao = document.createElement('button');
        
        novoBotao.className = 'sound-btn';
        novoBotao.textContent = ficheiro.name.replace(/\.[^/.]+$/, "");
        
        novoBotao.addEventListener('click', () => playSound(somUrl, novoBotao));

        grelhaSons.appendChild(novoBotao);
        e.target.value = ''; 
        grelhaSons.appendChild(novoBotao);
mostrarNotificacao(`✅ "${novoBotao.textContent}" adicionado com sucesso!`, 'sucesso'); // ← adicionar aqui
e.target.value = '';
    });
}