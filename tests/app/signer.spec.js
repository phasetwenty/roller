/**
 * Copyright 2016 Christopher Haverman
 * All Rights Reserved
 **/
/* global describe, it */

import {assert} from 'chai';

import Signer from '../../src/app/signer';

describe('Signer', () => {
    it('should create a reproducible signature.', () => {
        const objectUnderTest = new Signer('md5', 'horse');
        const actualSignature = objectUnderTest.sign('fakemessage');
        assert.equal(actualSignature, '3e56406b6d8dacc78bbcd401e7c5b64d');
    });

    it('should validate a signature.', () => {
        const objectUnderTest = new Signer('md5', 'horse');
        const signature = objectUnderTest.sign('fakemessage');
        assert.isTrue(objectUnderTest.isValid('fakemessage', signature));
    });

    it('should invalidate an invalid signature.', () => {
        const objectUnderTest = new Signer('md5', 'horse');
        assert.isFalse(objectUnderTest.isValid('fakemessage', 'bees'));
    });
});
