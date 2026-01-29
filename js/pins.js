const PINS_BASE_URL =
  location.hostname.endsWith('github.io')
    ? '/blog'
    : '';

// Kontener dla przypiętych postów
const pinContainer = document.getElementById('pin');

// Unikalne zmienne dla pinned posts
let allPins = [];
let pinsLoaded = 0;
const pinsCategories = [
  `${PINS_BASE_URL}/wpisy/bron-krotka/meta.json`,
  `${PINS_BASE_URL}/wpisy/bron-dluga/meta.json`,
  `${PINS_BASE_URL}/wpisy/inne/meta.json`
];

// Ładujemy wszystkie kategorie pinned posts
pinsCategories.forEach(path => loadPinsCategory(path));

function loadPinsCategory(path) {
  fetch(path)
    .then(res => {
      if (!res.ok) throw new Error('Nie można załadować ' + path);
      return res.json();
    })
    .then(pins => {
      allPins = allPins.concat(pins);
      pinsLoaded++;

      if (pinsLoaded === pinsCategories.length) {
        // Filtrujemy tylko przypięte posty
        const pinnedPins = allPins.filter(pin => pin.pin === 'yes');
        renderPins(pinnedPins);
      }
    })
    .catch(err => console.error(err));
}

function renderPins(pins) {
  // Sortujemy wyłącznie po pinOrder w kolejności rosnącej
  pins.sort((a, b) => (a.pinOrder || 0) - (b.pinOrder || 0));

  pins.forEach(pin => {
    const div = document.createElement('div');
    div.className = 'post-card';
    let PinsthumbnailHTML = '';
    if (pins.thumbnail) {
      PinsthumbnailHTML = `<img src="${PINS_BASE_URL}${pins.thumbnail}" alt="Miniaturka ${pins.title}">`;
    }
    div.innerHTML = `
      ${PinsthumbnailHTML}
      <h3>${pin.title}</h3>
      <p>Kategoria: ${pin.category}</p>
      <p>Wpis #: ${pin.number}</p>
      <p></p>
      <a href="${PINS_BASE_URL}/${pin.path}">Czytaj więcej</a>
    `;
    pinContainer.appendChild(div);
  });
}
