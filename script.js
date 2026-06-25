(function () {
	const grid = document.getElementById('catalog-grid');
	const filters = document.querySelector('.catalog__filters');
	const expandBtn = document.getElementById('catalog-expand-btn');
	const emptyState = document.getElementById('catalog-empty');
	const expandBtnText = expandBtn?.querySelector('.catalog__expand-btn-text');

	if (!grid || !filters || !expandBtn) return;

	const cards = Array.from(grid.querySelectorAll('.card'));
	const extraCards = cards.filter((card) => card.classList.contains('card--extra'));

	let currentFilter = 'all';
	let isExpanded = false;

	function cardMatchesFilter(card) {
		const size = card.dataset.size;
		const condition = card.dataset.condition;

		if (currentFilter === '20') return size === '20';
		if (currentFilter === '40') return size === '40';
		if (currentFilter === 'used') return condition === 'used';
		return true;
	}

	function getMatchingCards() {
		return cards.filter(cardMatchesFilter);
	}

	function getHiddenExtraMatches() {
		return extraCards.filter(
			(card) => cardMatchesFilter(card) && !isExpanded
		);
	}

	function applyCatalogView() {
		const matching = getMatchingCards();
		let visibleCount = 0;

		cards.forEach((card) => {
			const matches = cardMatchesFilter(card);
			const isExtra = card.classList.contains('card--extra');
			const isVisible = matches && (!isExtra || isExpanded);

			card.classList.toggle('card--hidden', !isVisible);
			card.setAttribute('aria-hidden', String(!isVisible));

			if (isVisible) visibleCount += 1;
		});

		grid.classList.toggle('is-expanded', isExpanded);

		if (emptyState) {
			emptyState.hidden = visibleCount > 0;
		}

		updateExpandButton();
	}

	function updateFilterButtons(activeBtn) {
		filters.querySelectorAll('[data-filter]').forEach((btn) => {
			const isActive = btn === activeBtn;
			btn.classList.toggle('btn--filter-active', isActive);
			btn.classList.toggle('btn--filter-inactive', !isActive);
			btn.setAttribute('aria-selected', String(isActive));
		});
	}

	function updateExpandButton() {
		const hiddenExtras = getHiddenExtraMatches();
		const hasHiddenExtras = hiddenExtras.length > 0;

		expandBtn.hidden = !hasHiddenExtras && !isExpanded;
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
		updateFilterButtons(btn);
		applyCatalogView();
	});

	expandBtn.addEventListener('click', () => {
		isExpanded = !isExpanded;
		applyCatalogView();
	});

	applyCatalogView();
})();
