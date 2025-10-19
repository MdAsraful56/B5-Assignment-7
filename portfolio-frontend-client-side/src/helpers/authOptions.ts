import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

declare module 'next-auth' {
    interface Session {
        user: {
            id: string;
            name?: string;
            email?: string;
            image?: string | null;
            role?: string;
        };
    }
    interface User {
        id: string;
        name?: string;
        email?: string;
        image?: string | null;
        role?: string;
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'text',
                },
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
                    console.log('res backend ', res);
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
                            role: user.role || 'USER',
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
        // async signIn({ user, account }) {
        //     try {
        //         console.log('user.....', user);
        //         console.log('account.....', account);
        //         // আপনার backend API call
        //         await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user/create`, {
        //             method: 'POST',
        //             body: JSON.stringify({
        //                 email: user.email,
        //                 name: user.name,
        //                 image: user.image,
        //                 provider: account?.provider,
        //             }),
        //         });
        //         return true;
        //     } catch (error) {
        //         console.error('Save user error:', error);
        //         return false;
        //     }
        // },
        async signIn({ user, account }) {
            try {
                // console.log('user.....', user);
                // console.log('account.....', account);

                // Backend API call
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

                // Response check করুন
                if (!response.ok) {
                    const errorData = await response.json();
                    console.error('Backend error:', errorData);

                    // যদি user already exist করে, তাহলেও login allow করুন
                    if (response.status === 409 || response.status === 400) {
                        console.log('User already exists, allowing login');

                        // User role set করুন
                        user.role = 'USER';

                        return true;
                    }

                    return false;
                }

                const data = await response.json();
                console.log('User created/updated:', data);
                user.role = data?.data?.role;

                console.log(user.role, '..................');

                return true;
            } catch (error) {
                console.error('Save user error:', error);

                // Network error হলেও login allow করতে পারেন (optional)
                // return true;

                return false;
            }
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role || 'user';
            }
            return token;
        },
        async session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.id as string;
                session.user.role = token.role as string;
            }
            return session;
        },
    },
    session: {
        strategy: 'jwt', // ⭐ এটা important
    },
    secret: process.env.AUTH_SECRET as string,
    pages: {
        signIn: '/login',
    },
};
