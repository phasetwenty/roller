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

/**
 * Extracts and validates the query parameters from the request, to be used by the Resolver.
 **/
class ResolverOptions {
    constructor(query) {
        this._query = query;

        this.autoSuccesses = 0;
        this.doubleFaces = [];
        this.errors = [];
        this.poolSize = null;
    }

    get isValid() {
        this._validate();
        return this.errors.length === 0;
    }

    _validate() {
        this.errors = [];

        this._validatePool();
        this._validateAutoSuccesses();
        this._validateDoubleFaces();
    }

    _validateAutoSuccesses() {
        if (!('autoSuccesses' in this._query) || this._query.autoSuccesses === '') {
            return;
        }
        this.autoSuccesses = this._validateNonnegativeParam(
            'autoSuccesses',
            this._query.autoSuccesses);
    }

    _validateDoubleFaces() {
        if (!('doubleFaces' in this._query) || this._query.doubleFaces === '') {
            return;
        }

        const doubleFaces = this._query.doubleFaces.split(',').map(x => { return parseInt(x); });
        for (let i = 0; i < doubleFaces.length; ++i) {
            const value = doubleFaces[i];
            if (Number.isNaN(value) || value < 0) {
                this.errors.push('Each face in \'doubleFaces\' must be a number greater than or ' +
                    'equal to zero.');
                break;
            }
        }
        this.doubleFaces = doubleFaces;
    }

    _validatePool() {
        if (!('pool' in this._query) || this._query.pool === '') {
            this.errors.push('You must specify how many dice to roll via the \'pool\' ' +
                'query parameter.');
            return;
        }

        const poolSize = parseInt(this._query.pool);

        if (Number.isNaN(poolSize) || poolSize <= 0) {
            this.errors.push('"pool" must be a number greater than zero.');
        }
        this.poolSize = poolSize;
    }

    _validateNonnegativeParam(name, strValue) {
        const value = parseInt(strValue);

        if (Number.isNaN(value) || value < 0) {
            this.errors.push(`${name} must be a number greater than or equal to zero.`);
        }
        return value;
    }
}

let exports = {};
exports.Resolver = Resolver;
exports.ResolverOptions = ResolverOptions;
module.exports = exports;
