// Gestione delle schermate
class Portfolio {
    constructor() {
        this.currentScreen = 'intro';
        this.init();
    }

    init() {
        this.setupIntroScreen();
        this.setupMainScreen();
        this.setupProjectScreen();
        this.createBubbles();
    }

    // Schermata di introduzione
    setupIntroScreen() {
        const enterButton = document.getElementById('enter-button');
        const introVideo = document.getElementById('intro-video');

        // Mostra il pulsante Enter dopo 3 secondi
        setTimeout(() => {
            enterButton.classList.remove('hidden');
        }, 3000);

        enterButton.addEventListener('click', () => {
            this.switchScreen('main');
        });

        // Fallback se il video non si carica
        introVideo.addEventListener('ended', () => {
            enterButton.classList.remove('hidden');
        });
    }

    // Schermata principale con lista lavori
    setupMainScreen() {
        const workLinks = document.querySelectorAll('.works-list a');

        workLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const project = link.dataset.project;
                this.showProject(project);
            });
        });

        // Effetto bolle con movimento del mouse
        this.setupBubbleEffect();
    }

    // Effetto bolle che si deformano
    setupBubbleEffect() {
        const bubblesContainer = document.getElementById('bubbles-container');
        const mainScreen = document.getElementById('main-screen');

        mainScreen.addEventListener('mousemove', (e) => {
            const bubbles = bubblesContainer.querySelectorAll('.bubble');
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            bubbles.forEach(bubble => {
                const bubbleRect = bubble.getBoundingClientRect();
                const bubbleCenterX = bubbleRect.left + bubbleRect.width / 2;
                const bubbleCenterY = bubbleRect.top + bubbleRect.height / 2;

                const distX = mouseX - bubbleCenterX;
                const distY = mouseY - bubbleCenterY;
                const distance = Math.sqrt(distX * distX + distY * distY);

                if (distance < 200) {
                    const force = (200 - distance) / 200;
                    const moveX = (distX / distance) * force * 50;
                    const moveY = (distY / distance) * force * 50;

                    bubble.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px))`;
                } else {
                    bubble.style.transform = 'translate(-50%, -50%)';
                }
            });
        });
    }

    // Crea le bolle che si muovono
    createBubbles() {
        const bubblesContainer = document.getElementById('bubbles-container');
        const bubbleCount = 5;

        for (let i = 0; i < bubbleCount; i++) {
            const bubble = document.createElement('div');
            bubble.className = 'bubble';
            bubble.style.left = Math.random() * 100 + '%';
            bubble.style.top = Math.random() * 100 + '%';
            bubble.style.width = (Math.random() * 150 + 100) + 'px';
            bubble.style.height = bubble.style.width;
            bubblesContainer.appendChild(bubble);
        }
    }

    // Pagina del progetto
    setupProjectScreen() {
        const backButton = document.querySelector('.back-button');
        backButton.addEventListener('click', () => {
            this.switchScreen('main');
        });
    }

    // Mostra il progetto selezionato
    showProject(projectName) {
        const projectTitle = document.getElementById('project-title');
        const projectContent = document.getElementById('project-content');

        const projects = {
            'biblioteca-sospesa': {
                title: 'Biblioteca sospesa',
                content: '<p>Contenuto del progetto "Biblioteca sospesa"</p>'
            },
            'riqualificazione-ospedaliero': {
                title: 'Riqualificazione di un complesso ospedaliero',
                content: '<p>Contenuto del progetto "Riqualificazione di un complesso ospedaliero"</p>'
            },
            'agire-sui-bordi': {
                title: 'Agire sui bordi',
                content: '<p>Contenuto del progetto "Agire sui bordi"</p>'
            },
            'reloading-genova': {
                title: 'ReloadinGenova',
                content: '<p>Contenuto del progetto "ReloadinGenova"</p>'
            }
        };

        const project = projects[projectName];
        projectTitle.textContent = project.title;
        projectContent.innerHTML = project.content;

        this.switchScreen('project');
    }

    // Cambia schermata
    switchScreen(screenName) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });

        switch (screenName) {
            case 'intro':
                document.getElementById('intro-screen').classList.add('active');
                this.currentScreen = 'intro';
                break;
            case 'main':
                document.getElementById('main-screen').classList.add('active');
                this.currentScreen = 'main';
                break;
            case 'project':
                document.getElementById('project-screen').classList.add('active');
                this.currentScreen = 'project';
                break;
        }
    }
}

// Inizializza il portfolio quando il DOM è pronto
document.addEventListener('DOMContentLoaded', () => {
    new Portfolio();
});
