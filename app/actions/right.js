const directions = require('app/user').directions;

module.exports = user => {
    const index = directions.indexOf(user.direction);

    user.direction = directions[index + 1] || directions[0];

    user.action = 'right';
};
