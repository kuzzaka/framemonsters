const config = require('app/config');

module.exports = (user, board, users) => {
    const { x, y } = user;

    if (!board.isTreasure(x, y)) {
        user.action = 'dig';

        return;
    }

    board.digTreasure(x, y);

    user.rating += config.treasureScore;

    user.action = 'treasure';
};
