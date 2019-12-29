const { gql } = require('apollo-server');

const typeDefs = gql`
 
  type Todo {
    id: String!
    message: String
    status: Boolean
    createdAt: String
    assignedTo: Int
  }
  
  type User {
    id: Int!
    email: String!
    password: String,
    loggedIn: Boolean,
  }

  type Admin {
  id: Int!
  email: String!
  password: String
}

type JWebtoken {
  jwt: String
}



  type Query {
    todos(orderBy: ORDERBY): [Todo]
    todo(id: String): Todo
    Sorting(orderBy: ORDERBY): [Todo],
    user(email: String!, password: String ): User
    users: [User]
  }
  
  
  type Mutation {
    addTodo( message: String!): Todo
    removeTodo(id: String!):[Todo]
    updateTodo(id: String!, message: String, assignedTo: Int): Todo
    changeTodoStatus(id: String!, status:Boolean!):Todo
    login(email: String!, password:String!): JWebtoken
    logout(id: String): User
    
   
  }


  enum ORDERBY {
    ASC
    DESC
}
  
`;
module.exports = typeDefs;