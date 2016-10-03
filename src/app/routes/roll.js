/**
 * Created by Chris on 10/1/16.
 **/
import {Resolver, ResolverOptions} from '../dice/resolver';
import Roller from '../dice/roller';
import RouteHandler from './handler';

function Roll(request, response) {
    const handler = new RouteHandler(request, response);

    const resolverOptions = new ResolverOptions(request.query);
    if (!resolverOptions.isValid) {
        response.status(400);
        response.send(handler.makeError(resolverOptions.errors));
        return;
    }

    // TODO: remove hardcoding.
    const roller = new Roller(10);
    const pool = roller.roll(resolverOptions.poolSize);
    const resolver = new Resolver(pool, resolverOptions);

    const data = {
        botch: resolver.botch,
        faces: pool,
        successes: resolver.successes
    };

    response.status(200);
    response.send(handler.makeResult(data, 'No message'));
}

export default Roll;
