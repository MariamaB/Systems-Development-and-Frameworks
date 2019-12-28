/**import { rule, and, or, not } from 'graphql-shield'
import { Context, getUserEmail } from '../_backend/database'

export const isAdmin = rule()(async (parent, args, ctx: Context, info) => {
  const email = getUserEmail(ctx)
  // Is there a Grocer with such email in our database (Prisma)?
  return ctx.db.exists.Admin({ email })
})

export const isUser = rule()(
  async (parent, args, ctx: Context, info) => {
    const email = getUserEmail(ctx)
    // Is there a Customer with such email in our database (Prisma)?
    return ctx.db.exists.User({ email })
  },
)

export const isAuthenticated = or(isUser, isAdmin)*/