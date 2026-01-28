const BASE_URL = window.location.pathname.split('/')[1]
  ? '/' + window.location.pathname.split('/')[1]
  : '';

const postsContainer = document.getElementById('posts');

loadCategory(`${BASE_URL}/posts/short/meta.json`);
loadCategory(`${BASE_URL}/posts/long/meta.json`);
loadCategory(`${BASE_URL}/posts/other/meta.json`);

function loadCategory(path) {
  fetch(path)
    .then(res => {
      if (!res.ok) throw new Error('Nie można załadować ' + path);
      return res.json();
    })
    .then(posts => renderPosts(posts))
    .catch(err => console.error(err));
}

function renderPosts(posts) {
  posts.forEach(post => {
    const div = document.createElement('div');
    div.className = 'post-card';
    div.innerHTML = `
      <h3>${post.title}</h3>
      <p>Kategoria: ${post.category}</p>
      <a href="${BASE_URL}/${post.path}">Czytaj więcej</a>
    `;
    postsContainer.appendChild(div);
  });
}