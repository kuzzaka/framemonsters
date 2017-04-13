const directions = require('app/user').directions;

module.exports = user => {
    const index = directions.indexOf(user.direction);

    user.direction = directions[index - 1] || directions[directions.length - 1];

    user.action = 'left';
};
