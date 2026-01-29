const BASE_URL =
  location.hostname.endsWith('github.io')
    ? '/blog'
    : '';

const postsContainer = document.getElementById('posts');

// Array to hold all fetched posts
let allPosts = [];

// Count of how many categories have finished loading
let categoriesLoaded = 0;
const categories = [
  `${BASE_URL}/wpisy/bron-krotka/meta.json`,
  `${BASE_URL}/wpisy/bron-dluga/meta.json`,
  `${BASE_URL}/wpisy/inne/meta.json`
];

// Load all categories
categories.forEach(path => loadCategory(path));

function loadCategory(path) {
  fetch(path)
    .then(res => {
      if (!res.ok) throw new Error('Nie można załadować ' + path);
      return res.json();
    })
    .then(posts => {
      allPosts = allPosts.concat(posts); // Add posts to the array
      categoriesLoaded++;

      // Once all categories are loaded, sort and render
      if (categoriesLoaded === categories.length) {
        totalPosts = allPosts.length;
        const titleElement = document.getElementById('total-posts');
        if (titleElement) {
          titleElement.textContent = `Liczba wszystkich wpisów: ${totalPosts}`;
}
        renderPosts(allPosts);
      }
    })
    .catch(err => console.error(err));
}

function renderPosts(posts) {
  // Sort posts by 'number' in descending order
  posts.sort((a, b) => b.number - a.number);

  posts.forEach(post => {
    const div = document.createElement('div');
    div.className = 'post-card';
    let thumbnailHTML = '';
    if (post.thumbnail) {
      thumbnailHTML = `<div class="thumb"><img src="${post.thumbnail}" alt="Miniaturka ${post.title}"></div>`;
    }
    div.innerHTML = `
      ${thumbnailHTML}
      <h3>${post.title}</h3>
      <p>Kategoria: ${post.category}</p>
      <p>Wpis #: ${post.number}</p>
      <a href="${BASE_URL}${post.path}">Czytaj więcej</a>
    `;
    postsContainer.appendChild(div);
  });
}








