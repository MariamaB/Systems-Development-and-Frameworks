// const { gql } = require('apollo-server');
const { makeAugmentedSchema } = require('neo4j-graphql-js');
const resolvers = require('./resolvers');
// const { permissions } = require('./permissions/rules');
const typeDefs = `

  type Todo {
    id: String!
    message: String
    status: Boolean
    createdAt: String
    assignedTo: [User] @relation(name: "ASSIGNED_TO", direction: "OUT")
    
        

  }
  
  type User {
    id: Int!
    email: String!
    password: String,
    loggedIn: Boolean,
    tasks: [Todo] @relation(name: "ASSIGNED_TO", direction:"IN")
  }

  type Admin {
  id: Int!
  email: String!
  password: String
}

type JWebtoken {
  jwt: String
}

type LoginResponse {
  email: String
  token: String
  isLoggedIn: Boolean
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
    login(email: String!, password:String!): LoginResponse
    logout(id: String): User
    
   
  }


  enum ORDERBY {
    ASC
    DESC
}

`;
module.exports = makeAugmentedSchema({
    typeDefs,
    resolvers,
});