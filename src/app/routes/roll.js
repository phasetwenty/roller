/**
 * Copyright 2016 Christopher Haverman
 * All Rights Reserved
 **/
import {DIE_FACES, SECRET, SIGN_ALGORITHM} from '../../settings';
import {Resolver, ResolverOptions} from '../dice/resolver';
import Roller from '../dice/roller';
import RouteHandler from './handler';
import {serialize} from '../dice/serialize';
import Signer from '../signer';

/**
 * Handles the roll endpoint of the API.
 **/
class RollHandler {
    constructor(resolverOptions, routeHandler, signer, timestamp, request, response) {
        this._handler = routeHandler;
        this._resolverOptions = resolverOptions;
        this._signer = signer;
        this._timestamp = timestamp;

        this._request = request;
        this._response = response;
    }

    handle() {
        if (!this._isOptionsValid) {
            return;
        }

        this._response.status(200);
        this._response.send(this._handler.makeResult(this._responseData, 'No message'));
    }

    get _isOptionsValid() {
        if (!this._resolverOptions.isValid) {
            this._response.status(400);
            this._response.send(this._handler.makeError(this._resolverOptions.errors));
        }
        return this._resolverOptions.isValid;
    }

    get _responseData() {
        const roller = new Roller(DIE_FACES);
        const dieFaces = roller.roll(this._resolverOptions.poolSize);
        const resolver = new Resolver(dieFaces, this._resolverOptions);
        const signature = this._signer.sign(
            serialize(dieFaces, this._resolverOptions, this._timestamp));

        return {
            botch: resolver.botch,
            faces: dieFaces,
            signature: signature,
            successes: resolver.successes
        };
    }
}

function Roll(request, response) {
    const resolverOptions = new ResolverOptions(request.query);
    const routeHandler = new RouteHandler(request, response);
    const signer = new Signer(SIGN_ALGORITHM, SECRET);
    const timestamp = new Date().getTime();
    const handler = new RollHandler(
        resolverOptions,
        routeHandler,
        signer,
        timestamp,
        request,
        response);
    handler.handle();
}

export default Roll;
