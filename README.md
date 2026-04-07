# 🎵 Soundboard JS

Projeto desenvolvido no âmbito da disciplina de Engenharia de Software.  
Curso de Engenharia de Computação Gráfica e Multimédia — ESTG-IPVC  
Ano letivo 2025/2026

---

## Grupo
| Nome | Número |
|------|--------|
| Afonso Manuel Gomes | 34066|git add README.md
| Rodrigo Malheiro | 33103  |
| Rodrigo Vieira | 33445 |

---


## 🌐 Demo ao Vivo
[👉 Abrir Soundboard](https://vieira3030.github.io/2026-ecgm-eds-ab3-soundboard/)

---

## Descrição
Soundboard web desenvolvida em JavaScript puro que permite reproduzir sons com botões, fazer upload de sons personalizados e controlar o volume global. O projeto foi desenvolvido em metodologia ágil com sprints semanais, utilizando GitHub para controlo de versões e gestão de tarefas.

---

## Funcionalidades
- 24 botões com sons pré-definidos organizados em grelha 4x6
- Upload de sons personalizados (.mp3, .wav, .ogg) com validação de formato
- Controlo de volume global via slider
- Feedback visual nos botões durante reprodução (efeito neon)
- Botão "Parar todos" com animação
- Modo escuro / claro com preferência guardada em localStorage
- Nomes dos botões guardados em localStorage
- Interface responsiva

---

## Como instalar localmente
1. Clonar o repositório:
```bash
git clone https://github.com/vieira3030/2026-ecgm-eds-ab3-soundboard.git
```
2. Entrar na pasta:
```bash
cd 2026-ecgm-eds-ab3-soundboard
```
3. Abrir o ficheiro `index.html` no browser ou usar o Live Server no VS Code

---

## Como usar
1. Clica num botão para reproduzir o som correspondente
2. Clica noutro botão para mudar de som — o anterior para automaticamente
3. Para adicionar um som próprio, clica em **Escolher ficheiro** e seleciona um ficheiro .mp3, .wav ou .ogg
4. O som carregado aparece como novo botão na grelha
5. Usa o slider para controlar o volume global
6. Clica em **Parar todos** para parar qualquer som a tocar
7. Clica no 🌙/☀️ para alternar entre modo escuro e claro
8. Faz duplo clique num botão para renomear o som

---

## Desenvolvimento
O projeto foi desenvolvido ao longo de 6 sprints semanais seguindo a metodologia Scrum:

| Sprint | Tema | Período |
|--------|------|---------|
| Sprint 1 | Setup & Fundações | 3 → 10 mar |
| Sprint 2 | Reprodução de Sons | 10 → 17 mar |
| Sprint 3 | Upload de Sons | 17 → 24 mar |
| Sprint 4 | Persistência & UX | 24 → 31 mar |
| Sprint 5 | Testes & Refinamento | 31 mar → 7 abr |
| Sprint 6 | Entrega Final | 7 → 10 abr |

---

## Tecnologias
- HTML5
- CSS3 (Grid, variáveis CSS, animações)
- JavaScript (Web Audio API, FileReader API, localStorage)
- GitHub (controlo de versões, Issues, Pull Requests)
- GitHub Pages (deploy)

---

## Estrutura do Projeto
```
soundboard/
├── index.html          # Estrutura da página
├── style.css           # Estilos e temas
├── script.js           # Lógica de áudio e interação
├── assets/
│   └── sounds/         # Ficheiros de som (.mp3)
└── docs/
    ├── wireframe.png       # Wireframe inicial
    ├── arquitetura.png     # Diagrama de arquitetura
    └── LayoutFinal.png     # Screenshot final
```


---

## Screenshots
![Soundboard](docs/LayoutFinal.png)


---

## Coisas Intressantes!
## 🚀 Destaques Técnicos

- **Sem dependências externas** — o projeto foi desenvolvido 100% em JavaScript 
  puro, sem frameworks ou bibliotecas externas
- **Web Audio API** — utilizada para reprodução de áudio nativa no browser
- **FileReader API** — permite carregar ficheiros locais do utilizador sem necessitar 
  de servidor
- **URL.createObjectURL()** — converte ficheiros locais em URLs temporários para 
  reprodução imediata
- **localStorage** — os nomes dos botões e preferência de tema persistem entre sessões
- **CSS Grid** — a grelha de 24 botões adapta-se automaticamente a qualquer tamanho 
  de ecrã

  ---

  ## 🧠 Desafios e Aprendizagens

- Gerir conflitos de merge entre 3 elementos a trabalhar em simultâneo no mesmo repositório
- Perceber as limitações do browser em relação a ficheiros locais (sem servidor)
- Implementar persistência sem base de dados usando apenas localStorage
- Configurar o GitHub Pages e resolver problemas de deploy
- Trabalhar com metodologia Scrum e sprints semanais pela primeira vez


---