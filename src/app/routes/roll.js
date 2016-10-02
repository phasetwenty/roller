/**
 * Created by Chris on 10/1/16.
 **/
import Resolver from '../dice/resolver';
import Roller from '../dice/roller';
import RouteHandler from './handler';

class QueryParams {
    constructor(query) {
        this._query = query;
        this.errors = [];
        this.poolSize = null;
    }

    get isValid() {
        this._validate();
        return this.errors.length === 0;
    }

    _validate() {
        this.errors = [];
        if (!('pool' in this._query)) {
            this.errors.push('You must specify how many dice to roll via the \'pool\' ' +
                'query parameter.');
        } else {
            let numberOfDice = parseInt(this._query.pool);
            if (Number.isNaN(numberOfDice)) {
                this.errors.push('\'pool\' must be an integer.');
            } else {
                this.poolSize = numberOfDice;
            }
        }
    }
}

function Roll(request, response) {
    const handler = new RouteHandler(request, response);

    const params = new QueryParams(request.query);
    if (!params.isValid) {
        response.status(400);
        response.send(handler.makeError(params.errors));
        return;
    }

    // TODO: remove hardcoding.
    const roller = new Roller(10);
    const pool = roller.roll(params.poolSize);
    const resolver = new Resolver(pool, {});

    const data = {
        botch: resolver.botch,
        faces: pool,
        successes: resolver.successes
    };

    response.status(200);
    response.send(handler.makeResult(data, 'No message'));
}

export default Roll;
