const { ApolloServer } = require('apollo-server');
const { createTestClient } = require('apollo-server-testing');
const { gql } = require('apollo-server');

const typeDefs = require('../../src/_backend/schema');

const resolvers = require('../../src/_backend/resolvers');


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
              assignedTo
              createdAt
            }
          }`
        test('adds a new todo', () => {

            variables = { message: "new todo" }
            const expected = {
                data: {
                    addTodo: {

                        id: expect.any(String),
                        message: variables.message,
                        status: false,
                        assignedTo: null,
                        createdAt: expect.any(String)
                    }
                }
            }
            expect(mutate({ mutation: addTodo, variables })).resolves.toMatchObject(expected)
        })
        test('generates a random ID', () => {

            variables = { message: "new todo" }
            const expected = {
                data: {
                    addTodo: {

                        id: expect.any(String),
                        message: variables.message,
                        status: false,
                        assignedTo: null,
                        createdAt: expect.any(String)
                    }
                }
            }
            expect(mutate({ mutation: addTodo, variables })).resolves.toMatchObject(expected)
        })
        test('initializes todo as "not done yet"', () => {

            variables = { message: " new todo" }
            const expected = {
                data: {
                    addTodo: {

                        id: expect.any(String),
                        message: variables.message,
                        status: false,
                        assignedTo: null,
                        createdAt: expect.any(String)
                    }
                }
            }
            expect(mutate({ mutation: addTodo, variables })).resolves.toMatchObject(expected)
        })
    })

    describe('FinishTodo "changeTodoStatus"', () => {

        const changeTodoStatus = gql `
                mutation changeTodoStatus( $id: String!) {
                    changeTodoStatus( id: $id) {
                    
                    id
                    message
                    status
                    assignedTo
                    createdAt
                    }
                }`
        test('rejects if ID is missing', () => {
            variables = {}
            const expected = {

                data: undefined
            }
            expect(mutate({ mutation: changeTodoStatus, variables })).resolves.toMatchObject(expected)
        })
        describe('Given an ID', () => {
            test('marks an existing todo as done "true"', () => {
                variables = { id: "1" }
                const expected = {

                    data: {
                        changeTodoStatus: {
                            id: variables.id,
                            message: expect.any(String),
                            status: true,
                            assignedTo: null,
                            createdAt: expect.any(String)

                        }
                    }
                }
                expect(mutate({ mutation: changeTodoStatus, variables })).resolves.toMatchObject(expected)
            })
            test('returns entire todo item', () => {
                variables = { id: "1" }
                const expected = {

                    data: {
                        changeTodoStatus: {
                            id: variables.id,
                            message: expect.any(String),
                            status: true,
                            assignedTo: null,
                            createdAt: expect.any(String)

                        }
                    }
                }
                expect(mutate({ mutation: changeTodoStatus, variables })).resolves.toMatchObject(expected)
            })
        })
    })
    describe('removeTodo', () => {
        describe('Given an ID', () => {
            const removeTodo = gql `
                        mutation removeTodo($id: String!) {
                            removeTodo(id: $id) {
                            id
                            message
                            isDone
                            createdAt
                            }
                        }`
            test(' deletes a todo item', () => {

                variables = { id: '1' }
                const expected = {

                    data: undefined



                }
                expect(mutate({ mutation: removeTodo, variables })).resolves.toMatchObject(expected)
            })
            describe('But if ID invalid', () => {
                const removeTodo = gql `
                        mutation removeTodo($id: String!) {
                            removeTodo(id: $id) {
                            id
                            message
                            isDone
                            createdAt
                            }
                        }`
                test(' returns `null`', () => {
                    let variable = { id: "" }
                    const expected1 = {

                        data: undefined


                    }
                    expect(mutate({ mutation: removeTodo, variable })).resolves.toMatchObject(expected1)
                })

            })
        })
    })







})