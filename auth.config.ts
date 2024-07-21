import type { NextAuthConfig } from 'next-auth'

export const authConfig = {
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: '/login',
    newUser: '/signup'
  },
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnLoginPage = nextUrl.pathname.startsWith('/login')
      const isOnSignupPage = nextUrl.pathname.startsWith('/signup')
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard')
      const isOnChat = nextUrl.pathname.startsWith('/chat')
      const isOnRootPage = nextUrl.pathname === '/'

      if (isLoggedIn) {
        if (isOnLoginPage || isOnSignupPage || isOnRootPage) {
          return Response.redirect(new URL('/chat', nextUrl))
        }
      } else {
        if (isOnDashboard || isOnChat) {
          return Response.redirect(new URL('/login', nextUrl))
        }
      }

      return true
    },
    async jwt({ token, user }) {
      if (user) {
        token = { ...token, id: user.id }
      }

      return token
    },
    async session({ session, token }) {
      if (token) {
        const { id } = token as { id: string }
        const { user } = session

        session = { ...session, user: { ...user, id } }
      }

      return session
    }
  },
  providers: []
} satisfies NextAuthConfig
