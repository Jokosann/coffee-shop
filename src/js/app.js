document.addEventListener('alpine:init', () => {
	Alpine.data('products', () => ({
		items: [
			{ id: 0, name: 'Instans Coffee', img: 'product-1.png', price: 15000 },
			{ id: 1, name: 'Black Coffee', img: 'product-2.png', price: 10000 },
			{ id: 2, name: 'Latte', img: 'product-3.png', price: 12000 },
			{ id: 3, name: 'Cappuccino', img: 'product-4.png', price: 15000 },
			{ id: 4, name: 'Expresso', img: 'product-5.png', price: 12000 },
			{ id: 5, name: 'Mocha', img: 'product-6.png', price: 20000 },
		],
	}));

	Alpine.store('cart', {
		items: [],
		total: 0,
		quantity: 0,

		add(newItem) {
			// cek apakah ada barang yang sama atau tidak
			const cartItem = this.items.find((item) => item.id === newItem.id);
			// jika kosong
			if (!cartItem) {
				this.items.push({ ...newItem, quantity: 1, total: newItem.price });
				this.quantity++;
				this.total += newItem.price;
			} else {
				// jika barang ada maka looping untuk melihat apakah barang sama atau tidak
				this.items = this.items.map((item) => {
					// jika barang berbeda
					if (item.id !== newItem.id) {
						return item;
					} else {
						// jika barang sudah ada tambah subtotal dan quanttity
						item.quantity++;
						item.total = item.price * item.quantity;
						this.quantity++;
						this.total += item.price;
						return item;
					}
				});
			}
		},

		remove(id) {
			const cartItem = this.items.find((item) => item.id === id);

			// jika item lebih dari satu
			if (cartItem.quantity > 1) {
				this.items = this.items.map((item) => {
					// jika bukan barang diclick
					if (item.id !== id) {
						return item;
					} else {
						item.quantity--;
						item.total = item.price * item.quantity;
						this.quantity--;
						this.total -= item.price;
						return item;
					}
				});
			} else if (cartItem.quantity === 1) {
				// jika barang sisa satu
				this.items = this.items.filter((item) => item.id !== id);
				this.quantity--;
				this.total -= cartItem.price;
			}
		},
	});
});

// form valiadaton
const customerBtn = document.querySelector('.customer-btn');
const form = document.getElementById('checkout-form');

customerBtn.disabled = true;

form.addEventListener('keyup', function () {
	for (let i = 0; i < form.elements.length; i++) {
		if (form.elements[i].value.length !== 0) {
			customerBtn.classList.remove('disabled');
			customerBtn.classList.add('disabled');
		} else {
			return false;
		}
	}
	customerBtn.disabled = false;
	customerBtn.classList.remove('disabled');
});

// kirim data ketila checkout diclick
customerBtn.addEventListener('click', async function (e) {
	e.preventDefault();
	const formData = new FormData(form);
	const data = new URLSearchParams(formData);
	const objData = Object.fromEntries(data);

	const message = formatMessage(objData);
	window.open('http://wa.me/6282299841605?text=' + encodeURIComponent(message));
});

// format pesan whatsapp
const formatMessage = (obj) => {
	return `Data Custemer
	nama: ${obj.name}
	Email: ${obj.email}
	No HP: ${obj.phone}
	Data Pesanan:  ${JSON.parse(obj.items).map(
		(item) => `${item.name} (${item.quantity} x ${rupiah(item.total)}) \n`
	)}
	TOTAL: ${rupiah(obj.total)}
	Terima Kasih
	`;
};

// conversi dolar
const rupiah = (number) => {
	return new Intl.NumberFormat('id-ID', {
		style: 'currency',
		currency: 'IDR',
		minimumFractionDigits: 0,
	}).format(number);
};
