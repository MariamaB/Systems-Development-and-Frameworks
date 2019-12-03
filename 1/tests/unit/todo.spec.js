const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { createTestClient } = require('apollo-server-testing');
const { gql } = require('apollo-server-express');

const typeDefs = require('../../src/schema');
const todos= require('../../src/database');
const resolvers = require('../../src/resolvers');

const server = new ApolloServer({ typeDefs, resolvers });
const { query, mutate } = createTestClient(server);

let variables

describe('mutate', () => {
    describe('addTodo', () => {
        const addTodo = gql`
        mutation addTodo( $message: String!) {
            addTodo( message: $message) {
              id
              message
              status
              createdAt
            }
          }`
        it('adds a new todo', ()=> {
            variables = { message: "adds a new todo" }
            const expected = {
                data: {
                    addTodo: {
                        id: expect.any(Number),
                        message: variables.message,
                        status: false,
                        createdAt: expect.any(String)
                    }
                }
            }
             expect(mutate({ mutation: addTodo, variables })).resolves.toMatchObject(expected)
        })
    })
})



