const { ApolloServer } = require('apollo-server');
const schema= require('./schema');
const resolvers = require('./resolvers');
const { setDriver }= require('../../src/_backend/server');

const driver = setDriver(); 

const server = new ApolloServer({ schema:schema, context: { driver },  introspection: true,
    playground: true});
    const port = 4000;

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
    // eslint-disable-next-line no-console
    console.log(`🚀  Server ready at ${url}`);
}); 

