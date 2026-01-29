/* js/header.js */
const header = document.createElement('header');
header.innerHTML = `
<nav>
<ul>
<li><a href="blog" class="nav-link">BLOG</a></li>
<li><a href="bron-krotka" class="nav-link">Broń krótka</a></li>
<li><a href="bron-dluga" class="nav-link">Broń długa</a></li>
<li><a href="inne" class="nav-link">Inne</a></li>
<li><a href="o-stronie" class="nav-link">O Stronie</a></li>
</ul>
</nav>
`;
document.body.prepend(header);


// Aktywna zakładka
const links = document.querySelectorAll('.nav-link');
links.forEach(link => {
if (link.href === window.location.href || link.href === window.location.pathname) {
link.classList.add('active');
}

});




