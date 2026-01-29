const BASE_URL =
  location.hostname.endsWith('github.io')
    ? '/blog'
    : '';

// Kontener dla przypiętych postów
const pinContainer = document.getElementById('pin');

let allPins = [];
let categoriesLoaded = 0;
const categories = [
  `${BASE_URL}/wpisy/bron-krotka/meta.json`,
  `${BASE_URL}/wpisy/bron-dluga/meta.json`,
  `${BASE_URL}/wpisy/inne/meta.json`
];

categories.forEach(path => loadCategory(path));

function loadCategory(path) {
  fetch(path)
    .then(res => {
      if (!res.ok) throw new Error('Nie można załadować ' + path);
      return res.json();
    })
    .then(pins => {
      allPins = allPins.concat(pins);
      categoriesLoaded++;

      if (categoriesLoaded === categories.length) {
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
    div.innerHTML = `
      <h3>${pin.title}</h3>
      <p>Kategoria: ${pin.category}</p>
      <p>Wpis #: ${pin.number}</p>
      <a href="${BASE_URL}/${pin.path}">Czytaj więcej</a>
    `;
    pinContainer.appendChild(div);
  });
}
