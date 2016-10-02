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
                if (value === 10) {
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

        if ('autoSuccesses' in options && !Number.isNumber(options.autoSuccesses)) {
            this.errors.push('"autoSuccesses" must be a number.');
        } else if ('autoSuccesses' in options) {
            this.autoSuccesses = options.autoSuccesses;
        } else {
            this.autoSuccesses = 0;
        }

        if ('doubleFaces' in options) {
            if (Array.isArray(options.doubleFaces)) {
                this.doubleFaces = options.doubleFaces;
            } else if (!Array.isArray(options.doubleFaces)) {
                this.errors.push('"doubleFaces" must be an array.');
            }
        }
    }
}

export default Resolver;
