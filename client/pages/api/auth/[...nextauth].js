
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default NextAuth({
    providers: [
        Providers.GitHub({
            clientId: '74e95634b21158c6c639',
            clientSecret: '02994c31851fd7070d49093c213ad5f1cb6d1339'
        })
    ],
    database: 'mongodb://localhost:27017/mern-pizza',
    session: {
        jwt: true
    },
    jwt: {
        secret: 'ehfbjwfjwmwekf',
        maxAge: 60 * 60 * 24 * 30
    },
    callbacks: {
        async jwt(token, user) {
            if(user) {
                token.id = user.id
                // accessTokenExpires = Date.now() + account.expires_in * 1000,
            }
            return token
        },
        async session(session, token) {
            session.user.id = token.id
            return session
        }
    }
})