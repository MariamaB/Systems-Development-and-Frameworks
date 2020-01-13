const { rule, shield, deny, allow, or } = require('graphql-shield')

const isAdmin = rule({ cache: 'contextual' })(
        async(parent, args, { user }) => {
            // console.log('isAdmin', user.role);
            return user && user.role === 'admin'
        },
    )
    // const itsMe = rule({ cache: 'contextual' })(
    //     async(parent, args, { user }) => {
    //         // const result = await resolve(root, args, context, info)
    //         // console.log('itsMe', result.assignedTo.id);
    //         return user && user.role === 'admin'
    //     },
    // )

const isAuthenticated = rule({ cache: 'contextual' })(
    async(parent, args, ctx) => {
        console.log('authenticated', ctx.user.email);
        return ctx.user !== null
    },
)

const isAssignedTo = rule({ cache: 'contextual' })(
    async(resolve, root, args, context, info) => {
        const result = await resolve(root, args, context, info)
        console.log('isAssignedTo')
        result.filter(t => t.assignedTo === context.user.id)
        return result
    },
)



const permissions = shield({
    Query: {
        '*': deny,
        todos: or(isAdmin, isAssignedTo),
        users: isAdmin
    },
    Mutation: {
        assignTodo: isAdmin,
        login: allow,
        addTodo: isAuthenticated,
        updateTodo: isAuthenticated,
        changeTodoStatus: isAuthenticated,
        removeTodo: deny,
    }
})



module.exports = permissions;