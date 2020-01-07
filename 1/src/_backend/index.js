const { ApolloServer } = require('apollo-server');
const schema = require('./schema');
const decode = require('./jwt/decode');
// const { permissions } = require('./permissions/rules');
// const { applyMiddleware } = require('graphql-middleware');

// const resolvers = require('./resolvers');


const neo4j = require('neo4j-driver').v1;


let driver = neo4j.driver(
    'bolt://107.170.69.23:7687',
    neo4j.auth.basic('graphql', 'graphql')
);

//await driver.close();
// const schemaWithMiddleware = applyMiddleware(schema, permissions);

const server = new ApolloServer({
    schema,
    context: ({ req }) => {
        const token = req.headers.authorization;
        return {
            user: decode(token),
            driver
        };
    },
    introspection: true,
    playground: true,
});
const port = 4000;

// The `listen` method launches a web server.
server.listen({ port }).then(({ url }) => {
    // eslint-disable-next-line no-console
    console.log(`🚀  Server ready at ${url}`);
});

module.exports = driver;