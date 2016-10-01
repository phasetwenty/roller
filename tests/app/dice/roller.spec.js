/**
 * Created by Chris on 10/1/16.
 **/
/* global describe, it */

import {assert} from 'chai';

import Roller from '../../../src/app/dice/roller';

describe('Roller', () => {
    const pools = [1, 2, 10, 100];
    pools.forEach((expectedCount) => {
        // TODO: pluralize
        it(`rolls ${expectedCount} dice.`, () => {
            const objectUnderTest = new Roller(expectedCount);
            const actualRoll = objectUnderTest.roll(expectedCount);
            assert.equal(actualRoll.length, expectedCount);
        });
    });

    it('returns only numbers.', () => {
        const objectUnderTest = new Roller(10);
        const actualRoll = objectUnderTest.roll(10);
        assert.isTrue(actualRoll.every((value) => Number.isNumber(value)));
    });
});
