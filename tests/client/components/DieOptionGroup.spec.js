/**
 * Created by Chris on 10/2/16.
 **/
/* global describe, it */
import {assert} from 'chai';
import {shallow} from 'enzyme';
import React from 'react';

import DieOptionGroup from '../../../src/client/components/DieOptionGroup';

describe('DieOptionGroup', () => {
    it('should generate the right number of options.', () => {
        const expectedFaces = 2;
        const objectUnderTest = shallow(<DieOptionGroup facesCount={expectedFaces}
                                                        facesOn={[]}
                                                        onAnyFaceClick={() => {}}/>);
        assert.equal(objectUnderTest.find('span').length, expectedFaces);
    });
});
