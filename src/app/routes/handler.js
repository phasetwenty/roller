/**
 * Provides a standard way of providing responses from our routes.
 *
 * Created by Chris on 10/1/16.
 **/
class RouteHandler {
    constructor(request, response) {
        this.request = request;
        this.response = response;
        this.response.set('Content-Type', 'application/json');
        // TODO: remove hardcoding
        this.response.set('Access-Control-Allow-Origin', 'http://localhost:8080');
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

export default RouteHandler;
