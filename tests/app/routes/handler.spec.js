/**
 * Copyright 2016 Christopher Haverman
 * All Rights Reserved
 **/
/* global describe, it */

import {assert} from 'chai';
import sinon from 'sinon';

import RouteHandler from '../../../src/app/routes/handler';



describe('RouteHandler', () => {
    const testCaseMetadata = [
        {
            displayName: 'error',
            methodName: 'makeError',
            params: ['fakemessage'],
        },
        {
            displayName: 'normal',
            methodName: 'makeResult',
            params: [{}, 'fakemessage']
        }
    ];

    testCaseMetadata.forEach((testCase) => {
        const {displayName, methodName, params} = testCase;
        it(`${displayName} responses must have a timestamp.`, () => {
            const unboundFunctionUnderTest = RouteHandler.prototype[methodName];
            const actualResponse = JSON.parse(unboundFunctionUnderTest.apply({}, params));
            assert.property(actualResponse, 'timestamp');
            assert.isNumber(actualResponse.timestamp);
        });
    });
});
