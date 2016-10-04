/**
 * Copyright 2016 Christopher Haverman
 * All Rights Reserved
 **/

function InvalidArgumentError(message) {
    this.name = 'InvalidArgumentError';
    this.message = message;
    this.stack = (new Error()).stack;
}
InvalidArgumentError.prototype = new Error;

export default InvalidArgumentError;
