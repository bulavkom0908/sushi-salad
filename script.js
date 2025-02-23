const cart = []
const cartCount = document.getElementById('cart-count')
const cartItems = document.getElementById('cart-items')
const totalPrice = document.getElementById('total-price')
const cartModal = document.getElementById('cart-modal')
const closeCartBtn = document.getElementById('close-cart')
const clearCartBtn = document.getElementById('clear-cart')
const searchInput = document.getElementById('search')
const searchBtn = document.getElementById('search-btn')
const productsContainer = document.getElementById('products')
const categoryButtons = document.querySelectorAll('#categories button') 

const products = [
	{ id: 1, name: 'Рол "Каліфорнія"', price: 200, category: 'Роли',img:'https://odessa.e-boshi.net/wp-content/uploads/2024/12/sushi-dostavka-po-odesi.webp' },
	{ id: 2, name: 'Сет суші "Класичний"', price: 1200, category: 'Сети', img:'https://panda-sushi.com.ua/cache/dish-mobile/img/dishes/sushi/sets/fenshui.jpg?12052024'},
	{ id: 3, name: 'Суші шаурма "Класичний"', price: 300, category: 'Суші шаурма',img:'https://sushiman.kiev.ua/wp-content/uploads/2024/05/077-sushiritto-italiano-s-kopchenim-lososem.jpg' },
	{ id: 4, name: 'Сет суші "Королівський"', price: 2400, category: 'Сети',img:'https://kingpizza.kh.ua/resources/products/20220211101757_728cea0f7d1.jpg' },
	{ id: 5, name: 'Сет суші "Різноманіття"', price: 1300, category: 'Сети', img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR2Y6iVNK5YttB3EGeW7jZaUwStNuPmVFL423cdUFVanKaeCTgiupGVVSooa1P0Oavr9Y&usqp=CAU' },
	{ id: 6, name: 'Суші шаурма "Вегетеріанський"', price: 400,category:'Суші шаурма', img: 'https://cdn-media.choiceqr.com/prod-eat-yoy/menu/oOUKlHL-mCFnWAn-YuztoHq.jpeg' },
	{ id: 7, name: 'Рол "Умаки"', price: 300, category: 'Роли', img:'https://img3.zakaz.ua/upload7db9ac5476c451b306b945ea161bc99a.jpg.350x.jpg' },
	{ id: 8, name: 'Рол смажений "Креветка"', price: 400, category: 'Смажені Роли', img:'https://kosmos.vn.ua/storage/images/bdaa74036dea5f6ea407cf6cf5c3b810.jpg' },
	{ id: 9, name: 'Сет суші "Крафт"', price: 2300, category: 'Сети',img:'https://api.kraftburger.com.ua/uploads/1647984069065.webp'},
	{ id: 10, name: 'Сет суші "Танукі"', price: 1400, category: 'Сети',img:'https://sushi-pizza39.com.ua/image/cache/catalog/photo2024/sushiset/set39-700x700.jpg' },


]


function filterCategory(category) {
	let filteredProducts = []
	console.log(category)
	if (category == 'Всі') {
		return displayProducts(products)
	} else {
		filteredProducts = products.filter(product => product.category === category)
	}

	displayProducts(filteredProducts)
}

function updateCart() {
	cartCount.textContent = cart.length
	cartItems.innerHTML = ''
	let total = 0
	cart.forEach(item => {
		const li = document.createElement('li')
		li.textContent = `${item.name} - ${item.price} грн`
		cartItems.appendChild(li)
		total += item.price
	})
	totalPrice.textContent = total
}

function openCart() {
	cartModal.style.display = 'flex'
}

function closeCart() {
	cartModal.style.display = 'none'
}

function addToCart(id) {
    let result=[]
    result = products.filter(product => product.id === id)[0]
    console.log(result)
	cart.push(result)
	updateCart()
}

function clearCart() {
	cart.length = 0
	updateCart()
	cartModal.style.display = 'none'
}

function filterProducts() {
	const query = searchInput.value.toLowerCase()
	const filteredProducts = products.filter(
		product =>
			product.name.toLowerCase().includes(query) ||
			product.category.toLowerCase().includes(query)
	)
	displayProducts(filteredProducts)
}

function displayProducts(products) {
	productsContainer.innerHTML = ''
	products.forEach(product => {
		const div = document.createElement('div')
		div.classList.add('product-card')
		div.innerHTML = `
        <div class="product-image" style="background-image: url('${product.img}');"></div>
		 <div class="product-info">
            <h3>${product.name}</h3>
            <p>Ціна: ${product.price} грн</p>
            <button onclick="addToCart(${product.id})">Додати в кошик</button>
          </div>
      `
		productsContainer.appendChild(div)
	})
}

displayProducts(products)


document.getElementById('cart-btn').addEventListener('click', openCart)
closeCartBtn.addEventListener('click', closeCart)
clearCartBtn.addEventListener('click', clearCart)


searchBtn.addEventListener('click', filterProducts)
searchInput.addEventListener('input', filterProducts)


categoryButtons.forEach(button => {
	button.addEventListener('click', () => {
		const category = button.textContent.trim()
		filterCategory(category)
	})
})

const checkoutForm = document.getElementById('checkout-form')
const checkoutFormForm = document.getElementById('checkout-form-form')


function showCheckoutForm() {
	if (cart.length === 0) {
		alert('Ваш кошик порожній. Додайте товари перед оформленням замовлення.')
		return
	}
	cartModal.style.display = 'none'
	checkoutForm.classList.remove('hidden')
}


document.getElementById('checkout').addEventListener('click', showCheckoutForm)


checkoutFormForm.addEventListener('submit', function (event) {
	event.preventDefault()

	const name = document.getElementById('name').value
	const phone = document.getElementById('phone').value
	const address = document.getElementById('address').value

	
	if (!name || !phone || !address) {
		alert('Будь ласка, заповніть всі поля форми!')
		return
	}
	
	alert(`Дякуємо за замовлення! Ваше замовлення на суму ${totalPrice.textContent} грн буде доставлено за адресою: ${address}`)
	
	clearCart()
	checkoutForm.classList.add('hidden')
})
