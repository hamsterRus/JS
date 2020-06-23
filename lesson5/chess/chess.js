'use strict'

const   chessboard = document.querySelector('.chessboard'),
        column = document.querySelector('.column'),
        row = document.querySelector('.row');
// генерирует строку с буквами
function generationChessboard() {
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    letters.forEach((letter) =>{
        let item = document.createElement('div');
        item.classList.add('letter');
        item.textContent = letter;
        column.append(item);
        console.log(item);
    });
// генерирует столбец с цыфрами
    const generationNumber = () => {
        for(let i = 0; i < 8; i++){
            let number = document.createElement('div');
            number.classList.add('number');
            number.textContent = i+1;
            row.append(number);
        }
    }
    generationNumber();

    // генерирует строку с белых ячеек
    const generationUnevenRow = async () => {
        for(let i = 0; i < 4; i++){
            let cellWhite = document.createElement('div');
            cellWhite.classList.add('white');
            await chessboard.append(cellWhite);
            let cellBlack = document.createElement('div');
            cellBlack.classList.add('black');
            await chessboard.append(cellBlack);
        }
    }
    // генерирует строку с черных ячеек
    const generationEvenRow = async () =>{
        for(let i = 0; i < 4; i++){
            let cellBlack = document.createElement('div');
            cellBlack.classList.add('black');
            await chessboard.append(cellBlack);
            let cellWhite = document.createElement('div');
            cellWhite.classList.add('white');
            await chessboard.append(cellWhite);
        }
    }

    // генерирует саму доску
    for(let i = 0; i < 4; i++){
        generationUnevenRow();
        generationEvenRow();
    }
    
}

generationChessboard();
