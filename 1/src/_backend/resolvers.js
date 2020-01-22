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
            return neo4jgraphql(object, params, ctx, info);
        },
        user: (_, args) => users.filter(e => e.email === args.email)[0],

        Sorting: (_, args) => {
            let newtodos = JSON.parse(JSON.stringify(todos));
            return sortTodo(newtodos, args.orderBy);

        }

    },

    Mutation: {
        addTodo: async(_, args, ctx) => {
            let todo;
            const session = ctx.driver.session();
            try {
                const newTodo = await session.run(
                    `
                    CREATE (todo:Todo { id: $id, message: $message, status: false, createdAt: $date, assignedTo: 0})
                    RETURN todo
                `, { message: args.message, date: (new Date).getTime(), id: uuidv4() }
                );

                [todo] = await newTodo.records.map(record => {
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

        removeTodo: async(_, args, ctx) => {
            const session = ctx.driver.session();
            try {
                await session.run(
                    `
                    MATCH (todo:Todo {id: $id}) DELETE todo RETURN todo
                `, { id: args.id }
                );

            } catch (e) {
                console.error(e);
            } finally {
                await session.close();
            }

            return args;
        },
        assignTodo: async(_, args, ctx) => {
            let todo;
            let user;
            const { assignedTo } = args
            delete args.assignedTo
            const session = ctx.driver.session();

            try {
                const updatedTodo = await session.run(
                    `
                    MATCH (todo:Todo{id: $args.id}) 
                    MATCH (user:User{id: $userId}) 
                    MERGE (todo)-[:ASSIGNED_TO]->(user) 
                    SET todo.assignedTo = $userId
                    RETURN user, todo
                `, { args, userId: assignedTo }
                );
                [todo] = await updatedTodo.records.map(record => {
                    return record.get("todo").properties;
                });

                [user] = await updatedTodo.records.map(record => {
                    return record.get("user").properties;
                });

                todo.assignedTo = user;
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
            } catch (e) {
                console.error(e);
            } finally {
                await session.close();
            }
            return todo;
        },
        changeTodoStatus: async(_, args, ctx) => {
            let todo;
            const session = ctx.driver.session();
            try {
                const updatedTodo = await session.run(
                    `
                    MATCH (todo:Todo{id: $id}) 
                    SET todo.status = $status
                    RETURN todo
                `, { status: args.status, id: args.id }
                );
                [todo] = await updatedTodo.records.map(record => {
                    return record.get("todo").properties;
                });
            } catch (e) {
                console.error(e);
            } finally {
                await session.close();
            }
            return todo;
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
        logout: (_, args) => {
            users.map(u => (u.id === args.id) ? u.loggedIn = false : u.loggedIn)

            return users.filter(u => u.id === args.id && u.loggedIn === false)


        }
    }


};
module.exports = resolvers;