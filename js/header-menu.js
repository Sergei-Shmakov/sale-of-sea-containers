export function initHeaderMenu() {
	const header = document.querySelector('.header');
	const burger = document.getElementById('header-burger');
	const panel = document.getElementById('header-panel');
	const overlay = document.getElementById('header-overlay');
	const desktopMq = window.matchMedia('(min-width: 1024px)');

	if (!header || !burger || !panel) return;

	const panelLinks = panel.querySelectorAll('a');

	function setMenuOpen(open) {
		header.classList.toggle('is-open', open);
		burger.setAttribute('aria-expanded', String(open));
		burger.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
		document.body.classList.toggle('menu-open', open);

		if (overlay) {
			overlay.hidden = !open;
		}
	}

	function closeMenu() {
		setMenuOpen(false);
	}

	function toggleMenu() {
		setMenuOpen(!header.classList.contains('is-open'));
	}

	burger.addEventListener('click', toggleMenu);

	if (overlay) {
		overlay.addEventListener('click', closeMenu);
	}

	panelLinks.forEach((link) => {
		link.addEventListener('click', closeMenu);
	});

	document.addEventListener('keydown', (event) => {
		if (event.key === 'Escape') closeMenu();
	});

	desktopMq.addEventListener('change', (event) => {
		if (event.matches) closeMenu();
	});
}
