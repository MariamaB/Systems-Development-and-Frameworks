const { ApolloServer, gql } = require('apollo-server');
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql `

  type Todo {
    id: Int,
    message: String
  }

  type Query {
    todos: [Todo]
  }

  type Mutation {
    addTodo(message: String!, status:Boolean!): Todo
  }
  
`;

const todos = [
    { id: 1, message: "Foo" },
    { id: 2, message: "Bar" },
    { id: 3, message: "Baz" }
];


const resolvers = {
    Query: {
        todos: () => todos,
    },

    Mutation: {
        addTodo: (_, args) => {
            let newTodo = {

                id: Math.floor(Math.random() * 10),
                message: args.message,
                status: args.status,
                createdAt: (new Date).getTime()
            };
            todos.push(newTodo);
            return newTodo;
        },
    }


};


const server = new ApolloServer({ typeDefs, resolvers });
// The `listen` method launches a web server.
server.listen().then(({ url }) => {
    // eslint-disable-next-line no-console
    console.log(`🚀  Server ready at ${url}`);
});