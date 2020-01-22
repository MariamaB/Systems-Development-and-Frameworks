const { rule, shield, deny, allow } = require('graphql-shield')

const isAdmin = rule({ cache: 'contextual' })(
    async(parent, args, { user }) => {
        return user && user.role === 'admin'
    },
)

const isAuthenticated = rule({ cache: 'contextual' })(
    async(parent, args, ctx) => {
        return ctx.user !== null
    },
)

const rules = shield({
    Query: {
        '*': deny,
        todos: isAuthenticated,
        users: isAuthenticated,
    },
    Mutation: {
        login: allow,
        addTodo: isAuthenticated,
        updateTodo: isAuthenticated,
        changeTodoStatus: isAuthenticated,
        assignTodo: isAdmin,
        removeTodo: isAdmin,
    }
})

const middlewares = {
    Query: {
        todos: async(resolve, root, args, context, info) => {
            let result = await resolve(root, args, context, info)
            if (context.user.role !== 'admin') {
                result = result.filter((t) => {
                    if (t.assignedTo !== null) {
                        const { assignedTo } = t
                        if (assignedTo.id == context.user.id) {
                            console.log('assignedTo', assignedTo.email)
                            return t
                        }
                    }
                })
            }
            return result
        }
    }
}

module.exports = { rules, middlewares };