
let todos = require('./database');

{
    'ASC'
    'DESC'
  }
  function sortTodo(arr,orderBy){
    let newArr = JSON.parse(JSON.stringify(arr));
  
    if (orderBy === 'ASC') {
        newArr.sort((a, b) => 
          a.createdAt - b.createdAt);
        return newArr;
    }else{if (orderBy === 'DESC') {
      newArr.sort((a, b) => 
          b.createdAt - a.createdAt);
      return newArr;
  
    }}
  
    
  }
  
  
  const resolvers = {
      Query: {
       
         todos: ()  => todos,
          todo: (_,args) => todos.filter(e => e.id===args.id)[0],
          Sorting: (_, args)=> {
          let newtodos = JSON.parse(JSON.stringify(todos));
          return sortTodo(newtodos,args.orderBy);
          
          }
  
      },
  
      Mutation: {
          addTodo: (_, args) => {
            let newTodo ={
  
              id: Math.floor(Math.random()*10),
              message: args.message,
              status: false,
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
              }
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
              }
              return e;
            });
            return newTodo;
  
          },
      }
  
  
  };
  module.exports = resolvers;