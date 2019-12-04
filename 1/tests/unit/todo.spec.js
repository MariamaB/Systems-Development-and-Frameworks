
<<<<<<< Updated upstream
const { ApolloServer } = require('apollo-server');
const { createTestClient } = require('apollo-server-testing');
const { gql } = require('apollo-server');

<<<<<<< Updated upstream
const typeDefs = require('../../src/schema');

const resolvers = require('../../src/resolvers');
=======
const typeDefs = require('../../src/Backend/schema');
const uuidv4 = require('uuid/v4');
const resolvers = require('../../src/Backend/resolvers');
const todos = require('../../src/Backend/database');
>>>>>>> Stashed changes

const server = new ApolloServer({ typeDefs, resolvers });
const {  mutate } = createTestClient(server);

let variables

describe('mutate', () => {
    describe('addTodo', () => {
        const addTodo = gql`
        mutation addTodo( $message: String!) {
            addTodo( message: $message) {
            
              id
              message
              status
              assignedTo
              createdAt
            }
          }`
<<<<<<< Updated upstream
        test('adds a new todo', ()=> {
          
            variables = { message: "adds a new todo" }
            const newtodo = {
                data: {
                    addTodo: {
                        id: expect.any(Number),
                        message: variables.message,
                        status: false,
=======
        test('adds a new todo', () => {
            
            variables =  { message: "new todo" } 
            const expected = {
                data: {
                    addTodo: {
                        
                        id:  expect.any(String),
                        message: variables.message,
                        status: false,
                        assignedTo: null,
>>>>>>> Stashed changes
                        createdAt: expect.any(String)
                    }
                }
            }
<<<<<<< Updated upstream
             expect(mutate({ mutation: addTodo, variables })).resolves.toMatchObject(newtodo)
        })
        test('generates a random ID ', ()=> {
       
            variables = { message: "adds a new todo" }
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
        test('initializes listItem as "not done yet"', ()=> {
       
            variables = { message: "adds a new todo" }
            const newtodo = {
=======
            expect(mutate({ mutation: addTodo, variables })).resolves.toMatchObject(expected)
        })
        test('generates a random ID', () => {
        
            variables =  { message: "new todo" } 
            const expected = {
>>>>>>> Stashed changes
                data: {
                    addTodo: {
                        
                        id:  expect.any(String),
                        message: variables.message,
                        status: false,
                        assignedTo: null,
                        createdAt: expect.any(String)
                    }
                }
            }
<<<<<<< Updated upstream
             expect(mutate({ mutation: addTodo, variables })).resolves.toMatchObject(newtodo)
=======
            expect(mutate({ mutation: addTodo, variables })).resolves.toMatchObject(expected)
        })
        test('initializes todo as "not done yet"', () => {
    
            variables =  { message: " new todo" } 
            const expected = {
                data: {
                    addTodo: {
                        
                        id:  expect.any(String),
                        message: variables.message,
                        status: false,
                        assignedTo: null,
                        createdAt: expect.any(String)
                    }
                }
            }
            expect(mutate({ mutation: addTodo, variables })).resolves.toMatchObject(expected)
>>>>>>> Stashed changes
        })
    
    })
<<<<<<< Updated upstream
})

=======
>>>>>>> Stashed changes


=======
                 
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
                        variables = {id: "1"}
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
                        variables = {id: "1"}
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
                        const removeTodo = gql`
                        mutation removeTodo($id: String!) {
                            removeTodo(id: $id) {
                            id
                            message
                            isDone
                            createdAt
                            }
                        }`
                            test(' deletes a todo item', () => {  
                        
                            let todo = {id: '1'}
                            const expected = {
        
                                data:
                                     undefined

                                    
                                
                            }
                            expect(mutate({ mutation: removeTodo, variables })).resolves.toMatchObject(expected)
                        })
                    describe('But if ID invalid', () => {  
                        const removeTodo = gql`
                        mutation removeTodo($id: String!) {
                            removeTodo(id: $id) {
                            id
                            message
                            isDone
                            createdAt
                            }
                        }`
                        test(' returns `null`', () => {  
                        variable = {id: null }
                        const expected1 = {
    
                            data:  undefined
                                     
                            
                        }
                        expect(mutate({ mutation: removeTodo, variable })).resolves.toMatchObject(expected1)
                    })
                
                })
            })
        })

           
            
                           
                        
        
    
})
  
>>>>>>> Stashed changes
