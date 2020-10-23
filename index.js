const { ApolloServer, PubSub } = require('apollo-server');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs');
const { MONGO_DB } = require('./.config.js');
const resolvers = require('./graphql/resolvers');

const pubSub = new PubSub();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => ({req, pubSub})
});

mongoose.connect(MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        return server.listen({ port: 5000 })
    }).then(res => console.log(`Server running ${res.url}`));