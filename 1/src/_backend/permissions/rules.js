const { rule, shield } = require('graphql-shield')

const isAuthenticated = rule({ cache: 'contextual' })(
    async(parent, args, ctx, info) => {
        console.log(info);
        return ctx.user !== null
    },
)

const permissions = shield({
    Query: {
        todos: isAuthenticated
    },
    Mutation: {
        changeTodoStatus: isAuthenticated,
    }
})


/****************************************************** */

// const schema = require('./../schema');
// const { applyMiddleware } = require('graphql-middleware')

// const permissions = async(resolve, root, args, context, info) => {
//     console.log(`1. logInput: ${JSON.stringify(args)}`)
//     const result = await resolve(root, args, context, info)
//     console.log(`5. logInput`)
//     return result

// }
/****************************************************** */


module.exports = permissions;


// module.exports = applyMiddleware(schema, permissions);



















// export const isAdmin = rule()(async (parent, args, ctx: Context, info) => {
//   const email = getUserEmail(ctx)
//   // Is there a Grocer with such email in our database (Prisma)?
//   return ctx.db.exists.Admin({ email })
// })

// export const isUser = rule()(
//   async (parent, args, ctx: Context, info) => {
//     const email = getUserEmail(ctx)
//     // Is there a Customer with such email in our database (Prisma)?
//     return ctx.db.exists.User({ email })
//   },
// )

// export const isAuthenticated = or(isUser, isAdmin)