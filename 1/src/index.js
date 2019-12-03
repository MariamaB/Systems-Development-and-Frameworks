const { ApolloServer } = require('apollo-server');
const typeDefs= require ('./schema');
const resolvers = require ('./resolvers');


const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
    // eslint-disable-next-line no-console
    console.log(`🚀  Server ready at ${url}`);
});

