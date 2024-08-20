const mobileButtonEl = document.querySelector('.nav-mobile__button');
const asideEl = document.querySelector('.aside');
mobileButtonEl.addEventListener('click', (event) => {
	console.log(event);
	mobileButtonEl.classList.toggle('open');
	asideEl.classList.toggle('visible');
});
