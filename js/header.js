// Selecciona el botón del menú móvil y el panel lateral
const mobileButtonEl = document.querySelector('.nav-mobile__button');
const asideEl = document.querySelector('.aside');

// Añade funcionalidad de toggle para mostrar u ocultar el menú lateral en móviles
mobileButtonEl.addEventListener('click', (event) => {
	mobileButtonEl.classList.toggle('open'); // Alterna la clase 'open' para animación visual
	asideEl.classList.toggle('visible'); // Alterna la visibilidad del panel lateral
});
