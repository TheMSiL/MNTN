// parallax //
window.addEventListener('load', () => {
	const parallax = document.querySelector('.parallax');
	if (parallax) {
		const content = document.querySelector('.parallax_container');
		const clouds = document.querySelector('.img-parallax_item--clouds');
		const mountains = document.querySelector('.img-parallax_item--mountains');
		const human = document.querySelector('.img-parallax_item--human');

		//Coefficients//
		const forClouds = 40;
		const forMountains = 20;
		const forHuman = 10;

		//Speed//
		const speed = 0.05;

		//vars//
		let posX = 0;
		let posY = 0;
		let coordXp = 0;
		let coordYp = 0;

		const setMouseParallaxStyle = () => {
			const distX = coordXp - posX;
			const distY = coordYp - posY;

			posX = posX + distX * speed;
			posY = posY + distY * speed;

			clouds.style.cssText = `transform: translate(${posX / forClouds}%, ${
				posY / forClouds
			}%);`;
			mountains.style.cssText = `transform: translate(${
				posX / forMountains
			}%, ${posY / forMountains}%);`;
			human.style.cssText = `transform: translate(${posX / forHuman}%, ${
				posY / forHuman
			}%);`;

			requestAnimationFrame(setMouseParallaxStyle);
		};

		setMouseParallaxStyle();

		parallax.addEventListener('mousemove', e => {
			//get width and height//
			const parallaxWidth = parallax.offsetWidth;
			const parallaxHeight = parallax.offsetHeight;

			//0 in the middle//
			const coordX = e.pageX - parallaxWidth / 2;
			const coordY = e.pageY - parallaxHeight / 2;

			//get percents//
			coordXp = (coordX / parallaxWidth) * 100;
			coordYp = (coordY / parallaxHeight) * 100;
		});

		//scroll parallax//

		let thresholdSets = [];

		for (let i = 0; i <= 1.0; i += 0.005) {
			thresholdSets.push(i);
		}

		const callback = (entries, observer) => {
			const scrollTopPercent =
				(window.pageYOffset / parallax.offsetHeight) * 100;
			setParallaxItemsStyle(scrollTopPercent);
		};

		const observer = new IntersectionObserver(callback, {
			threshold: thresholdSets,
		});

		observer.observe(document.querySelector('.content'));

		function setParallaxItemsStyle(scrollTopPercent) {
			content.style.cssText = `transform: translate(0%, -${
				scrollTopPercent / 9
			}%);`;
			mountains.parentElement.style.cssText = `transform: translate(0%, -${
				scrollTopPercent / 3
			}%);`;
			human.parentElement.style.cssText = `transform: translate(0%, -${
				scrollTopPercent / 1
			}%);`;
		}
	}
});

// scroll to section //
const scrollToSection = () => {
	const slides = document.querySelectorAll('.slide');
	const progressBarCounter = document.querySelector('.progress-bar_counter');
	const headerHeight = document.querySelector('.header').offsetHeight;

	slides.forEach((item, index) => {
		item.addEventListener('click', event => scrollSection(event, index));
	});

	//scroll to section slider
	function scrollSection(event, index) {
		event.preventDefault();
		const targetId = slides[index].getAttribute('href');
		const targetSection = document.querySelector(targetId);

		const targetPosition =
			targetSection.getBoundingClientRect().top + window.scrollY - headerHeight;

		window.scrollTo({
			top: targetPosition,
			behavior: 'smooth',
		});

		setActiveSlide(index);
		updateProgressBar(index);
	}

	//add .active on click //

	function setActiveSlide(index) {
		const activeSlide = document.querySelector('.slide.active');

		if (activeSlide) {
			activeSlide.classList.remove('active');
		}

		slides[index].classList.add('active');
	}

	//update progress bar on scroll

	function updateProgressBar(index) {
		const progressBarHeight = (index / (slides.length - 1)) * 100 + '%';
		progressBarCounter.style.height = progressBarHeight;
	}

	//add .active on scroll //

	function updateActiveSlideOnScroll() {
		const scrollPosition = window.scrollY;

		slides.forEach((slide, index) => {
			const targetId = slide.getAttribute('href');
			const targetSection = document.querySelector(targetId);
			const targetPosition =
				targetSection.getBoundingClientRect().top + scrollY - headerHeight;

			if (
				targetPosition <= scrollPosition &&
				targetPosition + targetSection.offsetHeight > scrollPosition
			) {
				setActiveSlide(index);
				updateProgressBar(index);
			}
		});
	}

	window.addEventListener('scroll', updateActiveSlideOnScroll);
};

scrollToSection();

// burger menu //

const burgerMenu = () => {
	const burger = document.querySelector('.burger');
	const overlay = document.querySelector('.overlay');

	burger.addEventListener('click', () => {
		burger.classList.toggle('active');
		overlay.style.display = 'flex';

		if (!burger.classList.contains('active')) {
			overlay.style.transform = 'translateY(-100%)';
		} else {
			setTimeout(() => {
				overlay.style.transform = 'translateY(0)';
			}, 0);
		}
	});
};

burgerMenu();
