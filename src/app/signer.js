/**
 * Copyright 2016 Christopher Haverman
 * All Rights Reserved
 **/
import crypto from 'crypto';

/**
 * Provides signing operations to secure data against tampering.
 **/
class Signer {
    constructor(algorithm, secret) {
        this._algorithm = algorithm;
        this._secret = secret;
    }

    isValid(message, digest) {
        return this.sign(message) === digest;
    }

    sign(message) {
        const hmac = crypto.createHmac(this._algorithm, this._secret);
        hmac.update(message);
        return hmac.digest('hex');
    }
}

export default Signer;
