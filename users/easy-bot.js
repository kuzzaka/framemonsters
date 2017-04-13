module.exports = (state, scope, context) => {
    const randomActions = [
        'left', 'left',
        'right', 'right',
        'move', 'move', 'move',
        'move', 'move', 'move',
        'boom',
        'shoot',
        'wait'
    ];

    const action = randomActions[Math.floor(Math.random() * randomActions.length)];

    context.lastAction = action;

    return action;
}
