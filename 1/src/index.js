const { ApolloServer, gql } = require('apollo-server');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
var d = new Date();
const typeDefs = gql `
 
  type Todo {
    id: Int,
    message: String
    status: Boolean
    createdAt: String
  }


  type Query {
    todos: [Todo]
    todo(id: Int): Todo
    
  }

  type Mutation {
    addTodo(id: Int!, message: String!, status:Boolean!,createdAt: String!): Todo
    removeTodo(id: Int!):[Todo]
    updateTodo(id: Int!, message: String!): Todo
    changeTodoStatus(id: Int!, status:Boolean!):Todo
    
   
  }
  

  enum orderBy {
    asc
    desc
}
  
`;


let todos = [{
        id: 1,
        message: 'Angie Brown',
        status: false,
        createdAt: d.getTime(),
        
    },
    {
        id: 2,
        message: 'Michael Crichton',
        status: false,
        createdAt: d.getTime()+1,
    },
];
 
function Sorting()
{
  todos.sort(function(a,b){return b.createdAt - a.createdAt});
}


const resolvers = {
    Query: {
        todos: () => todos,
        todo: (_,args) => todos.filter(e => e.id===args.id)[0],
    },

    Mutation: {
        addTodo: (_, args) => {
          let newTodo ={
            id: Math.floor(Math.random()*10),
            message: args.message,
            status: args.status,
            createdAt: (new Date).getTime()
          };         
          todos.push(newTodo);
          return newTodo;         
        },
        
        removeTodo: (_,args) => {
          return todos.splice(e=> e.id==args.id,1)
        },
        
        updateTodo: (_,args) => {
          let newTodo;
          // changing the Todo
          todos=todos.map(e => {
            if(e.id === args.id)
            {
              newTodo = {
                ...e,
                message: args.message,
              };
              return newTodo              
            };
            return e;
          });
          return newTodo;

        },
        changeTodoStatus: (_,args) =>{
          let newTodo;
          // changing the Todo
          todos=todos.map(e => {
            if(e.id === args.id)
            {
              newTodo = {
                ...e,
                status: args.status,
              };
              return newTodo              
            };
            return e;
          });
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