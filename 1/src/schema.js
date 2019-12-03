const { gql } = require('apollo-server');

const typeDefs = gql `
 
  type Todo {
    id: Int
    message: String
    status: Boolean
    createdAt: String
  }


  type Query {
    todos(orderBy: ORDERBY): [Todo]
    todo(id: Int): Todo
    Sorting(orderBy: ORDERBY): [Todo]
  }
  
  
  type Mutation {
    addTodo( message: String!): Todo
    removeTodo(id: Int!):[Todo]
    updateTodo(id: Int!, message: String!): Todo
    changeTodoStatus(id: Int!, status:Boolean!):Todo
    
   
  }
  

  enum ORDERBY {
    ASC
    DESC
}
  
`;
module.exports = typeDefs;