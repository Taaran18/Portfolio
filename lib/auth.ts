import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'

/**
 * NextAuth configuration.
 *
 * Admin credentials are stored in environment variables.
 * In production you can replace this with a DB lookup if you ever
 * want multiple admin users.
 */
export const authOptions: NextAuthOptions = {
  session: { strategy: 'jwt' },

  pages: {
    signIn: '/admin/login',
  },

  providers: [
    CredentialsProvider({
      name: 'Admin Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const adminEmail = process.env.ADMIN_EMAIL
        const adminPassword = process.env.ADMIN_PASSWORD

        if (!adminEmail || !adminPassword) {
          throw new Error('Admin credentials not configured')
        }

        if (credentials.email !== adminEmail) return null

        // Compare plain text or bcrypt hash – supports both for flexibility
        const passwordMatch = adminPassword.startsWith('$2')
          ? await bcrypt.compare(credentials.password, adminPassword)
          : credentials.password === adminPassword

        if (!passwordMatch) return null

        return { id: '1', email: adminEmail, name: 'Admin' }
      },
    }),
  ],

  callbacks: {
    jwt({ token, user }) {
      if (user) token.role = 'admin'
      return token
    },
    session({ session, token }) {
      if (session.user) {
        (session.user as { role?: string }).role = token.role as string
      }
      return session
    },
  },
}
