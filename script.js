document.addEventListener('DOMContentLoaded', function() {
  // Elementi DOM
  const intro = document.getElementById('intro');
  const works = document.getElementById('works');
  const project = document.getElementById('project');
  const enterBtn = document.getElementById('enter-btn');
  const workLinks = document.querySelectorAll('.center-list a');
  const backBtn = document.querySelector('.back-btn');

  // Mostra tasto ENTER dopo 3 secondi
  setTimeout(() => {
    enterBtn.classList.remove('hidden');
  }, 3000);

  // Click su ENTER -> passa a pagina lavori
  enterBtn.addEventListener('click', () => {
    intro.classList.remove('active');
    works.classList.add('active');
    setupBubbleEffect();
  });

  // Setup hover sui lavori
  workLinks.forEach(link => {
    link.addEventListener('mouseenter', (e) => {
      workLinks.forEach(l => l.classList.remove('active'));
      e.currentTarget.classList.add('active');
    });

    link.addEventListener('mouseleave', (e) => {
      e.currentTarget.classList.remove('active');
    });

    link.addEventListener('click', function(e) {
      e.preventDefault();
      const id = this.dataset.id;
      const titolo = this.textContent.trim();
      showProject(id, titolo);
    });
  });

  // Torna indietro dalla pagina progetto
  backBtn.addEventListener('click', function() {
    project.classList.remove('active');
    works.classList.add('active');
  });

  // Effetto Bubble Zoom
  function setupBubbleEffect() {
    const bubbleCanvas = document.getElementById('bubble-canvas');
    bubbleCanvas.innerHTML = ''; // Pulisci canvas

    const bubble = document.createElement('div');
    bubble.style.position = 'fixed';
    bubble.style.borderRadius = '50%';
    bubble.style.background = 'radial-gradient(circle at 30% 30%, rgba(180, 180, 220, 0.25), rgba(150, 150, 200, 0.1) 60%, transparent 100%)';
    bubble.style.width = '250px';
    bubble.style.height = '250px';
    bubble.style.pointerEvents = 'none';
    bubble.style.transition = 'transform 0.25s ease-out';
    bubble.style.transform = 'scale(0.7)';
    bubble.style.filter = 'blur(2px)';
    bubbleCanvas.appendChild(bubble);

    works.addEventListener('mousemove', function(e) {
      bubble.style.left = (e.clientX - 125) + 'px';
      bubble.style.top = (e.clientY - 125) + 'px';
      bubble.style.transform = 'scale(1.25)';
    });

    works.addEventListener('mouseleave', () => {
      bubble.style.transform = 'scale(0.7)';
    });
  }

  // Mostra pagina progetto
  function showProject(id, titolo) {
    works.classList.remove('active');
    project.classList.add('active');

    // Contenuti dei progetti (personalizza come desideri)
    const progetti = {
      biblioteca: {
        titolo: 'Biblioteca sospesa',
        descrizione: `
          <p>Progetto di riqualificazione per la creazione di una biblioteca innovativa.</p>
          <p>Aggiungi qui immagini, descrizioni dettagliate e rendering del tuo progetto.</p>
        `
      },
      ospedale: {
        titolo: 'Riqualificazione di un complesso ospedaliero',
        descrizione: `
          <p>Progetto di riqualificazione e modernizzazione di strutture ospedaliere.</p>
          <p>Aggiungi qui immagini, descrizioni dettagliate e rendering del tuo progetto.</p>
        `
      },
      bordi: {
        titolo: 'Agire sui bordi',
        descrizione: `
          <p>Intervento architettonico sui confini urbani e territoriali.</p>
          <p>Aggiungi qui immagini, descrizioni dettagliate e rendering del tuo progetto.</p>
        `
      },
      reloadingenova: {
        titolo: 'ReloadinGenova',
        descrizione: `
          <p>Progetto di rigenerazione urbana per la città di Genova.</p>
          <p>Aggiungi qui immagini, descrizioni dettagliate e rendering del tuo progetto.</p>
        `
      }
    };

    const prog = progetti[id] || { titolo: titolo, descrizione: '<p>Contenuto da definire</p>' };
    document.getElementById('project-content').innerHTML = `
      <h2>${prog.titolo}</h2>
      ${prog.descrizione}
    `;
  }
});
// Inizializza il portfolio quando il DOM è pronto
document.addEventListener('DOMContentLoaded', () => {
    new Portfolio();
});
