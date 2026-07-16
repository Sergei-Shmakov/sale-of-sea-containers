export function initReviews() {
	if (typeof Swiper === 'undefined') return
	new Swiper('.reviews__slider', {
		slidesPerView: 1,
		spaceBetween: 14,
		loop: true,
		autoplay: {
			delay: 4000,
		},
		pagination: { el: '.swiper-pagination', clickable: true },
		breakpoints: { 992: { slidesPerView: 2 } },
	})
}
