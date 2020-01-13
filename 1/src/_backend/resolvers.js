const { neo4jgraphql, AuthenticationError } = require('neo4j-graphql-js');
const encode = require('./jwt/encode');
// let data = require('./database');
const uuidv4 = require('uuid/v4');
let todos = neo4jgraphql;
let users = neo4jgraphql;

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
        todos(object, params, ctx, info) {
            console.log('User: ' + ctx.user.email);
            return neo4jgraphql(object, params, ctx, info);
        },
        todo: (_, args) => todos.filter(e => e.id === args.id)[0],
        users(object, params, ctx, info) {
            console.log('info: ' + info);
            return neo4jgraphql(object, params, ctx, info);
        },
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
                assignedTo: 0,
                createdAt: (new Date).getTime()
            };
            todos.push(newTodo);
            return newTodo;
        },

        removeTodo: (_, args) => {
            todos = todos.filter(t => t.id != args.id);
            return todos;
        },
        assignTodo: async(_, args, ctx) => {
            let todo;
            const { assignedTo } = args
            delete args.assignedTo
            console.log('args', args)
            console.log(assignedTo)
            const session = ctx.driver.session();

            try {
                const updatedTodo = await session.run(
                    `
                    MATCH (todo:Todo{id: $args.id}) 
                    MATCH (user:User{id: $userId}) 
                    MERGE (todo)-[:ASSIGNED_TO]->(user) 
                    SET todo.assignedTo = $userId
                    RETURN todo
                `, { args, userId: assignedTo }
                );
                [todo] = await updatedTodo.records.map(record => {
                    return record.get("todo").properties;
                });
                console.log('todo', todo)
            } catch (e) {
                console.error(e);
            } finally {
                await session.close();
            }
            return todo;
        },
        updateTodo: async(_, args, ctx) => {
            let todo;
            const { message } = args
            console.log('args', args)
            const session = ctx.driver.session();
            try {
                const updatedTodo = await session.run(
                    `
                    MATCH (todo:Todo{id: $args.id}) 
                    SET todo.message = $message
                    RETURN todo
                `, { args, message }
                );
                [todo] = await updatedTodo.records.map(record => {
                    return record.get("todo").properties;
                });
                console.log('todo', todo)
            } catch (e) {
                console.error(e);
            } finally {
                await session.close();
            }
            return todo;
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
        login: async(object, params, ctx) => {
            const session = ctx.driver.session();
            try {
                const result = await session.run(
                    "MATCH (user:User) WHERE user.email = $email RETURN user", {
                        email: params.email
                    }
                );
                const [user] = await result.records.map(record => {
                    return record.get("user").properties;
                });

                if (user !== undefined) {
                    let token = encode(user);
                    return {
                        token: token,
                        email: user.email,
                        role: user.role
                    };
                } else {
                    throw new AuthenticationError("No such user");
                }
            } finally {
                await session.close();
            }
        },

        // login: (_, args) => {
        //     // let jwt;
        //     if ((users.some(u => u.email === args.email && u.password === args.password)) ? true : false) {
        //         users.map(u => (u.email === args.email) ? u.loggedIn = true : u.loggedIn = false)
        //             // let session = { id: uuidv4() };
        //             // sessions.push(session);

        //         // console.log("encode return: " + encode({ email: args.email, password: args.password }))

        //         return { jwt: encode({ email: args.email, password: args.password }) }



        //     }
        // },

        logout: (_, args) => {
            users.map(u => (u.id === args.id) ? u.loggedIn = false : u.loggedIn)
                //  sessions.pop;

            return users.filter(u => u.id === args.id && u.loggedIn === false)


        }
    }


};
module.exports = resolvers;