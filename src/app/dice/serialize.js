/**
 * Copyright 2016 Christopher Haverman
 * All Rights Reserved
 **/

import {ResolverOptions} from '../../../src/app/dice/resolver';

const SERIALIZED_ITEM_COUNT = 5;

/**
 * Deserializes a roll, which is used for replay.
 **/
class Deserializer {
    constructor(message) {
        this._message = message;

        this._dieFaces = null;
        this._resolverOptions = null;
        this._timestamp = null;
    }

    get dieFaces() {
        if (!this._dieFaces) {
            this._deserialize();
        }
        return this._dieFaces;

    }

    get resolverOptions() {
        if (!this._resolverOptions) {
            this._deserialize();
        }
        return this._resolverOptions;
    }

    get timestamp() {
        if (!this._timestamp) {
            this._deserialize();
        }
        return this._timestamp;
    }

    _deserialize() {
        const items = this._message.split('|');
        if (items.length !== SERIALIZED_ITEM_COUNT) {
            throw new DeserializationError(`Result did not yield ${SERIALIZED_ITEM_COUNT} items.`);
        }

        this._dieFaces = this._unpackDieFaces(items[1]);
        const doubleFaces = this._repackDoubleFaces(items[3]);


        const autoSuccesses = this._validateInteger(items[0], 'Auto successes');
        const targetNumber = this._validateInteger(items[2], 'Target number');
        this._timestamp = this._validateInteger(items[4], 'Timestamp');

        const rawOptions = {
            autoSuccesses: autoSuccesses,
            doubleFaces: doubleFaces,
            pool: this._dieFaces.length,
            targetNumber: targetNumber
        };
        this._resolverOptions = new ResolverOptions(rawOptions);
    }

    _repackDoubleFaces(packedFaces) {
        return [...new Array(packedFaces.length)].map((_, i) => {
            const c = packedFaces.charAt(i);
            const value = parseInt(c, 16);
            if (Number.isNaN(value)) {
                throw new DeserializationError('Double faces contained a non-integer value.');
            }
            return value.toString();
        }).join(',');
    }

    _unpackDieFaces(packedFaces) {
        let result = new Array(packedFaces.length);
        for (let i = 0; i < packedFaces.length; ++i) {
            const value = parseInt(packedFaces[i], 16);
            if (Number.isNaN(value)) {
                throw new DeserializationError('Die faces contained a non-integer value.');
            }
            result[i] = value;
        }
        return result;
    }

    _validateInteger(rawValue, name) {
        const value = parseInt(rawValue);
        if (Number.isNaN(rawValue)) {
            throw new DeserializationError(`${name} value was not an integer.`);
        }
        return value;
    }
}

/**
 * Serializes a roll, which enables replay functionality.
 **/
function serialize(dieFaces, resolverOptions, timestamp) {
    return [
        resolverOptions.autoSuccesses,
        serializeDieFaces(dieFaces),
        resolverOptions.targetNumber,
        serializeDieFaces(resolverOptions.doubleFaces),
        timestamp
    ].join('|');
}

function serializeDieFaces(dieFaces) {
    return dieFaces.map((value) => { return value.toString(16); }).join('');
}

function DeserializationError(message) {
    this.name = 'DeserializationError';
    this.message = message;
    this.stack = (new Error()).stack;
}
DeserializationError.prototype = new Error;

let exports = {};
exports.Deserializer = Deserializer;
exports.DeserializationError = DeserializationError;
exports.serialize = serialize;
module.exports = exports;
