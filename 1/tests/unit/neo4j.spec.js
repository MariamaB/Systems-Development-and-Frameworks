const { gql } = require('apollo-server');
const { ApolloServer } = require('apollo-server')
const { makeExecutableSchema } = require ('graphql-tools');
const { makeAugmentedSchema } = require ('graphql-tools');
const resolvers = require('../../src/_backend/resolvers');
const index = require('../../src/_backend/index');






















/* 
const cypher = 'MATCH (n) RETURN n LIMIT 5'
driver.run(cypher)
driver.close() */
