/**
 * Created by Chris on 9/22/16.
 **/

/**
 * Applies common setup to the responses by our API.
 *
 * @param response Express response configure.
 **/
function configureResponse(response) {
    response.set('Content-Type', 'application/json');
}

function makeError(message) {
    return JSON.stringify({status: 'error', message: message});
}

function makeResult(value, message) {
    return JSON.stringify({status: 'ok', data: value, message: message});
}

function Roll(request, response) {
    configureResponse(response);

    response.status(400);
    if (!request.query.hasOwnProperty('pool')) {
        let error = makeError('You must specify how many dice to roll via the \'pool\' query ' +
            'parameter.');
        response.send(error);
        return;
    }
    let numberOfDice = parseInt(request.query.pool);
    if (Number.isNaN(numberOfDice)) {
        response.send(makeError('\'pool\' must be an integer.'));
        return;
    }

    response.status(200);

    response.send(makeResult([1, 2, 3, 4], 'No message'));
}

export default Roll;