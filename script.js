// Correspondances des couleurs avec les jours
const days = [
  { day: 1, color: 'pink' },
  { day: 2, color: 'green' },
  { day: 3, color: 'purple' },
  { day: 4, color: 'yellow' },
  { day: 5, color: 'pink' },
  { day: 6, color: 'green' },
  { day: 7, color: 'purple' },
  { day: 8, color: 'gray' },
  { day: 9, color: 'blue' },
  { day: 10, color: 'yellow' },
  { day: 11, color: 'pink' },
  { day: 12, color: 'gray' },
  { day: 13, color: 'purple' },
  { day: 14, color: 'gray' },
  { day: 15, color: 'yellow' },
  { day: 16, color: 'pink' },
  { day: 17, color: 'green' },
  { day: 18, color: 'yellow' },
  { day: 19, color: 'blue' },
  { day: 20, color: 'green' },
  { day: 21, color: 'pink' },
  { day: 22, color: 'purple' },
  { day: 23, color: 'gray' },
  { day: 24, color: 'red' } // Le dernier jour (spécial)
];


// Fonction pour obtenir la date actuelle
function getCurrentDate() {
  const currentDate = new Date();
  return {
    day: currentDate.getDate(),  // Jour du mois
    month: currentDate.getMonth() + 1  // Mois (0-indexé, donc on ajoute 1)
  };
}

// Fonction pour vérifier l'état de la case dans localStorage
function getStoredState(day) {
  const storedStates = JSON.parse(localStorage.getItem('calendarState')) || {};
  return storedStates[day] || false;  // false si la case n'a pas été retournée
}

// Fonction pour enregistrer l'état de la case dans localStorage
function storeState(day, revealed) {
  const storedStates = JSON.parse(localStorage.getItem('calendarState')) || {};
  storedStates[day] = revealed;
  localStorage.setItem('calendarState', JSON.stringify(storedStates));
}

// Fonction pour générer le calendrier avec la gestion de la date et du stockage
function generateCalendar() {
  const calendarContainer = document.querySelector('.calendar');
  
  // Récupérer la date actuelle
  const currentDate = getCurrentDate();
  const currentDay = currentDate.day;
  const currentMonth = currentDate.month;

  // Mélange les jours pour un placement aléatoire
  const shuffledDays = days.sort(() => Math.random() - 0.5);
  
  shuffledDays.forEach(({ day, color }) => {
    const dayElement = document.createElement('div');
    dayElement.classList.add('day');
    dayElement.setAttribute('data-day', day);
    dayElement.style.backgroundColor = '#d9534f'; // rouge noël
    dayElement.innerText = day; // Affiche le numéro du jour

    // Vérifier si le mois et le jour sont passés ou non
    if (currentMonth < 12 || (currentMonth === 12 && currentDay < day)) {
      dayElement.classList.add('locked'); // Ajoute une classe "verrouillée"
      dayElement.style.cursor = 'not-allowed'; // Change le curseur pour indiquer que l'élément est désactivé
      
      // Ajouter un événement au clic pour afficher un message
      dayElement.addEventListener('click', () => {
        alert("Un peu de patience, ce jour n'est pas encore arrivé !");
      });
    } else {
      // Vérifier si la case a déjà été retournée
      if (getStoredState(day)) {
        // Si elle a été retournée, marquer la case comme révélée
        dayElement.classList.add('revealed');
        dayElement.style.backgroundColor = color; // Affiche la couleur du jour
        dayElement.innerText = '';

        // Si c'est le 24ème jour, afficher l'image du Père Noël
        if (day === 24) {
          const santaImage = document.createElement('img');
          santaImage.src = 'img/santa-head.jpg'; // Correctement le chemin et le format de l'image
          santaImage.alt = 'Père Noël';
          santaImage.style.width = '100%'; // Ajuste la taille de l'image
          santaImage.style.height = 'auto'; // Garde le ratio de l'image
          dayElement.appendChild(santaImage); // Ajoute l'image à la case
        }
      } else {
        // Si la case n'a pas été retournée, ajouter l'événement de clic
        dayElement.addEventListener('click', () => revealDay(dayElement, color, day));
      }
    }

    calendarContainer.appendChild(dayElement);
  });
}

// Fonction pour révéler la couleur ou l'image derrière la case
function revealDay(dayElement, color, day) {
  if (!dayElement.classList.contains('revealed')) {
    dayElement.classList.add('revealed');
    dayElement.innerText = ''; // Supprime le numéro du jour

    // Applique l'animation de rotation sur la case (5 tours)
    dayElement.style.transition = 'transform 2s ease-in-out';
    dayElement.style.transform = 'rotateY(1800deg)'; // 5 tours de rotation

    // Après l'animation, afficher la couleur ou l'image du Père Noël
    setTimeout(() => {
      // Si c'est le 24ème jour, afficher l'image du Père Noël
      if (day === 24) {
        const santaImage = document.createElement('img');
        santaImage.src = 'img/santa-head.jpg'; // Correctement le chemin et le format de l'image
        santaImage.alt = 'Père Noël';
        santaImage.style.width = '100%'; // Ajuste la taille de l'image
        santaImage.style.height = 'auto'; // Garde le ratio de l'image
        dayElement.appendChild(santaImage); // Ajoute l'image à la case
      } else {
        // Sinon, afficher la couleur du jour
        dayElement.style.backgroundColor = color; // Change la couleur de fond
      }

      // Enregistrer l'état de la case dans localStorage
      storeState(day, true);
    }, 2000); // Attendre 2 secondes (la durée de l'animation) avant d'afficher la couleur ou l'image
  }
}

generateCalendar();
