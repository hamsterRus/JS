'use strict'

const   product = document.querySelector('.product'),
        buttons = document.querySelectorAll('.button');


buttons.forEach((button) => {
    
    const img = button.parentNode.querySelector('.product__img');
    const productText = document.createElement('div');
    productText.textContent = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint maiores vitae rerum voluptas unde, accusamus aut nobis, sed dignissimos illum obcaecati perferendis voluptate! Pariatur similique minus amet dicta reprehenderit. Placeat.';
    button.addEventListener('click', event =>{
        const target = event.target;
        if (target.textContent === "Подробнее"){
            target.textContent = "Отмена";
            img.style.display = 'none';
            img.insertAdjacentElement('beforebegin', productText)
            productText.style.display = '';
        } else if (target.textContent === "Отмена"){
            target.textContent = 'Подробнее';
            img.style.display = '';
            productText.style.display = 'none';
        }
        
    });
});
