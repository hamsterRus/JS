'use strict'


class Images {

    constructor(){
        /* {int} Номер текущего изображения */
        this.currentIdx = 0;

        /* {HTMLDivElement[]} slides элементы слайдов */
        this.slides = [];
    }
    
    /** Получаем все слайды и показываем первый слайд. */
    init() {
        this.slides = document.querySelectorAll('.slider-item');
        this.showImageWithCurrentIdx();
    }

    /** Берем слайд с текущим индексом и убираем у него класс
     * hidden-slide. */
    showImageWithCurrentIdx() {
        this.slides[this.currentIdx].classList.remove('hidden-slide');
    }

    /** Всем слайдам добавляем класс hidden-slide. */
    hideVisibleImages() {
        this.slides.forEach(function (slide) {
            slide.classList.add('hidden-slide');
        });
    }

    /** Переключиться на предыдущее изображение. */
    setNextLeftImage() {
        this.hideVisibleImages();
        if (this.currentIdx == 0) {
            this.currentIdx = this.slides.length - 1;
        } else {
            this.currentIdx--;
        }
        this.showImageWithCurrentIdx();
    }

    /** Переключиться на следующее изображение. */
    setNextRightImage() {
        this.hideVisibleImages();
        if (this.currentIdx == this.slides.length - 1) {
            this.currentIdx = 0;
        } else {
            this.currentIdx++;
        }
        this.showImageWithCurrentIdx();
    }
}