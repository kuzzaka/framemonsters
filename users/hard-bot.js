module.exports = (state, scope, context) => {
    const action = getAction(state, scope, context);

    return action;
}

function getAction(state, scope, context) {
    var direction = state.direction;

    if (getFront(scope, direction).startsWith('enemy')) {
        return 'move';
    }

    if (
        getFront(scope, direction, 2).startsWith('enemy')
    ) {
        return 'shoot';
    }

    if (
        getLeft(scope, direction).startsWith('enemy') ||
        getLeft(scope, direction, 2).startsWith('enemy')
    ) {
        return 'left';
    }

    if (
        getLeft(scope, direction).startsWith('enemy') ||
        getRight(scope, direction, 2).startsWith('enemy')
    ) {
        return 'right';
    }

    switch (getFront(scope, direction)) {
        case 'obstacle':
            return Math.random() > 0.5 ? 'right' : 'left';

        case 'surface':
            if (Math.random() < 0.8) {
                return 'move';
            }

            return Math.random() < 0.5 ? 'left' : 'right';
    }

    return action;
}

function getFront(scope, direction, offset = 1) {
    var shift = {
        'up': { x: 0, y: -offset },
        'down': { x: 0, y: offset },
        'left': { x: -offset, y: 0 },
        'right': { x: offset, y: 0 }
    }[direction];

    const ux = Math.floor(scope.length / 2);
    const uy = Math.floor(scope.length / 2);

    return scope[uy + shift.y][ux + shift.x];
}

function getLeft(scope, direction, offset = 1) {
    var shift = {
        'up': { x: -offset, y: 0 },
        'down': { x: offset, y: 0 },
        'left': { x: 0, y: offset },
        'right': { x: 0, y: -offset }
    }[direction];

    const ux = Math.floor(scope.length / 2);
    const uy = Math.floor(scope.length / 2);

    return scope[uy + shift.y][ux + shift.x];
}

function getRight(scope, direction, offset = 1) {
    var shift = {
        'up': { x: offset, y: 0 },
        'down': { x: -offset, y: 0 },
        'left': { x: 0, y: -offset },
        'right': { x: 0, y: offset }
    }[direction];

    const ux = Math.floor(scope.length / 2);
    const uy = Math.floor(scope.length / 2);

    return scope[uy + shift.y][ux + shift.x];
}
