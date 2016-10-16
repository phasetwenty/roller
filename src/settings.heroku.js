/**
 * This module contains settings that apply to a Heroku environment.
 *
 * Copyright 2016 Christopher Haverman
 * All Rights Reserved
 **/

module.exports = {
    API_PATH: '/api/v1',
    DIE_FACES: 10,
    PORT: process.env.PORT || 8000,
    SECRET: 'horse',
    SIGN_ALGORITHM: 'md5',
    STATIC_ROOT: 'public'
};
