let data = require('./database');
const uuidv4 = require('uuid/v4');
let todos = data.todos;
let users = data.users;

{
    'ASC'
    'DESC'
}

function sortTodo(arr, orderBy) {
    let newArr = JSON.parse(JSON.stringify(arr));

    if (orderBy === 'ASC') {
        newArr.sort((a, b) =>
            a.createdAt - b.createdAt);
        return newArr;
    } else {
        if (orderBy === 'DESC') {
            newArr.sort((a, b) =>
                b.createdAt - a.createdAt);
            return newArr;

        }
    }


}


const resolvers = {
    Query: {

        todos: () => todos,
        todo: (_, args) => todos.filter(e => e.id === args.id)[0],
        users: () => users,
        user: (_, args) => users.filter(e => e.email === args.email)[0],
        Sorting: (_, args) => {
            let newtodos = JSON.parse(JSON.stringify(todos));
            return sortTodo(newtodos, args.orderBy);

        }

    },

    Mutation: {
        addTodo: (_, args) => {
            let newTodo = {

                id: uuidv4(),
                message: args.message,
                status: false,
                assignedTo: undefined,
                createdAt: (new Date).getTime()
            };
            todos.push(newTodo);
            return newTodo;
        },

        removeTodo: (_, args) => {
            todos = todos.filter(t => t.id != args.id);
            return todos;
        },

        updateTodo: (_, args) => {
            let newTodo;
            todos = todos.map(e => {

                if (e.id === args.id) {
                    newTodo = {...e }
                    newTodo.message = (args.message != null || args.message != undefined) ? args.message : e.message;
                    newTodo.assignedTo = (args.assignedTo != null || args.assignedTo != undefined) ? args.assignedTo : e.assignedTo;

                    return newTodo
                }
                return e;
            });
            return newTodo;

        },
        changeTodoStatus: (_, args) => {
            let newTodo;
            // changing the Todo
            todos = todos.map(e => {
                if (e.id === args.id) {
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