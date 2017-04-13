const config = require('app/config');

const types = config.types;

const rawRows = config.board;
const rows = buildRows(rawRows);

const treasures = config.treasures;

function buildRows(rawRows) {
    return rawRows.map(rawRow => {
        return rawRow.map(code => {
            switch (true) {
                case code === 0:
                    return build('surface');

                case code > 1 && code < 5:
                    return build('obstacle', code);
            };
        });
    });
}

function build(type, data) {
    return {
        type: types[type],
        data
    };
}

function is(type, x, y) {
    return rows[y] && rows[y][x] && rows[y][x].type === types[type];
}

function spawnUser(user) {
    const freeCell = findFreeCell();

    if (freeCell) {
        placeUser(user, freeCell.x, freeCell.y);
    }
}

function findFreeCell() {
    const candidates = [];

    for (let y = 0; y < rows.length; y++) {
        for (let x = 0; x < rows[y].length; x++) {
            if (is('surface', x, y)) {
                candidates.push({ x, y });
            }
        }
    }

    return candidates[Math.floor(Math.random() * candidates.length)];
}

function getScope(user, r) {
    const ux = user.x;
    const uy = user.y;
    const scope = [];

    for (let y = uy - r, sy = 0; y <= uy + r; y++, sy++) {
        scope.push([]);

        for (let x = ux - r; x <= ux + r; x++) {
            if (rows[y] !== undefined && rows[y][x] !== undefined) {
                const data = getData(x, y);

                if (is('user', x, y) && data !== user) {
                    const direction = data.direction;
                    const type = [
                        types.enemy,
                        direction
                    ].join('-');

                    scope[sy].push(type);

                    continue;
                }

                scope[sy].push(rows[y][x].type);
            } else {
                scope[sy].push(types['obstacle']);
            }
        }
    }

    return scope;
}

function getEnemies(user, r) {
    const ux = user.x;
    const uy = user.y;
    const enemies = [];

    for (let y = uy - r, sy = 0; y <= uy + r; y++, sy++) {
        for (let x = ux - r; x <= ux + r; x++) {
            if (rows[y] !== undefined &&
                rows[y][x] !== undefined &&
                is('user', x, y) &&
                getData(x, y) !== user
            ) {
                enemies.push(getData(x, y));
            }
        }
    }

    return enemies;
}

function get() {
    return rows;
}

function freeCell(x, y) {
    rows[y][x] = build('surface');
}

function placeUser(user, x, y) {
    user.x = x;
    user.y = y;

    rows[y][x] = build('user', user);
}

function getData(x, y) {
    return rows[y][x].data;
}

function isTreasure(x, y) {
    return Boolean(treasures[`${y}:${x}`]);
}

function digTreasure(x, y) {
    treasures[`${y}:${x}`] = false;
}

module.exports = {
    digTreasure,
    freeCell,
    get,
    getData,
    getEnemies,
    getScope,
    is,
    isTreasure,
    placeUser,
    spawnUser
};
