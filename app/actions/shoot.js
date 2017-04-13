const config = require('app/config');

module.exports = (user, board, users) => {
    user.action = 'shoot';

    const shot = getShotCell(user);

    if (!board.is('user', shot.x, shot.y)) {
        return;
    }

    const enemy = board.getData(shot.x, shot.y);

    user.rating += config.killScore;

    enemy.rating += config.deathScore;
    enemy.cooldown = config.cooldown;

    board.freeCell(enemy.x, enemy.y);

    enemy.kill();
};

function getShotCell({ x, y, direction }) {
    const shift = {
        x: 0,
        y: 0
    }

    switch (direction) {
        case 'left':
            shift.x = -1;
            break;

        case 'right':
            shift.x = 1;
            break;

        case 'up':
            shift.y = -1;
            break;

        case 'down':
            shift.y = 1;
            break;
    }

    return {
        x: x + 2 * shift.x,
        y: y + 2 * shift.y
    };
}
