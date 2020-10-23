const jwt = require('jsonwebtoken');
const {AuthenticationError} = require('apollo-server');

const {SECRET_KEY} = require('../.config.js');

module.exports = (context) => {
    const authHeader = context.req.headers.authorization;
    if (!authHeader){
        throw new AuthenticationError('auth header must be provided');
    }

    const token = authHeader.split('Bearer ')[1];
    if(!token){
        throw new AuthenticationError('auth must be \'Bearer [token]\'');
    }

    try{
        const user = jwt.verify(token, SECRET_KEY);
        return user;
    } catch(err){
        throw new AuthenticationError('token not valid/expired');
    }

}