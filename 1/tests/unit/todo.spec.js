const { ApolloServer } = require('apollo-server');
const { createTestClient } = require('apollo-server-testing');
const { gql } = require('apollo-server');
const typeDefs = require('./src/index');
const todos= require('./src/index');
const resolvers = require('./src/index');
const server = new ApolloServer({ typeDefs, resolvers });
const { query, mutate } = createTestClient(server);


it.todo("behaves in a specified way");

