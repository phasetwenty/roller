/**
 * Copyright 2016 Christopher Haverman
 * All Rights Reserved
 **/
/* global describe, it */
import {assert} from 'chai';
import {shallow} from 'enzyme';
import React from 'react';
import sinon from 'sinon';

import DieOptionGroup from '../../../src/client/components/DieOptionGroup';

describe('DieOptionGroup', () => {
    it('should generate the right number of options.', () => {
        const expectedFaces = 2;
        const wrapper = shallow(<DieOptionGroup facesCount={expectedFaces}
                                                facesOn={[]}
                                                onAnyFaceClick={() => {}}/>);
        assert.equal(wrapper.find('span').length, expectedFaces);
    });

    it('should wire up click events.', () => {
        const mockHandler = sinon.spy();
        const wrapper = shallow(<DieOptionGroup facesCount={1}
                                                facesOn={[]}
                                                onAnyFaceClick={mockHandler}/>);
        wrapper.find('span').simulate('click');
        assert.isTrue(mockHandler.calledOnce);
    });
});

describe('DieOptionGroup propTypes', () => {
    const invalidFaces = [{facesCount: -1}, {facesCount: 0}];

    invalidFaces.forEach((props) => {
        it(`should reject a 'facesCount' of ${props.facesCount}.`, () => {
            const objectUnderTest = DieOptionGroup.propTypes.facesCount;
            assert.instanceOf(objectUnderTest(props, 'fakename', 'fakecomponent'), Error);
        });
    });

    it('should accept a facesCount of 1', () => {
        const objectUnderTest = DieOptionGroup.propTypes.facesCount;
        assert.isUndefined(objectUnderTest({facesCount: 10}, 'fakename', 'fakecomponent'));
    });
});
