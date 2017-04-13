const config = require('app/config');

const { pick, sample } = require('lodash');

class User {
    constructor({ color, email, name, rating, type }) {
        this._props = {
            action: null,
            color,
            context: {},
            cooldown: 0,
            direction: sample(User.directions),
            email,
            name,
            rating,
            type,
            x: null,
            y: null
        };
    }

    get action() {
        return this._props.action;
    }

    set action(value) {
        this._props.action = value;
    }

    get cooldown() {
        return this._props.cooldown;
    }

    set cooldown(value) {
        this._props.cooldown = value;
    }

    get context() {
        return this._props.context;
    }

    set context(value) {
        this._props.context = value;
    }

    get direction() {
        return this._props.direction;
    }

    set direction(value) {
        this._props.direction = value;
    }

    get email() {
        return this._props.email;
    }

    get rating() {
        return this._props.rating;
    }

    set rating(value) {
        this._props.rating = value;
    }

    get state() {
        return {
            direction: this._props.direction,
            x: this._props.x,
            y: this._props.y
        };
    }

    get x() {
        return this._props.x;
    }

    set x(value) {
        this._props.x = value;
    }

    get y() {
        return this._props.y;
    }

    set y(value) {
        this._props.y = value;
    }

    kill() {
        this.x = null;
        this.y = null;
        this.action = 'dead';
    }

    toJson() {
        return pick(this._props, [
            'action',
            'color',
            'cooldown',
            'direction',
            'name',
            'rating',
            'type',
            'x',
            'y'
        ]);
    }

    static get directions () {
        return ['up', 'right', 'down', 'left'];
    }
}

module.exports = User;
