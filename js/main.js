import { initHeaderMenu } from './header-menu.js';
import { initCatalog } from './catalog.js';
import { initReviews } from './reviews.js';

document.addEventListener('DOMContentLoaded', () => {
	initHeaderMenu();
	initCatalog();
	initReviews();
});
