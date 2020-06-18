'use strict';

/* 1 Написать функцию, преобразующую число в объект. Передавая на вход число в диапазоне [0, 999],
мы должны получить на выходе объект, в котором в соответствующих свойствах описаны разряды числа:
- единицы (в свойстве units)
- десятки (в свойстве tens)
- сотни (в свойстве hundereds)
Например, для числа 45 мы должны получить следующий объект:
{
units: 5, //это единицы
tens: 4, //это десятки
hundreds: 0, //это сотни
}
Если число было передано вне [0, 999] диапазона, не целое число или вообще не число,
необходимо выдать соответствующее сообщение с помощью console.log и вернуть пустой объект.
Вам может пригодиться:

Number.isInteger(value) – функция проверяет, является ли переданное число целым, подробнее здесь
https://mzl.la/2XCVSsx

Math.floor(value) - метод возвращает целое число, которое меньше или равно данному числу (проще
говоря округляет в меньшую сторону), подробнее здесь https://mzl.la/2Qx42SO

Используйте также остаток от деления на 10, например 123 % 10 будет 12.3

Вам также может пригодится делить число на 100 и на 10 */

const number = +prompt('Введите целое число в диапазоне от 0 до 999');
if(isNaN(number)){
    console.log('Вы ввели не число');
} else if(!Number.isInteger(number)){
    console.log('Вы ввели не целое число');
} else if(number < 0 || number > 999) {
    console.log('Введите целое число в диапазоне от 0 до 999');
};
class ConvertsNumberInObject{
    constructor(num){
        this.units = Math.floor(num % 10);
        this.tens = Math.floor((num / 10) % 10);
        this.hundreds = Math.floor((num / 100) % 10);
    }
}
const number1 = new ConvertsNumberInObject(number);
console.log(number1);

/* 1.1
Сделайте в стиле es5, а затем в стиле es6 (по аналогии из урока), конструктор Product, который
принимает параметры name и price, сохраните их как свойства объекта. Также объекты типа Product
должны иметь метод make25PercentDiscount, который будет уменьшать цену в объекте на 25%.
 */
//es5
function Product(name, price){
    this.name = name;
    this.price = price;
}
Product.prototype.make25PercentDiscount = function () {
    this.price = this.price - (this.price / 100 * 25);
};
//es6
class Product {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
    make25PercentDiscount() {
        this.price = this.price - (this.price / 100 * 25);
    }
}
/* 1.2
Сделайте в стиле es5, а затем в стиле es6 (по аналогии из урока),
а) конструктор Post, который принимает параметры author, text, date и сохраняет их как свойства
объекта. Объекты типа Post должны иметь метод edit, который будет принимать текст и записывать
его в свойство text объекта.
б) конструктор AttachedPost, который принимает параметры author, text, date.
Проинициализируйте эти свойства с помощью конструктора Post, чтобы не дублировать код. Также
в конструкторе AttachedPost должно создаваться свойство highlighted со значением false.
Унаследуйте в объектах типа AttachedPost методы из Post.
Объекты типа AttachedPost должны иметь метод makeTextHighlighted, который будет назначать
свойству highlighted значение true. */
//es5
function Post(author, text, date) {
    this.author = author;
    this.text = text;
    this.date = date;
}
Post.prototype.edit = function(text){
    this.text = text;
};
function AttachedPost(author, text, date){
    Post.call(this, author, text, date);
    this.highlighted = false;
}
AttachedPost.prototype = Object.create(Post.prototype);
AttachedPost.prototype.constructor = AttachedPost;
AttachedPost.prototype.makeTextHighlighted = function(){
    this.highlighted = true;
};
//es6
class Post {
    constructor(author, text, date){
        this.author = author;
        this.text = text;
        this.date = date;
    }

    edit(text) {
        this.text = text;
    }
}
class AttachedPost extends Post{
    constructor(author, text, date){
        super(author, text, date);
        this.highlighted = false;
    }
    makeTextHighlighted(){
        this.highlighted = true;
    }
}