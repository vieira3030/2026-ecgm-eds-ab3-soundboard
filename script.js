const reprodutorAudio = new Audio();
let botaoAtual = null;
let volumeGlobal = 1;


let urlsCriados = [];


const grelhaSons = document.getElementById('sound-grid');
const botoes = document.querySelectorAll('.sound-btn');
const inputDeAudio = document.getElementById('upload-input');
const previewEl = document.getElementById('upload-preview');
const previewNome = document.getElementById('preview-nome');
const sliderVolume = document.getElementById('volume-slider');


// ---- Configurações (LocalStorage) ----

function guardarNomesBotoes() {
    const nomes = Array.from(document.querySelectorAll('.sound-btn')).map(btn => btn.textContent);
    localStorage.setItem('soundboard-nomes', JSON.stringify(nomes));
}

function carregarNomesBotoes() {
    const guardado = localStorage.getItem('soundboard-nomes');
    if (!guardado) return;
    
    const nomes = JSON.parse(guardado);
    document.querySelectorAll('.sound-btn').forEach((btn, i) => {
        if (nomes[i]) btn.textContent = nomes[i];
    });
}

document.addEventListener('DOMContentLoaded', carregarNomesBotoes);


// ---- UI & Notificações ----

function mostrarNotificacao(mensagem, tipo = 'erro') {
    const aviso = document.createElement('div');
    aviso.textContent = mensagem;
    aviso.className = `notificacao ${tipo}`;
    document.body.appendChild(aviso);

    setTimeout(() => {
        aviso.style.opacity = '0';
        setTimeout(() => aviso.remove(), 400);
    }, 3000);
}


function mostrarErro(mensagem) {
    mostrarNotificacao(mensagem, 'erro');
}


// ---- Controlo de Áudio ----

if (sliderVolume) {
    // BUG FIX: Sincronizar volume real com o slider ao carregar a página
    volumeGlobal = sliderVolume.value;
    reprodutorAudio.volume = volumeGlobal;

    sliderVolume.addEventListener('input', (e) => {
        volumeGlobal = e.target.value;
        reprodutorAudio.volume = volumeGlobal;
    });
}

function playSound(audioSrc, btn) {
    if (!reprodutorAudio.paused) {
        reprodutorAudio.pause();
    }
    reprodutorAudio.removeAttribute('src');
    reprodutorAudio.load();

    if (botaoAtual) {
        botaoAtual.classList.remove('playing');
    }


    audioAtual = new Audio(audioSrc);
    audioAtual.volume = volumeGlobal;

    reprodutorAudio.src = audioSrc;
    reprodutorAudio.volume = volumeGlobal;

    botaoAtual = btn;
    btn.classList.add('playing');
    
    // Reproduz o som (o catch vazio previne erros visíveis sem usar console.log)
    reprodutorAudio.play().catch(() => {});
}



reprodutorAudio.addEventListener('ended', () => {
    if (botaoAtual) {
        botaoAtual.classList.remove('playing');
        botaoAtual = null;
    }
});

// ---- Interações dos Botões ----

function prepararBotao(botao, audioSrc) {
    botao.addEventListener('click', () => playSound(audioSrc, botao));

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

HEAD
// Evento atualizado: Parar todos + feedback visual (Issue #23)
document.getElementById('stop-all').addEventListener('click', (e) => {
    // 1. Parar o áudio
    if (audioAtual) {
        audioAtual.pause();
        audioAtual.currentTime = 0;
        audioAtual = null;
    }
    botaoAtual = null;

    // 2. Garantir que remove o neon de TODOS os botões
    document.querySelectorAll('.sound-btn').forEach(btn => {
        btn.classList.remove('playing');
    });

    // 3. Feedback visual no próprio botão
    const botaoParar = e.target;
    botaoParar.classList.add('stop-feedback');
    
    setTimeout(() => {
        botaoParar.classList.remove('stop-feedback');
    }, 200);
});

document.getElementById('stop-all').addEventListener('click', (e) => {
    if (!reprodutorAudio.paused) {
        reprodutorAudio.pause();
    }
    reprodutorAudio.removeAttribute('src');
    reprodutorAudio.load();
    botaoAtual = null;

    document.querySelectorAll('.sound-btn').forEach(btn => btn.classList.remove('playing'));

    const botaoParar = e.target;
    botaoParar.classList.add('stop-feedback');
    setTimeout(() => botaoParar.classList.remove('stop-feedback'), 200);
});

// ---- Upload de Sons ----
if (inputDeAudio) {
    inputDeAudio.addEventListener('change', (e) => {
        const ficheiro = e.target.files[0];
        if (!ficheiro) return;

        if (!ficheiro.type.startsWith('audio/')) {
            mostrarNotificacao('Por favor, selecione um ficheiro de áudio válido.', 'erro');
            e.target.value = ''; 
            return;
        }

        previewNome.textContent = `${ficheiro.name.replace(/\.[^/.]+$/, "")} — ${ficheiro.name.split('.').pop().toUpperCase()}`;
        previewEl.classList.add('tem-ficheiro');
        
        const somUrl = URL.createObjectURL(ficheiro);
        urlsCriados.push(somUrl); 
        
        const novoBotao = document.createElement('button');
        novoBotao.className = 'sound-btn';
        novoBotao.textContent = ficheiro.name.replace(/\.[^/.]+$/, "");
        
        prepararBotao(novoBotao, somUrl);
        grelhaSons.appendChild(novoBotao);
        guardarNomesBotoes();
        
        mostrarNotificacao(`✅ "${novoBotao.textContent}" adicionado com sucesso!`, 'sucesso');
        e.target.value = ''; 

        setTimeout(() => {
            previewNome.textContent = 'Nenhum ficheiro selecionado';
            previewEl.classList.remove('tem-ficheiro');
        }, 3000);
    });
}