/**
 * Created by Chris on 10/1/16.
 **/
import InvalidArgumentError from '../errors';

/**
 * Provides information about dice pools.
 **/
class Resolver {
    constructor(pool, resolverOptions) {
        if (!Array.isArray(pool)) {
            throw new InvalidArgumentError('"pool" must be an array.');
        }
        this._pool = pool;
        this._options = resolverOptions;
        this._successes = null;
    }

    get botch() {
        return this.successes === 0 && this._pool.indexOf(1) !== -1;
    }

    get successes() {
        if (this._successes === null) {
            this._successes = this._pool.reduce((sum, value) => {
                if (this._options.doubleFaces.indexOf(value) !== -1) {
                    sum += 2;
                } else if (value >= 7) {
                    sum += 1;
                }
                return sum;
            }, 0);
        }

        return this._successes;
    }
}

class ResolverOptions {
    constructor(options) {
        this._options = options;

        this.autoSuccesses = 0;
        this.doubleFaces = [];
        this.errors = [];
        this._validated = false;
    }

    get isValid() {
        if (!this._validated) {
            this._validate();
        }
        return this.errors.length === 0;
    }

    _validate() {
        if (typeof this._options !== 'object') {
            this.errors.push('"options" must be an object.');
            return;
        }

        if ('autoSuccesses' in this._options && !Number.isNumber(options.autoSuccesses)) {
            this.errors.push('"autoSuccesses" must be a number.');
        } else if ('autoSuccesses' in this._options) {
            this.autoSuccesses = options.autoSuccesses;
        }

        if ('doubleFaces' in this._options) {
            if (Array.isArray(this._options.doubleFaces)) {
                this.doubleFaces = this._options.doubleFaces;
            } else if (!Array.isArray(this._options.doubleFaces)) {
                this.errors.push('"doubleFaces" must be an array.');
            }
        }
    }
}

let exports = {};
exports.Resolver = Resolver;
exports.ResolverOptions = ResolverOptions;
module.exports = exports;
