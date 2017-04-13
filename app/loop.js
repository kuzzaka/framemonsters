const config = require('app/config');

const actions = require('app/actions');
const board = require('app/board');

const User = require('app/user');

const users = {
    player: new User({
        email: 'player',
        name: 'player',
        type: 1,
        color: '#FF0000',
        rating: 0
    }),
    'easy-bot': new User({
        email: 'easy-bot',
        name: 'easy-bot',
        type: 1,
        color: '#00FF00',
        rating: 0
    }),
    'hard-bot': new User({
        email: 'hard-bot',
        name: 'hard-bot',
        type: 1,
        color: '#0000FF',
        rating: 0
    })
};
const usersOrder = ['player', 'easy-bot', 'hard-bot'];

exports.nextTick = function () {
    for (email of usersOrder) {
        const user = users[email];

        if (user.x === null) {
            user.cooldown -= 1;

            if (user.cooldown <= 0) {
                user.action = 'spawn';
                board.spawnUser(user);
            } else {
                user.action = 'dead';
            }
        } else {
            const scope = board.getScope(user, config.scopeRadius);
            const oldRating = user.rating;

            let action = null;

            try {
                const bot = `users/${email}.js`;
                const userBot = require(bot);

                action = userBot(user.state, scope, user.context).toString();

                delete require.cache[require.resolve(bot)]

            } catch (error) {
                console.info(error);
            }

            action = actions[action] ? action : null;

            if (action) {
                actions[action](user, board, users);
            } else {
                user.action = null;
            }
        }
    }

    return usersOrder.map(email => users[email].toJson());
};
