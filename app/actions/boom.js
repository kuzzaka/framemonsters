const config = require('app/config');

module.exports = (user, board, users) => {
    const enemies = board.getEnemies(user, config.boomRadius);

    for (enemy of enemies) {
        killUser(board, enemy, config.cooldown);

        user.rating += config.boomScore;
        enemy.rating += config.deathScore;
    }

    killUser(board, user, config.boomCooldown);

    user.action = 'boom';
};

function killUser(board, user, cooldown) {
    board.freeCell(user.x, user.y);

    user.kill();

    user.cooldown = cooldown;
}
