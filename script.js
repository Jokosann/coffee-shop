const links = document.querySelectorAll('a[href^="#"]');
const shopIcon = document.querySelector('.shop');
const shopCard = document.querySelector('.shop-card');
const shopCardChild = document.querySelector('.shop-card i');
const shopCardContainer = document.querySelector('.shop-card-container');

// add clas overflow to shop-card
shopCard.classList.toggle('overflow', shopCardContainer.offsetHeight > 521);

// menambahkan smooth scrollibg pada semua element yang memiliki targer #href
links.forEach((link) => {
	link.addEventListener('click', function (e) {
		e.preventDefault();
		const targetId = this.getAttribute('href');
		const targetElement = document.querySelector(targetId);
		if (targetElement) {
			targetElement.scrollIntoView({
				behavior: 'smooth',
			});
		}
	});
});

// function shop if click
function shopClick() {
	shopCard.classList.toggle('shop-active');
}

// !eventListener
shopIcon.addEventListener('click', shopClick);
