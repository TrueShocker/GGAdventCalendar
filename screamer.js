function playScreamer() {
  const audio = new Audio('audio/screamer.flac');
  audio.play();
}


function createVisualScreamer() {
  const overlay = document.createElement('div');
  overlay.className = 'screamer-overlay';
  const img = document.createElement('img');
  img.src = 'img/screamer.png'; // chemin vers votre image
  img.alt = 'Screamer';
  img.style.width = '100%';
  img.style.height = '100%';
  overlay.appendChild(img);
  document.body.appendChild(overlay);
  // Retirer l'overlay après 3s
  setTimeout(() => {
    overlay.remove();
  }, 3000);
}
