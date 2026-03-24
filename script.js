let audioAtual = null;
let botaoAtual = null;
let volumeGlobal = 1; // Variável para controlar o volume master

const grelhaSons = document.getElementById('sound-grid');
const botoes = document.querySelectorAll('.sound-btn');
const inputDeAudio = document.getElementById('upload-input');
const previewEl = document.getElementById('upload-preview');
const previewNome = document.getElementById('preview-nome');
const sliderVolume = document.getElementById('volume-slider');

// ---- Guardar nomes no LocalStorage (Issue #19) ----
function guardarNomesBotoes() {
    const nomes = [];
    document.querySelectorAll('.sound-btn').forEach(btn => {
        nomes.push(btn.textContent);
    });
    localStorage.setItem('soundboard-nomes', JSON.stringify(nomes));
}

function carregarNomesBotoes() {
    const guardado = localStorage.getItem('soundboard-nomes');
    if (!guardado) return;
    const nomes = JSON.parse(guardado);
    const btns = document.querySelectorAll('.sound-btn');
    btns.forEach((btn, i) => {
        if (nomes[i]) btn.textContent = nomes[i];
    });
}

// Carregar ao iniciar
document.addEventListener('DOMContentLoaded', carregarNomesBotoes);

// ---- Notificações ----
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

// ---- Controlo de Volume (Issue #20) ----
if (sliderVolume) {
    sliderVolume.addEventListener('input', (e) => {
        volumeGlobal = e.target.value;
        if (audioAtual) {
            audioAtual.volume = volumeGlobal;
        }
    });
}

// ---- Reprodução de Áudio ----
function playSound(audioSrc, btn) {
    if (audioAtual) {
        audioAtual.pause();
        audioAtual.currentTime = 0;
    }
    if (botaoAtual) {
        botaoAtual.classList.remove('playing');
    }

    audioAtual = new Audio(audioSrc);
    audioAtual.volume = volumeGlobal; // Aplica volume global
    botaoAtual = btn;
    btn.classList.add('playing');
    audioAtual.play();

    audioAtual.addEventListener('ended', () => {
        btn.classList.remove('playing');
        audioAtual = null;
        botaoAtual = null;
    });
}

// Lida com clique (tocar som) e duplo clique (renomear)
function prepararBotao(botao, audioSrc) {
    botao.addEventListener('click', () => {
        playSound(audioSrc, botao);
    });

    botao.addEventListener('dblclick', () => {
        const novoNome = prompt('Introduz o novo nome para este som:', botao.textContent);
        if (novoNome && novoNome.trim() !== '') {
            botao.textContent = novoNome.trim();
            guardarNomesBotoes();
        }
    });
}

botoes.forEach((botao, index) => {
    prepararBotao(botao, `assets/sounds/som${index + 1}.mp3`);
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

// ---- Upload de áudio ----
if (inputDeAudio) {
    inputDeAudio.addEventListener('change', (e) => {
        const ficheiro = e.target.files[0];
        if (!ficheiro) return;

        if (!ficheiro.type.startsWith('audio/')) {
            mostrarErro('Por favor, selecione um ficheiro de áudio válido.');
            e.target.value = ''; 
            return;
        }

        previewNome.textContent = ficheiro.name.replace(/\.[^/.]+$/, "") + ' — ' + ficheiro.name.split('.').pop().toUpperCase();
        previewEl.classList.add('tem-ficheiro');
        
        const somUrl = URL.createObjectURL(ficheiro);
        const novoBotao = document.createElement('button');
        
        novoBotao.className = 'sound-btn';
        novoBotao.textContent = ficheiro.name.replace(/\.[^/.]+$/, "");
        
        prepararBotao(novoBotao, somUrl);

        grelhaSons.appendChild(novoBotao);
        guardarNomesBotoes(); // Atualiza localstorage
        
        mostrarNotificacao(`✅ "${novoBotao.textContent}" adicionado com sucesso!`, 'sucesso');
        e.target.value = ''; 

        setTimeout(() => {
            previewNome.textContent = 'Nenhum ficheiro selecionado';
            previewEl.classList.remove('tem-ficheiro');
        }, 3000);
    });
}