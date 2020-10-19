const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');
const { MONGO_DB } = require('./.config.js');

const typeDefs = gql`
    type Query{
        sayHi: String!
    }
`

const resolvers = {
    Query: {
        sayHi: () => "hello"
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
});

mongoose.connect(MONGO_DB,{ useNewUrlParser: true, useUnifiedTopology: true } )
    .then(() => {
        return server.listen({ port: 5000 })
    }).then(res => console.log(`Server running ${res.url}`));