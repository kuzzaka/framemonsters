const socket = io();

const HTML = $('html');
const BOARD = $('.board');
const RATING = $('.rating');

const CELL_SIZE = 20;

let PLAYERS = [];

socket
    .on('board', renderBoard)
    .on('state', updateGame);

HTML
    .css('font-size', `${CELL_SIZE}px`);

function renderBoard(board) {
    const html = board
        .map(rowHtml)
        .join('');

    BOARD.html(html);
}

function rowHtml(row) {
    const html = row
        .map(cellHtml)
        .join('');

    return `<div class="board-row">${html}</div>`;
}

function cellHtml(cell) {
    return `<div class="board-cell board-cell-${cell.data}"></div>`;
}

function updateGame(state) {
    checkPlayers(state);
    updatePlayers(state);
    updateRating(state);
}

function checkPlayers(state) {
    if (PLAYERS.length === state.length) {
        return;
    }

    for (let i = PLAYERS.length; i <= state.length - 1; i++) {
        addPlayer(state[i]);
    }
}

function addPlayer(data) {
    var $player = $('<div>')
        .addClass(`player type-${data.type}`)
        .attr('style', `color:${data.color}`);

    BOARD.append($player);
    PLAYERS.push($player);
}

function updatePlayers(state) {
    state.forEach(updatePlayer);
}

function updatePlayer(data, index) {
    const $player = PLAYERS[index];

    if (data.x === null) {
        return $player.addClass('dead');
    }

    const coords = getCoords(data);
    const translate = `translate(${coords.x}px, ${coords.y}px)`;

    $player
        .css('transform', translate)
        .attr('direction', data.direction)
        .removeClass('dead');
}

function getCoords(data) {
    return {
        x: data.x * CELL_SIZE,
        y: data.y * CELL_SIZE
    };
}

function updateRating(state) {
    const ratingHtml = state
        .slice(0, 10)
        .sort((a, b) => b.rating - a.rating)
        .reduce((html, user) => {
            return html + `
                <div class="rating-item">
                    <div class="rating-score">${user.rating}</div>
                    <div class="rating-user">
                        <div class="rating-icon type-${user.type}" style="background:${user.color}">
                            ${user.cooldown > 0 ?  user.cooldown : ''}
                        </div>
                        ${user.name}
                    </div>
                </div>
            `;
        }, '');

    RATING.html(ratingHtml);
}
