export function initCatalog() {
	const grid = document.getElementById('catalog-grid');
	const filters = document.querySelector('.catalog__filters');
	const expandBtn = document.getElementById('catalog-expand-btn');
	const emptyState = document.getElementById('catalog-empty');
	const expandBtnText = expandBtn?.querySelector('.catalog__expand-btn-text');

	if (!grid || !filters || !expandBtn) return;

	const cards = [...grid.querySelectorAll('.card')];
	const rowLimits = {
		lg: window.matchMedia('(min-width: 1024px)'),
		sm: window.matchMedia('(min-width: 640px)'),
	};

	let currentFilter = 'all';
	let isExpanded = false;

	function getRowLimit() {
		if (rowLimits.lg.matches) return 4;
		if (rowLimits.sm.matches) return 2;
		return 1;
	}

	function matchesFilter(card) {
		const { size, condition } = card.dataset;

		switch (currentFilter) {
			case '20':
				return size === '20';
			case '40':
				return size === '40';
			case 'used':
				return condition === 'used';
			default:
				return true;
		}
	}

	function getMatchingCards() {
		return cards.filter(matchesFilter);
	}

	function setCardVisible(card, visible) {
		card.classList.toggle('card--hidden', !visible);
		card.toggleAttribute('hidden', !visible);
	}

	function applyCatalogView() {
		const matching = getMatchingCards();
		const rowLimit = getRowLimit();
		const visibleIds = new Set();

		if (isExpanded) {
			matching.forEach((card) => visibleIds.add(card));
		} else {
			matching.slice(0, rowLimit).forEach((card) => visibleIds.add(card));
		}

		cards.forEach((card) => setCardVisible(card, visibleIds.has(card)));

		grid.classList.toggle('is-expanded', isExpanded);

		if (emptyState) {
			emptyState.hidden = matching.length > 0;
		}

		updateExpandButton(matching.length, rowLimit);
	}

	function setActiveFilter(activeBtn) {
		filters.querySelectorAll('[data-filter]').forEach((btn) => {
			const isActive = btn === activeBtn;
			btn.classList.toggle('btn--filter-active', isActive);
			btn.classList.toggle('btn--filter-inactive', !isActive);
			btn.setAttribute('aria-selected', String(isActive));
		});
	}

	function updateExpandButton(matchingCount, rowLimit) {
		const hasMore = matchingCount > rowLimit;

		expandBtn.hidden = !hasMore && !isExpanded;
		expandBtn.setAttribute('aria-expanded', String(isExpanded));

		if (expandBtnText) {
			expandBtnText.textContent = isExpanded
				? 'Свернуть каталог'
				: 'Смотреть весь каталог и цены';
		}
	}

	filters.addEventListener('click', (event) => {
		const btn = event.target.closest('[data-filter]');
		if (!btn) return;

		currentFilter = btn.dataset.filter;
		setActiveFilter(btn);
		applyCatalogView();
	});

	expandBtn.addEventListener('click', () => {
		isExpanded = !isExpanded;
		applyCatalogView();
	});

	Object.values(rowLimits).forEach((mq) => {
		mq.addEventListener('change', applyCatalogView);
	});

	applyCatalogView();
}
