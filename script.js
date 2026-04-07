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
const themeToggle = document.getElementById('theme-toggle');

// ---- Configurações (LocalStorage) ----
/**
 * Guarda os nomes personalizados dos botões no localStorage.
 * Extrai o texto de cada botão de som e o armazena em formato JSON.
 * @function guardarNomesBotoes
 * @returns {void}
 */
function guardarNomesBotoes() {
    const nomes = Array.from(document.querySelectorAll('.sound-btn')).map(btn => btn.textContent);
    localStorage.setItem('soundboard-nomes', JSON.stringify(nomes));
}

/**
 * Carrega e aplica os nomes personalizados dos botões a partir do localStorage.
 * Se não existirem nomes salvos, a função termina sem fazer nada.
 * @function carregarNomesBotoes
 * @returns {void}
 */
function carregarNomesBotoes() {
    const guardado = localStorage.getItem('soundboard-nomes');
    if (!guardado) return;
    
    const nomes = JSON.parse(guardado);
    document.querySelectorAll('.sound-btn').forEach((btn, i) => {
        if (nomes[i]) btn.textContent = nomes[i];
    });
}

// ---- Gestão de Tema ----
/**
 * Aplica o tema visual (claro ou escuro) à página.
 * Também atualiza o localStorage e o ícone do botão de tema.
 * @function aplicarTema
 * @param {string} modo - O modo do tema: 'light' para modo claro ou 'dark' para modo escuro.
 * @returns {void}
 */
function aplicarTema(modo) {
    if (modo === 'light') {
        document.body.classList.add('light-mode');
        localStorage.setItem('soundboard-tema', 'light');
        themeToggle.textContent = '☀️';
    } else {
        document.body.classList.remove('light-mode');
        localStorage.setItem('soundboard-tema', 'dark');
        themeToggle.textContent = '🌙';
    }
}

/**
 * Carrega o tema salvo no localStorage e o aplica à página.
 * Se não houver tema salvo, o padrão é o modo escuro ('dark').
 * @function carregarTema
 * @returns {void}
 */
function carregarTema() {
    const temaSalvo = localStorage.getItem('soundboard-tema') || 'dark';
    aplicarTema(temaSalvo);
}

/**
 * Alterna entre o modo claro e o modo escuro.
 * Se estiver em modo claro, muda para escuro, e vice-versa.
 * @function alternarTema
 * @returns {void}
 */
function alternarTema() {
    const estaEmModoClaro = document.body.classList.contains('light-mode');
    aplicarTema(estaEmModoClaro ? 'dark' : 'light');
}

if (themeToggle) {
    themeToggle.addEventListener('click', alternarTema);
}

document.addEventListener('DOMContentLoaded', () => {
    carregarNomesBotoes();
    carregarTema();
});

// ---- UI & Notificações ----
/**
 * Exibe uma notificação temporária na tela.
 * A notificação desaparece automaticamente após 3 segundos com um efeito de desvanecer.
 * @function mostrarNotificacao
 * @param {string} mensagem - O texto a ser exibido na notificação.
 * @param {string} [tipo='erro'] - O tipo de notificação: 'erro', 'sucesso' ou outro.
 * @returns {void}
 */
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

/**
 * Reproduz um som a partir de uma fonte de áudio.
 * Interrompe qualquer som que esteja sendo reproduzido e atualiza o estado visual do botão.
 * @function playSound
 * @param {string} audioSrc - O caminho ou URL do arquivo de áudio a ser reproduzido.
 * @param {HTMLElement} btn - O elemento do botão associado ao som (para feedback visual).
 * @returns {void}
 */
function playSound(audioSrc, btn) {
    if (!reprodutorAudio.paused) {
        reprodutorAudio.pause();
    }
    reprodutorAudio.removeAttribute('src');
    reprodutorAudio.load();

    if (botaoAtual) {
        botaoAtual.classList.remove('playing');
    }

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
/**
 * Configura os event listeners para um botão de som.
 * Clique simples: reproduz o som. Duplo clique: permite renomear o som.
 * @function prepararBotao
 * @param {HTMLElement} botao - O elemento do botão a ser configurado.
 * @param {string} audioSrc - O caminho ou URL do arquivo de áudio associado.
 * @returns {void}
 */
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
/**
 * Lógica para upload e processamento de arquivos de áudio.
 * Valida o tipo de arquivo, cria uma URL de objeto, adiciona um novo botão à grelha
 * e mostra uma notificação de sucesso. O preview desaparece após 3 segundos.
 * 
 * @event change Disparado quando o utilizador seleciona um arquivo de áudio.
 * @param {Event} e - O evento de mudança do input de arquivo.
 * @returns {void}
 */
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