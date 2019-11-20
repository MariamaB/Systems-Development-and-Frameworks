const { ApolloServer, gql } = require('apollo-server');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql `

  type Todo {
    id: String,
    message: String
  }

  type Query {
    todos: [Todo]
  }

  type Mutation {
    addTodo(id: String!, message: String!): Todo
  }
  
`;

const todos = [{
        id: 'Harry Potter and the Chamber of Secrets',
        message: 'J.K. Rowling',
    },
    {
        id: 'Jurassic Park',
        message: 'Michael Crichton',
    },
];


const resolvers = {
    Query: {
        todos: () => todos,
    },

    Mutation: {
        addTodo: (parent, args) => args
    }


};

const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
    // eslint-disable-next-line no-console
    console.log(`🚀  Server ready at ${url}`);
});