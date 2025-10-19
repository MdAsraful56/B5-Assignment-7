import CredentialsProvider from 'next-auth/providers/credentials';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
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
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: 'Credentials',
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
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
    secret: process.env.AUTH_SECRET as string,
    pages: {
        signIn: '/login',
    },
};
