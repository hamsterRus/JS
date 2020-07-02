'use strict';

const buttonEl = document.querySelectorAll('.toBasketBtn');
const table = document.querySelector('tbody');
const total = document.querySelector('.total');
const price = document.querySelectorAll('.price');
const basket = document.querySelector('.btn-lg');



let count = 1;

let totalPrice = [];

buttonEl.forEach(button => {
    button.addEventListener('click', event =>{
        console.log(event.target);
        const data = event.target.dataset;
        table.insertAdjacentHTML('beforeend', 
            `<tr>
                <th scope="col">${data.id}</th>
                <th scope="col">${data.name}</th>
                <th scope="col class="price">${data.price}</th>
                <th scope="col">${count}</th>
                <th scope="col"></th>
            </tr>`);
        totalPrice.push(Number(data.price));
    });
});

basket.addEventListener('click', () =>{
    let totalItem = null;
    for (const item of totalPrice) {
        totalItem += item;
    }
    total.textContent = totalItem;
});