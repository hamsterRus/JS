'use strict';

const   modal = document.querySelector('.modal'),
        buttonOpen = document.querySelector('.button--open'),
        buttonClose = document.querySelector('.button--close'),
        modalWrapper = document.querySelector('.modal__wrapper'),
        modalContent = document.querySelector('.modal__content');
/**
 * 
 * @param {*} element - класс елемента из HTML
 * @param {*} animation - назавание анимации
 */
const animateCSS = (element, animation, prefix = 'animate__') =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const node = document.querySelector(element);

    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd() {
      node.classList.remove(`${prefix}animated`, animationName);
      node.removeEventListener('animationend', handleAnimationEnd);

      resolve('Animation ended');
    }

    node.addEventListener('animationend', handleAnimationEnd);
  });

/**
 * открываем модальное окно
 */
function modalOpen() {
    modal.classList.add('modal--open');
    animateCSS('.modal__content', 'zoomIn');
}
/**
 * закрываем модальное окно
 */
async function modalClose() {
    await animateCSS('.modal__content', 'zoomOut');
    modal.classList.remove('modal--open');
}
// отслеживаем нажатие кнопки открытия модального окна
buttonOpen.addEventListener('click', () =>{
    modalOpen();
});
// отслеживаем нажатие кнопки закрытие модального окна
buttonClose.addEventListener('click', () =>{
    modalClose();
});
// отслеживаем нажатие на пустое поле вокруг модального окна
modalWrapper.addEventListener('click', (event) =>{
    if(!event.target.closest('.modal__content')){
        modalClose();
    };
});