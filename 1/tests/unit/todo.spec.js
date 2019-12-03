const { ApolloServer } = require('apollo-server');
const { createTestClient } = require('apollo-server-testing');
const { gql } = require('apollo-server');

const typeDefs = require('../../src/graqhql/schema');

const resolvers = require('../../src/graqhql/resolvers');

const server = new ApolloServer({ typeDefs, resolvers });
const { mutate } = createTestClient(server);

let variables

describe('mutate', () => {
    describe('addTodo', () => {
        const addTodo = gql `
        mutation addTodo( $message: String!) {
            addTodo( message: $message) {
              id
              message
              status
              createdAt
            }
          }`
        it('adds a new todo', () => {
            variables = { todo: { message: "adds a new todo" } }
            const newtodo = {
                data: {
                    addTodo: {
                        id: expect.any(Number),
                        message: variables.message,
                        status: false,
                        createdAt: expect.any(String)
                    }
                }
            }
            expect(mutate({ mutation: addTodo, variables })).resolves.toMatchObject(newtodo)
        })
    })
})