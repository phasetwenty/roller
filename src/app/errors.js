/**
 * Created by Chris on 10/1/16.
 **/

function InvalidArgumentError(message) {
    this.name = 'InvalidArgumentError';
    this.message = message;
    this.stack = (new Error()).stack;
}
InvalidArgumentError.prototype = new Error;

export default InvalidArgumentError;
