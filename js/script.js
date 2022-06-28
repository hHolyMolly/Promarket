//< " ПОДКЛЮЧЕНИЕ JS КОМПОНЕНТОВ " >=============================================================================================================>//
function dynamicAdaptive() {
	function DynamicAdapt(type) {
		this.type = type;
	}

	DynamicAdapt.prototype.init = function () {
		const _this = this;
		this.оbjects = [];
		this.daClassname = "_dynamic_adapt_";
		this.nodes = document.querySelectorAll("[data-da]");

		for (let i = 0; i < this.nodes.length; i++) {
			const node = this.nodes[i];
			const data = node.dataset.da.trim();
			const dataArray = data.split(",");
			const оbject = {};
			оbject.element = node;
			оbject.parent = node.parentNode;
			оbject.destination = document.querySelector(dataArray[0].trim());
			оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
			оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
			оbject.index = this.indexInParent(оbject.parent, оbject.element);
			this.оbjects.push(оbject);
		}

		this.arraySort(this.оbjects);

		this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
			return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
		}, this);
		this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
			return Array.prototype.indexOf.call(self, item) === index;
		});

		for (let i = 0; i < this.mediaQueries.length; i++) {
			const media = this.mediaQueries[i];
			const mediaSplit = String.prototype.split.call(media, ',');
			const matchMedia = window.matchMedia(mediaSplit[0]);
			const mediaBreakpoint = mediaSplit[1];

			const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
				return item.breakpoint === mediaBreakpoint;
			});
			matchMedia.addListener(function () {
				_this.mediaHandler(matchMedia, оbjectsFilter);
			});
			this.mediaHandler(matchMedia, оbjectsFilter);
		}
	};

	DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
		if (matchMedia.matches) {
			for (let i = 0; i < оbjects.length; i++) {
				const оbject = оbjects[i];
				оbject.index = this.indexInParent(оbject.parent, оbject.element);
				this.moveTo(оbject.place, оbject.element, оbject.destination);
			}
		} else {
			for (let i = 0; i < оbjects.length; i++) {
				const оbject = оbjects[i];
				if (оbject.element.classList.contains(this.daClassname)) {
					this.moveBack(оbject.parent, оbject.element, оbject.index);
				}
			}
		}
	};

	DynamicAdapt.prototype.moveTo = function (place, element, destination) {
		element.classList.add(this.daClassname);
		if (place === 'last' || place >= destination.children.length) {
			destination.insertAdjacentElement('beforeend', element);
			return;
		}
		if (place === 'first') {
			destination.insertAdjacentElement('afterbegin', element);
			return;
		}
		destination.children[place].insertAdjacentElement('beforebegin', element);
	}

	DynamicAdapt.prototype.moveBack = function (parent, element, index) {
		element.classList.remove(this.daClassname);
		if (parent.children[index] !== undefined) {
			parent.children[index].insertAdjacentElement('beforebegin', element);
		} else {
			parent.insertAdjacentElement('beforeend', element);
		}
	}

	DynamicAdapt.prototype.indexInParent = function (parent, element) {
		const array = Array.prototype.slice.call(parent.children);
		return Array.prototype.indexOf.call(array, element);
	};

	DynamicAdapt.prototype.arraySort = function (arr) {
		if (this.type === "min") {
			Array.prototype.sort.call(arr, function (a, b) {
				if (a.breakpoint === b.breakpoint) {
					if (a.place === b.place) {
						return 0;
					}

					if (a.place === "first" || b.place === "last") {
						return -1;
					}

					if (a.place === "last" || b.place === "first") {
						return 1;
					}

					return a.place - b.place;
				}

				return a.breakpoint - b.breakpoint;
			});
		} else {
			Array.prototype.sort.call(arr, function (a, b) {
				if (a.breakpoint === b.breakpoint) {
					if (a.place === b.place) {
						return 0;
					}

					if (a.place === "first" || b.place === "last") {
						return 1;
					}

					if (a.place === "last" || b.place === "first") {
						return -1;
					}

					return b.place - a.place;
				}

				return b.breakpoint - a.breakpoint;
			});
			return;
		}
	};

	const da = new DynamicAdapt("max");
	da.init();

}
dynamicAdaptive(); // ДИНАМИЧЕСКИЙ АДАПТИВ

// function scrollHeader() {
// 	const header = document.querySelector('.header');

// 	const callback = function (entries, observer) {
// 		if (entries[0].isIntersecting) {
// 			header.classList.remove('_scroll');
// 		} else {
// 			header.classList.add('_scroll');
// 		}
// 	};

// 	const headerObserver = new IntersectionObserver(callback);
// 	headerObserver.observe(header);
// }
// scrollHeader(); // ДОБАВЛЕНИЕ ХЕДЕРУ КЛАСС ПРИ СКРОЛЛЕ

// new Swiper(".swiper", {
// 	slidesPerView: 1, // Количество слайдеров
// 	spaceBetween: 15, // Отступ между слайдерами
// 	grabCursor: true, // Курсор перетаскивания
// 	loop: true, // Бесконечная прокрутка
// 	speed: 800, // Скорость прокрутки

// 	autoplay: {
// 		delay: 3500, // Задержка перед автопрокруткой
// 	},

// 	navigation: {
// 		nextEl: ".swiper-button-next", // Кнопка прокрутки вперед
// 		prevEl: ".swiper-button-prev", // Кнопка прокрутки назад
// 	},

// 	breakpoints: {
// 		767.8: {},
// 	}
// });

; // НАСТРОЙКИ СЛАЙДЕРА

// function quantity() {

// 	const counters = document.querySelectorAll('[data-quantity]');

// 	if (counters.length > 0) {
// 		counters.forEach(counter => {

// 			counter.addEventListener("click", function (e) {
// 				const elementTarget = e.target;

// 				if (elementTarget.closest('.counter__btn')) {

// 					let value = parseInt(elementTarget.closest(".counter").querySelector('.counter__input').value);

// 					if (elementTarget.classList.contains("counter__btn_plus")) {
// 						value++;
// 					} else {
// 						--value;
// 					}

// 					if (value <= 1) {
// 						value = 1;
// 						elementTarget.closest(".counter").querySelector(".counter__btn_minus").classList.add("_disabled");
// 					} else {
// 						elementTarget.closest(".counter").querySelector(".counter__btn_minus").classList.remove("_disabled");
// 					}

// 					if (value >= 99) {
// 						value = 99;
// 						elementTarget.closest(".counter").querySelector(".counter__btn_plus").classList.add("_disabled");
// 					} else {
// 						elementTarget.closest(".counter").querySelector(".counter__btn_plus").classList.remove("_disabled");
// 					}

// 					elementTarget.closest(".counter").querySelector(".counter__input").value = value;
// 				}
// 			});
// 		});
// 	}

// };
// quantity(); // СЧЁТЧИКИ

function spoiler() {
	const spoilers = document.querySelectorAll("[data-spoiler]");

	if (spoilers.length > 0) {
		spoilers.forEach(spoiler => {

			spoiler.addEventListener("click", function (e) {
				const elementTarget = e.target;

				if (elementTarget.closest(".spoiler__btn")) {
					elementTarget.closest(".spoiler").querySelector(".spoiler__btn").classList.toggle("_active");
					elementTarget.closest(".spoiler").querySelector(".spoiler__arrow").classList.toggle("_active");
					elementTarget.closest(".spoiler").querySelector(".spoiler__list").classList.toggle("_active");
				}
			});
		});
	}

}
spoiler(); // СПОЙЛЕРЫ

const popupShow = function () {
	const popups = document.querySelectorAll("[data-popup]");
	const body = document.body;

	if (popups.length > 0) {
		popups.forEach(popup => {
			popup.addEventListener("click", function (e) {
				const elementTarget = e.target;

				if (elementTarget.closest(".popup__open")) {
					elementTarget.closest(".popup").querySelector(".popup__wrapper").classList.add("_active");
					body.classList.add("_lock-scroll");
				}

				if (elementTarget.closest(".popup__close") || elementTarget.classList.contains("_active") && !elementTarget.closest(".popup__body")) {
					elementTarget.closest(".popup").querySelector(".popup__wrapper").classList.remove("_active");
					body.classList.remove("_lock-scroll");
				}
			});
		});
	}
}
popupShow(); // ПОПАПЫ

//< " СКРИПТЫ " >=============================================================================================================>//

window.onload = function actionsHeader() {

	function burgerShow() {
		const burgerBtn = document.querySelector(".header-menu__burger");
		const burgerBody = document.querySelector(".header-menu__body");
		const burgerWrapper = document.querySelector(".header-menu__wrapper");
		const body = document.body;

		if (burgerBtn && burgerBody) {
			burgerBtn.addEventListener("click", function () {
				burgerBody.classList.toggle("_active");
				body.classList.toggle("_lock-scroll");
				burgerWrapper.classList.toggle("_active");
			});

			document.addEventListener("click", function (e) {
				const elementTarget = e.target;

				if (elementTarget.closest(".header-menu__wrapper") || elementTarget.closest(".header-menu__close")) {
					burgerBody.classList.remove("_active");
					body.classList.remove("_lock-scroll");
					burgerWrapper.classList.remove("_active");
				}
			});

			document.addEventListener("keyup", function (e) {
				if (e.code === "Escape" && window.innerWidth > 768.2) {
					burgerBody.classList.remove("_active");
					body.classList.remove("_lock-scroll");
					burgerWrapper.classList.remove("_active");
				}
			});
		}
	}
	burgerShow()

	function phoneDropdown() {
		const phoneArrows = document.querySelectorAll(".header-tel-dropdown__arrow");

		if (phoneArrows.length > 0) {
			phoneArrows.forEach(phoneArrow => {

				phoneArrow.addEventListener("click", function () {
					phoneArrow.parentElement.classList.toggle("_active");
				});

				document.addEventListener("click", function (e) {
					const elementTarget = e.target;

					if (!elementTarget.closest(".header-tel-dropdown")) {
						phoneArrow.parentElement.classList.remove("_active");
					}
				});
			});
		}
	}
	phoneDropdown()

	function catalogShow() {
		const catalogBtn = document.querySelector(".header-catalog__btn");
		const body = document.body;

		if (catalogBtn) {
			const catalogBody = document.querySelector(".header-catalog-menu__body");
			const catalogWrapper = document.querySelector(".header-catalog-menu__wrapper");

			catalogBtn.addEventListener("click", function () {
				catalogWrapper.classList.toggle("_active");
				catalogBody.classList.toggle("_active");
				catalogBtn.classList.toggle("_active");

				if (window.innerWidth < 768.2) {
					body.classList.add("_lock-scroll");
				}
			});

			const subCatalogShow = function () {
				const catalogSubItems = document.querySelectorAll(".header-catalog-menu-main__item");
				const catalogSubLists = document.querySelectorAll(".header-catalog-menu-sub__item");
				let catalogName;

				if (catalogSubItems.length > 0) {
					catalogSubItems.forEach(catalogSubItem => {

						if (window.innerWidth > 768.2) {
							catalogSubItem.addEventListener("mouseover", function () {

								catalogSubItems.forEach(catalogSubItem => {
									catalogSubItem.classList.remove("_active");
								});
								this.classList.add("_active");
								catalogName = this.getAttribute('data-catalog');

								function selectSubCatalog(catalogName) {
									catalogSubLists.forEach(catalogSubList => {
										if (catalogSubList.classList.contains(catalogName)) {
											catalogSubList.classList.add("_active");
										} else {
											catalogSubList.classList.remove("_active");
										}
									});
								}
								selectSubCatalog(catalogName)
							});
						} else {
							catalogSubItem.addEventListener("click", function () {

								catalogSubItems.forEach(catalogSubItem => {
									catalogSubItem.classList.remove("_active");
								});
								this.classList.add("_active");
								catalogName = this.getAttribute('data-catalog');

								function selectSubCatalog(catalogName) {
									catalogSubLists.forEach(catalogSubList => {
										if (catalogSubList.classList.contains(catalogName)) {
											catalogSubList.classList.add("_active");
										} else {
											catalogSubList.classList.remove("_active");
										}
									});
								}
								selectSubCatalog(catalogName)
							});
						}
					});
				}
			}
			subCatalogShow()


			document.addEventListener("click", function (e) {
				const elementTarget = e.target;

				if (!elementTarget.closest(".header-catalog") || elementTarget.closest(".header-catalog-menu__wrapper") || elementTarget.closest(".header-catalog-menu__close")) {
					catalogWrapper.classList.remove("_active");
					catalogBody.classList.remove("_active");
					catalogBtn.classList.remove("_active");

					if (window.innerWidth < 768.2) {
						body.classList.remove("_lock-scroll");
					}
				}
			});
		}
	}
	catalogShow()

}