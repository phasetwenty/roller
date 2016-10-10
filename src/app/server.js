/**
 * Copyright 2016 Christopher Haverman
 * All Rights Reserved
 **/
import express from 'express';

import {API_PATH, PORT, STATIC_ROOT} from '../settings';
import Router from './routes/main';

const app = express();
app.use(express.static(STATIC_ROOT));

const router = new Router(API_PATH);
router.routes.forEach((route) => {
    app.get(route.path, route.handler);
});

app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}/`);
});
