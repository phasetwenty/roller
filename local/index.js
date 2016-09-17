/**
 * Created by Chris on 9/14/16.
 **/
import React from 'react';
import ReactDom from 'react-dom';

import Die from '../src/Die';

ReactDom.render(<Die faces={10}/>, document.getElementById('Die'));
