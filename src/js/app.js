const containerProduct = document.querySelector('.product-item');
const containerShop = document.querySelector('.container-coffee-user');
const shop = document.querySelector('.shop');
const quantityShop = document.querySelector('.quantity');
const empety = document.querySelector('.empty');
const totalProduct = document.querySelector('.price-coffee');
const customer = document.querySelector('.customer');

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

// function rupiah
const rupiah = (number) => {
	return new Intl.NumberFormat('id-ID', {
		style: 'currency',
		currency: 'IDR',
		minimumFractionDigits: 0,
	}).format(number);
};

let dataShop = [];
let quantity = 0;
let total = 0;
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
			<img src="assets/images/${item.img}" alt="${key}" />
		</div>
		<div class="item-information">
			<p>4 Types Avaiaible</p>
			<h4>${item.name}</h4>
		</div>
		<div class="item-price">
			<p>${rupiah(item.price)}</p>
			<div class="item-shop" onclick="addItem(${key})">
				<i class="fa-solid fa-bag-shopping"></i>
			</div>
		</div>
	</div>`;
	});
	containerProduct.innerHTML = cardTag;
}
showProduct();

function addItem(id) {
	const itemShop = product[id];
	const cartItem = dataShop.find((item) => item.id === itemShop.id);
	if (!cartItem) {
		dataShop.push({ ...itemShop, subquantity: 1, subtotal: itemShop.price });
		quantity++;
		total += itemShop.price;
	} else {
		dataShop = dataShop.map((item) => {
			if (item.id !== itemShop.id) {
				return item;
			} else {
				item.subquantity++;
				item.subtotal = item.price * item.subquantity;
				quantity++;
				total += itemShop.price;
				return item;
			}
		});
	}
	reloadItem();
	getForm();
}
quantityShop.classList.add('hidden');
totalProduct.classList.add('hidden');
customer.classList.add('hidden');
empety.textContent = `Card is Empety`;

function reloadItem() {
	let liTag = '';
	dataShop.forEach((item, id) => {
		liTag += `<div class="coffee-user" id="${id}">
								<img src="assets/images/${item.img}" alt="${item.id}" />
								<div class="coffee-detail">
									<p>${item.name}</p>
									<div class="counts">
										<span>${rupiah(product[item.id - 1].price)}</span>&times;
										<button id="remove" onclick="removeValue(${id},${item.id} ,${
			item.subquantity - 1
		})">&minus;</button>
										<span>${item.subquantity}</span>
										<button id="add" onclick="addValue(${id},${item.id} ,${item.subquantity + 1})">&plus;</button>
										&equals;<span>${rupiah(item.subtotal)}</span>
									</div>
								</div>
							</div>`;
	});
	if (dataShop.length === 0) {
		quantityShop.classList.add('hidden');
		totalProduct.classList.add('hidden');
		customer.classList.add('hidden');
		empety.textContent = `Card is Empety`;
	} else {
		quantityShop.classList.remove('hidden');
		totalProduct.classList.remove('hidden');
		customer.classList.remove('hidden');
		empety.textContent = ``;
		quantityShop.innerHTML = `<span>${quantity}</span>`;
		totalProduct.innerHTML = `<p>total : <span>${rupiah(total)}</span></p>`;
	}
	containerShop.innerHTML = liTag;
}

function addValue(key, id, sub) {
	dataShop[key].subquantity = sub;
	dataShop[key].price = sub * product[id - 1].price;
	dataShop[key].subtotal = dataShop[key].price;
	quantity++;
	total += product[id - 1].price;
	reloadItem();
	getForm();
}

function removeValue(key, id, sub) {
	if (sub === 0) {
		dataShop = dataShop.filter((item) => item.id !== id);
		quantity--;
		total -= product[id - 1].price;
	} else if (sub >= 1) {
		dataShop[key].subquantity = sub;
		dataShop[key].price = sub * product[id - 1].price;
		dataShop[key].subtotal = dataShop[key].price;
		quantity--;
		total -= product[id - 1].price;
	}
	if (dataShop.length === 0) {
		quantity = 0;
		total = 0;
	}
	reloadItem();
	getForm();
}

const form = document.getElementById('checkout-form');

function getForm() {
	form.innerHTML = `<input type="hidden" name="items" value='${JSON.stringify(dataShop)}' />
			<input type="hidden" name="total" value="${total}" />
			<div class="customer-input-grub">
					<i class="fa-solid fa-user"></i>
					<input type="text" name="name" autocomplete="off" placeholder="John Anderson" />
			</div>
			<div class="customer-input-grub">
					<i class="fa-solid fa-envelope"></i>
					<input type="email" name="email" autocomplete="off" placeholder="example@gmail.com" />
			</div>
			<div class="customer-input-grub">
					<i class="fa-solid fa-phone"></i>
					<input type="number" name="phone" autocomplete="off" placeholder="0812-3456-7890" />
			</div>`;
}

// form validadtion
const customerBtn = document.querySelector('.customer-btn');

customerBtn.disabled = true;

form.addEventListener('keyup', function () {
	for (let i = 0; i < form.elements.length; i++) {
		if (form.elements[2].value.length !== 0) {
			customerBtn.classList.remove('disabled');
			customerBtn.classList.add('disabled');
		}
		if (form.elements[3].value.length !== 0) {
			customerBtn.classList.remove('disabled');
			customerBtn.classList.add('disabled');
		}
		if (form.elements[4].value.length !== 0) {
			customerBtn.classList.remove('disabled');
			customerBtn.classList.add('disabled');
		}
	}
	customerBtn.disabled = false;
	customerBtn.classList.remove('disabled');
});

customerBtn.addEventListener('click', async function (e) {
	e.preventDefault();
	const formData = new FormData(form);
	const data = new URLSearchParams(formData);
	const objData = Object.fromEntries(data);

	const message = formatMessage(objData);
	window.open('http://wa.me/6282299841605?text=' + encodeURIComponent(message));
});

const formatMessage = (obj) => {
	return `DATA CUSTEMER \nnama: ${obj.name} \nEmail: ${obj.email} \nNo HP: ${
		obj.phone
	}\n \nDATA PESANAN ${JSON.parse(obj.items).map(
		(item, key) =>
			`\n${item.name} (${item.subquantity} x ${rupiah(product[item.id - 1].price)})`
	)}\n \nTOTAL: ${rupiah(obj.total)} \nTerima Kasih
	`;
};

const loves = document.querySelectorAll('.item-love');
// function updatestatus
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

// function untuk menampilkan love in caed product
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
