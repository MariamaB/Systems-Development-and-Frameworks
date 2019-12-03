const { gql } = require('apollo-server');

const typeDefs = gql `
 
  type Todo {
    id: String
    message: String
    status: Boolean
    createdAt: String
    assignedTo: Int
  }
  
  type User {
    id: Int
    email: String
    password: String
  }

  

  type Query {
    todos(orderBy: ORDERBY): [Todo]
    todo(id: Int): Todo
    Sorting(orderBy: ORDERBY): [Todo],
    user(email: String!, password: String ): User
    users: [User]
  }
  
  
  type Mutation {
    addTodo( message: String!): Todo
    removeTodo(id: Int!):[Todo]
    updateTodo(id: Int!, message: String, assignedTo: Int): Todo
    changeTodoStatus(id: Int!, status:Boolean!):Todo
    
   
  }
  

  enum ORDERBY {
    ASC
    DESC
}
  
`;
module.exports = typeDefs;