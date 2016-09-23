/**
 * Created by Chris on 9/22/16.
 **/

/**
 * Provides a standard way of providing responses from our routes.
 **/
class RouteHandler {
    constructor(request, response) {
        this.request = request;
        this.response = response;
        this.response.set('Content-Type', 'application/json');
    }

    /**
     * Provides a JSON-encoded string containing an error.
     *
     * @param message String message to encode.
     **/
    makeError(message) {
        return JSON.stringify({status: 'error', message: message});
    }

    /**
     * Provides a JSON-encoded string containing the result.
     *
     * @param value Any object to include in the response
     * @param message String message
     * @return a JSON encoded string representing our response.
     **/
    makeResult(value, message) {
        return JSON.stringify({status: 'ok', data: value, message: message});
    }
}

function Roll(request, response) {
    let handler = new RouteHandler(request, response);

    response.status(400);
    if (!request.query.hasOwnProperty('pool')) {
        let error = handler.makeError('You must specify how many dice to roll via the \'pool\' ' +
            'query parameter.');
        response.send(error);
        return;
    }
    let numberOfDice = parseInt(request.query.pool);
    if (Number.isNaN(numberOfDice)) {
        response.send(handler.makeError('\'pool\' must be an integer.'));
        return;
    }

    response.status(200);
    response.send(handler.makeResult([1, 2, 3, 4], 'No message'));
}

export default Roll;