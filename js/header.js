/* js/header.js */
const header = document.createElement('header');
header.innerHTML = `
<nav>
<ul>
<li><a href="/" class="nav-link">Start</a></li>
<li><a href="/home" class="nav-link">Home</a></li>
<li><a href="/short" class="nav-link">Broń krótka</a></li>
<li><a href="/long" class="nav-link">Broń długa</a></li>
<li><a href="/other" class="nav-link">Inne</a></li>
<li><a href="/about" class="nav-link">About us</a></li>
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