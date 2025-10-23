import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

// ⭐ TypeScript Types Declaration
declare module 'next-auth' {
    interface Session {
        user: {
            id: string;
            name?: string;
            email?: string;
            image?: string | null;
            role: string;
        };
        // backendToken?: string;
    }
    interface User {
        id: string;
        name?: string;
        email?: string;
        image?: string | null;
        role?: string;
        // backendToken?: string;
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        id?: string;
        email?: string;
        role?: string;
        backendToken?: string;
    }
}

// ⭐ Helper function: Backend থেকে user data fetch করুন
async function fetchUserFromBackend(email: string) {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/user/email/${email}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        if (response.ok) {
            const data = await response.json();
            return {
                id: data?.data?._id || data?.data?.id,
                email: data?.data?.email,
                role: data?.data?.role || 'user',
                token: data?.data?.token,
            };
        }
    } catch (error) {
        console.error('Failed to fetch user from backend:', error);
    }
    return null;
}

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        // GitHubProvider({
        //     clientId: process.env.GITHUB_ID as string,
        //     clientSecret: process.env.GITHUB_SECRET as string,
        // }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    console.error('Invalid credentials');
                    return null;
                }

                try {
                    const res = await fetch(
                        `${process.env.NEXT_PUBLIC_BASE_API}/auth/login`,
                        {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                email: credentials.email,
                                password: credentials.password,
                            }),
                        }
                    );

                    if (!res?.ok) {
                        console.error('Login Failed', await res.text());
                        return null;
                    }

                    const result = await res.json();
                    const user = result?.data?.user;

                    if (user?.id) {
                        return {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            image: user.picture || null,
                            role: user.role || 'user',
                            backendToken: result?.data?.token,
                        };
                    } else {
                        return null;
                    }
                } catch (error) {
                    console.error('Login Failed', error);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        // ⭐ Step 1: signIn
        async signIn({ user, account }) {
            if (account?.provider === 'credentials') {
                return true;
            }

            try {
                // OAuth - Backend এ user create করুন
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_BASE_API}/user/create`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            email: user.email,
                            name: user.name,
                            image: user.image,
                            provider: account?.provider,
                        }),
                    }
                );

                if (!response.ok) {
                    if (response.status === 409 || response.status === 400) {
                        // console.log('User already exists');
                        // ⭐ Existing user - backend থেকে fresh data fetch করুন
                        const userData = await fetchUserFromBackend(
                            user.email!
                        );
                        if (userData) {
                            user.role = userData.role;
                            user.id = userData.id;
                            // user.backendToken = userData.token;
                        } else {
                            user.role = 'user'; // Fallback
                        }
                        return true;
                    }
                    return false;
                }

                const data = await response.json();
                user.role = data?.data?.role || 'user';
                user.id = data?.data?._id || data?.data?.id || user.id;
                // user.backendToken = data?.data?.token;

                return true;
            } catch (error) {
                console.error('Save user error:', error);
                return false;
            }
        },

        // ⭐ Step 2: JWT - প্রতিবার backend থেকে role fetch করুন
        async jwt({ token, user, trigger, session }) {
            // প্রথম login এ
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.role = user.role || 'user';
                // token.backendToken = user.backendToken;
            }

            // ⭐ IMPORTANT: প্রতিবার JWT refresh হলে backend থেকে role fetch করুন
            // এটা করলে backend এ role change করলে session এ update হবে
            if (token.email && !user) {
                const userData = await fetchUserFromBackend(token.email);
                if (userData) {
                    token.role = userData.role; // ⭐ Fresh role set করুন
                    token.id = userData.id;
                }
            }

            // Manual session update
            if (trigger === 'update' && session) {
                token.role = session.role;
            }

            return token;
        },

        // ⭐ Step 3: Session
        async session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.id as string;
                session.user.role = (token.role as string) || 'user';
                // session.backendToken = token.backendToken as string;
            }
            return session;
        },
    },
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    secret: process.env.AUTH_SECRET as string,
    pages: {
        signIn: '/login',
    },
};
