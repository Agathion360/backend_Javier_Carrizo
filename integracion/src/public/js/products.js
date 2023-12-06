const socket = io();
const productsContainer = document.querySelector('.products-container');

socket.emit('load');

console.log('Conexión con Socket.io');
socket.on('products', products => {
    productsContainer.innerHTML = '';
    products.forEach(prod => {
        productsContainer.innerHTML += `
        <tr class="table">
        <th scope="row" class="col mx-6 text-center table2">${prod.id}</th>
        <td class="mx-6 text-left title-product table2">${prod.title}</td>
        <td class="mx-6 text-left description-product table2">${prod.description}</td>
        <th class="mx-6 text-center table2">$ ${prod.price}</th>
        <td class="mx-6 text-center table2">${prod.status}</td>
        <td class="mx-6 text-center table2">${prod.code}</td>
        <td class="mx-6 text-center table2">${prod.stock}</td>
       
    </tr>
        `;
    });
});
