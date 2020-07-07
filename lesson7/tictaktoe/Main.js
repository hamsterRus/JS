window.addEventListener('load', () =>{
    const board = new Board;
    const game = new Game;
    const status = new Status;

    board.init(game);
    game.init(status, board);

    board.renderMap();
    game.initEventHandlers();
});