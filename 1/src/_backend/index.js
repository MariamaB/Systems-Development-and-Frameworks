const { ApolloServer } = require('apollo-server');
const schema = require('./schema');
const decode = require('./jwt/decode');
const { rules } = require('./permissions/permissions');
const { middlewares } = require('./permissions/permissions');
const { applyMiddleware } = require('graphql-middleware');
const neo4j = require('neo4j-driver').v1;
const { NEO4J_URI, NEO4J_USERNAME, NEO4J_PASSWORD } = require('./jwt/config');

let driver = neo4j.driver(
    NEO4J_URI,
    neo4j.auth.basic(NEO4J_USERNAME, NEO4J_PASSWORD)
);


const schemaWithMiddleware = applyMiddleware(schema, rules, middlewares);

const server = new ApolloServer({
    schema: schemaWithMiddleware,
    context: ({ req }) => {
        let authorization = req.headers.authorization;
        const token = authorization ? authorization.split(" ").filter(t => t.length > 10)[0] : authorization;
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