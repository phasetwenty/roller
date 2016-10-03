/**
 * Created by Chris on 10/1/16.
 **/
/* globals describe, it */

import {assert} from 'chai';

import {Resolver, ResolverOptions} from '../../../src/app/dice/resolver';

describe('Resolver', () => {
    const miscPools = [
        {expectedSuccesses: 0, message: '0 successes on 1 die', pool: [5]},
        {expectedSuccesses: 0, message: '0 successes on 3 dice', pool: [1, 2, 3]},
        {expectedSuccesses: 0, message: '0 successes on all ones', pool: [1, 1, 1, 1]},
        {expectedSuccesses: 1, message: '1 success on a seven', pool: [7]},
        {expectedSuccesses: 1, message: '1 success on an eight', pool: [8]},
        {expectedSuccesses: 1, message: '1 success on a nine', pool: [9]},
        {expectedSuccesses: 1, message: '1 success on a ten', pool: [10]},
    ];
    miscPools.forEach((testCase) => {
        const {expectedSuccesses, message, pool} = testCase;
        it(`should handle ${message}.`, () => {
            const objectUnderTest = new Resolver(pool, {doubleFaces: []});
            assert.equal(objectUnderTest.successes, expectedSuccesses);
        });
    });

    const botchPools = [
        {
            message: 'a single die',
            pool: [1],
        },
        {
            message: 'two dice',
            pool: [1, 2]
        },
        {
            message: '3 dice, all ones',
            pool: [1, 1, 1]
        },
        {
            message: 'every unsuccessful die',
            pool: [1, 2, 3, 4, 5, 6]
        }
    ];
    botchPools.forEach(testCase => {
        const {message, pool} = testCase;
        it(`should detect a botch on ${message}.`, () => {
            const objectUnderTest = new Resolver(pool, {doubleFaces: []});
            assert.isTrue(objectUnderTest.botch);
        });
    });

    it('should double a face when requested.', () => {
        const objectUnderTest = new Resolver([10], {doubleFaces: [10]});
        assert.equal(objectUnderTest.successes, 2);
    });
});

describe('ResolverOptions', () => {
    const invalidPoolQueries = [
        {
            messageSnippet: 'empty',
            query: {pool: ''},
        },
        {
            messageSnippet: 'out of range',
            query: {pool: '0'}
        },
        {
            messageSnippet: 'invalid',
            query: {pool: 'what'}
        },
        {
            messageSnippet: 'not given',
            query: {}
        }
    ];
    invalidPoolQueries.forEach(testCase => {
        const {messageSnippet, query} = testCase;
        it(`should invalidate the request when the pool is ${messageSnippet}.`, () => {
            const objectUnderTest = new ResolverOptions(query);
            assert.isFalse(objectUnderTest.isValid);
        });
    });

    it('should validate the request when the pool is valid.', () => {
        const objectUnderTest = new ResolverOptions({pool: '1'});
        assert.isTrue(objectUnderTest.isValid);
        assert.equal(objectUnderTest.poolSize, 1);
    });

    const invalidAutoSuccesses = [
        {
            messageSnippet: 'out of range',
            query: {autoSuccesses: '-1'}
        },
        {
            messageSnippet: 'invalid',
            query: {autoSuccesses: 'what'}
        }
    ];
    invalidAutoSuccesses.forEach(testCase => {
        const {messageSnippet, query} = testCase;
        it(`should invalidate the request when the auto successes are ${messageSnippet}.`, () => {
            query.pool = 1;
            const objectUnderTest = new ResolverOptions(query);
            assert.isFalse(objectUnderTest.isValid);
        });
    });

    const invalidDoubleFaces = [
        {
            messageSnippet: 'is invalid',
            query: {doubleFaces: 'what'}

        },
        {
            messageSnippet: 'has one member out of range',
            query: {doubleFaces: '-1,10'}
        },
        {
            messageSnippet: 'has one member invalid',
            query: {doubleFaces: '9,what'}
        }
    ];
    invalidDoubleFaces.forEach(testCase => {
        const {messageSnippet, query} = testCase;
        it(`should invalidate the request when the double faces ${messageSnippet}`, () => {
            query.pool = 1;
            const objectUnderTest = new ResolverOptions(query);
            assert.isFalse(objectUnderTest.isValid);
        });
    });
});
