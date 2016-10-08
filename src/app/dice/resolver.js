/**
 * Copyright 2016 Christopher Haverman
 * All Rights Reserved
 **/
import InvalidArgumentError from '../errors';

/**
 * Provides information about dice pools.
 **/
class Resolver {
    constructor(dieFaces, resolverOptions) {
        if (!Array.isArray(dieFaces)) {
            throw new InvalidArgumentError('"dieFaces" must be an array.');
        }
        this._dieFaces = dieFaces;
        this._options = resolverOptions;
        this._successes = null;
    }

    get botch() {
        return this.successes === 0 && this._dieFaces.indexOf(1) !== -1;
    }

    get successes() {
        if (this._successes === null) {
            this._successes = this._dieFaces
                .filter((value) => { return value >= this._options.targetNumber; })
                .reduce((sum, value) => {
                    sum += (this._options.doubleFaces.indexOf(value) !== -1) ? 2 : 1;
                    return sum;
                }, this._options.autoSuccesses);
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
        this.targetNumber = 7;
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
        this._validateTargetNumber();
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

    _validateTargetNumber() {
        if (!('targetNumber' in this._query) || this._query.targetNumber === '') {
            return;
        }
        this.targetNumber = this._validateNonnegativeParam(
            'targetNumber',
            this._query.targetNumber);

    }
}

let exports = {};
exports.Resolver = Resolver;
exports.ResolverOptions = ResolverOptions;
module.exports = exports;
