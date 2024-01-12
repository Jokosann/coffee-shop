const containerProduct = document.querySelector('.product-item');

const product = [
	{ id: 1, name: 'Instans Coffee', img: 'product-1.png', price: 15000, status: 'false' },
	{ id: 2, name: 'Black Coffee', img: 'product-2.png', price: 10000, status: 'false' },
	{ id: 3, name: 'Latte', img: 'product-3.png', price: 12000, status: 'false' },
	{ id: 4, name: 'Cappuccino', img: 'product-4.png', price: 15000, status: 'false' },
	{ id: 5, name: 'Expresso', img: 'product-5.png', price: 12000, status: 'false' },
	{ id: 6, name: 'Mocha', img: 'product-6.png', price: 20000, status: 'false' },
];

// variabel status yang disimpan di JSON
let likes = JSON.parse(localStorage.getItem('love-item')) || [];

function showProduct() {
	let cardTag = '';
	product.forEach((item, key) => {
		cardTag += `<div class="card-item">
		<div class="love-parent">
			<div class="item-love" id="${key}" onclick="updateStatus(this)">
				<i class="fa-regular fa-heart"></i>
			</div>
			<span class="total-love">1.3k</span>
		</div>
		<div class="item-images">
			<img src="/assets/images/${item.img}" alt="${key}" />
		</div>
		<div class="item-information">
			<p>4 Types Avaiaible</p>
			<h4>${item.name}</h4>
		</div>
		<div class="item-price">
			<p>${rupiah(item.price)}</p>
			<div class="item-shop">
				<i class="fa-solid fa-bag-shopping"></i>
			</div>
		</div>
	</div>`;
	});
	containerProduct.innerHTML = cardTag;
}

const rupiah = (number) => {
	return new Intl.NumberFormat('id-ID', {
		style: 'currency',
		currency: 'IDR',
		minimumFractionDigits: 0,
	}).format(number);
};

showProduct();

const loves = document.querySelectorAll('.item-love');

// !function updatestatus
function updateStatus(selectLove) {
	selectLove.classList.toggle('love-active');
	const love = Array.from(selectLove.children)[0];
	love.className = `fa-${
		selectLove.classList.contains('love-active') ? 'solid' : 'regular'
	} fa-heart`;
	let loveId = selectLove.id;
	likes[loveId].status = selectLove.classList.contains('love-active') ? 'true' : 'false';
	localStorage.setItem('love-item', JSON.stringify(likes));
}

// !function untuk menampilkan love in caed product
function showLove() {
	loves.forEach((item, id) => {
		let loveInfo = likes[id] || { status: 'false' }; // Menggunakan nilai default jika informasi love tidak ada di localStorage
		likes[id] = loveInfo; // Menyimpan informasi love ke dalam array likes
		if (loveInfo.status === 'true') {
			item.classList.add('love-active');
			item.innerHTML = `<i class="fa-solid fa-heart"></i>`;
		} else {
			item.classList.remove('love-active');
			item.innerHTML = `<i class="fa-regular fa-heart"></i>`;
		}
	});
}
showLove();
