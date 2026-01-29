const BASE_URL =
  location.hostname.endsWith('github.io')
    ? '/blog'
    : '';

// Kontener dla przypiętych postów
const pinContainer = document.getElementById('pin');

let allPosts = [];
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
    .then(posts => {
      allPosts = allPosts.concat(posts);
      categoriesLoaded++;

      if (categoriesLoaded === categories.length) {
        // Filtrujemy tylko przypięte posty
        const pinnedPosts = allPosts.filter(post => post.pin === 'yes');
        renderPinnedPosts(pinnedPosts);
      }
    })
    .catch(err => console.error(err));
}

function renderPinnedPosts(posts) {
  // Sortujemy wyłącznie po pinOrder w kolejności rosnącej
  posts.sort((a, b) => (a.pinOrder || 0) - (b.pinOrder || 0));

  posts.forEach(post => {
    const div = document.createElement('div');
    div.className = 'post-card';
    div.innerHTML = `
      <h3>${post.title}</h3>
      <p>Kategoria: ${post.category}</p>
      <p>Wpis #: ${post.number}</p>
      <a href="${BASE_URL}/${post.path}">Czytaj więcej</a>
    `;
    pinContainer.appendChild(div);
  });
}
