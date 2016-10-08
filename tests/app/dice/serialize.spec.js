/**
 * Copyright 2016 Christopher Haverman
 * All Rights Reserved
 **/
/* global describe, it */

import {assert} from 'chai';

import {Deserializer, serialize} from '../../../src/app/dice/serialize';

const cases = [
    /**
     * No doubled faces but must not be skipped in the result
     **/
    {
        dieFaces: [1, 2, 3, 4],
        resolverOptions: {autoSuccesses: 0, doubleFaces: [], targetNumber: 7},
        timestamp: 1234,
        message: '0|1234|7||1234'
    },
    /**
     * Double tens + verify to-hex conversion
     **/
    {
        dieFaces: [1, 2, 3, 10],
        resolverOptions: {autoSuccesses: 0, doubleFaces: [10], targetNumber: 7},
        timestamp: 1234,
        message: '0|123a|7|a|1234'
    },
];

describe('Deserializer', () => {
    cases.forEach((testCase) => {
        const {message} = testCase;
        const expectedDieFaces = testCase.dieFaces;
        const expectedResolverOptions = testCase.resolverOptions;
        const expectedTimestamp = testCase.timestamp;
        it(`should deserialize ${message}`, () => {
            const objectUnderTest = new Deserializer(message);
            assert.deepEqual(objectUnderTest.dieFaces, expectedDieFaces);
            assert.equal(objectUnderTest.timestamp, expectedTimestamp);
            assert.isTrue(objectUnderTest.resolverOptions.isValid);
            assert.equal(
                objectUnderTest.resolverOptions.autoSuccesses,
                expectedResolverOptions.autoSuccesses);
            assert.deepEqual(
                objectUnderTest.resolverOptions.doubleFaces,
                expectedResolverOptions.doubleFaces);
            assert.equal(
                objectUnderTest.resolverOptions.targetNumber,
                expectedResolverOptions.targetNumber);
        });
    });
});

describe('serialize', () => {
    cases.forEach((testCase) => {
        const {dieFaces, resolverOptions, timestamp} = testCase;
        const expectedResult = testCase.message;
        it(`should serialize to ${expectedResult}`, () => {
            const actualResult = serialize(dieFaces, resolverOptions, timestamp);
            assert.equal(actualResult, expectedResult);
        });
    });
});
