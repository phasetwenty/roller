/**
 * Created by Chris on 10/1/16.
 **/
import Crypto from 'crypto';

/**
 * Generates random numbers suitable for our purposes. Takes into account modulo bias.
 **/
class Roller {
    constructor(facesCount) {
        this._facesCount = facesCount;

        const byteValues = 256;  // This is not provided as a constant to my knowledge.
        this._biasThreshold = byteValues - (byteValues % this._facesCount);
    }

    /**
     * @param dieCount Number of random numbers to generate.
     * @return {Array} An array of random numbers.
     **/
    roll(dieCount) {
        return (new Array(dieCount)).map((v, i) => this._rollOne());
    }

    _rollOne() {
        let result = Crypto.randomBytes(1)[0];
        while (result > this._biasThreshold) {
            result = Crypto.randomBytes(1)[0];
        }
        return (result % this._facesCount) + 1;
    }
}

export default Roller;
