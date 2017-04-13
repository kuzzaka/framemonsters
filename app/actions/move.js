const config = require('app/config');

module.exports = (user, board, users) => {
    const { x, y } = getNewCoords(user);

    if (board.is('obstacle', x, y)) {
        return;
    }

    if (board.is('user', x, y)) {
        const enemy = board.getData(x, y);

        user.rating += config.killScore;

        enemy.rating += config.deathScore;
        enemy.cooldown = config.cooldown;
        enemy.kill();
    }

    board.freeCell(user.x, user.y);
    board.placeUser(user, x, y);

    user.action = 'move';
};

function getNewCoords({ x, y, direction }) {
    switch (direction) {
        case 'left':
            x--;
            break;

        case 'right':
            x++;
            break;

        case 'up':
            y--;
            break;

        case 'down':
            y++;
            break;
    }

    return { x, y };
}
