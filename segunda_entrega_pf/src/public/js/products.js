
const socket = io();
const productsContainer = document.getElementById('productsContainer');
let currentPage = 1;

const changePage = (page) => {
    socket.emit('load', { page });
};

document.getElementById('nextPageBtn').addEventListener('click', () => {
    currentPage++;
    changePage(currentPage);
});

document.getElementById('prevPageBtn').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        changePage(currentPage);
    }
});

productsContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('pageBtn')) {
        const pageNumber = parseInt(event.target.dataset.page);
        currentPage = pageNumber;
        changePage(currentPage);
    }
});

socket.emit('load', { page: currentPage });

console.log('Conexión con Socket.io');
socket.on('products', data => {
    const products = data.products;
    productsContainer.innerHTML = '';
    products.forEach(prod => {
        productsContainer.innerHTML += `
            <div class="col">
                <div class="card" style="width: 18rem;">
                    <img src="..." class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${prod.title}</h5>
                        <p class="card-text">${prod.description}</p>
                        <button class="btn btn-primary addToCartBtn" data-product-id="${prod._id}">Agregar al carrito</button>
                    </div>
                </div>
            </div>
        `;
    });
});

productsContainer.addEventListener('click', event => {
    if (event.target.classList.contains('addToCartBtn')) {
        const productId = event.target.dataset.productId;
        socket.emit('addToCart', { productId });
    }
});
