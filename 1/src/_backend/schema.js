// const { gql } = require('apollo-server');
const { makeAugmentedSchema } = require('neo4j-graphql-js');
const resolvers = require('./resolvers');
const typeDefs = `

  type Todo {
    id: ID!
    message: String
    status: Boolean
    createdAt: String
    assignedTo: User @relation(name: "ASSIGNED_TO", direction: "OUT")
  }
  
  type User {
    id: ID!
    email: String!
    password: String,
    role: UserGroup!
    tasks: [Todo] @relation(name: "ASSIGNED_TO", direction:"IN")
  }

  enum UserGroup {
    admin
    user
  }

type JWebtoken {
  jwt: String
}

type LoginResponse {
  email: String
  role: UserGroup!
  token: String
}


  type Query {
    todos(orderBy: ORDERBY): [Todo]
    todo(id: ID): Todo
    Sorting(orderBy: ORDERBY): [Todo],
    user(email: String!, password: String ): User
    users: [User]
  }
  
  
  type Mutation {
    addTodo( message: String!): Todo
    removeTodo(id: ID!):[Todo]
    updateTodo(id: ID!, message: String): Todo
    assignTodo(id: ID!, assignedTo: ID): Todo
    changeTodoStatus(id: ID!, status:Boolean!):Todo
    login(email: String!, password:String!): LoginResponse
    logout(id: ID): User
    
   
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