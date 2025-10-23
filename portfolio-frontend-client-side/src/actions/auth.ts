'use server';

export const register = async (data: {
    name: string;
    email: string;
    password: string;
}) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (!res?.ok) {
        console.error('User Registration Failed', await res.text());
    }
    const result = await res.json();
    // console.log(result);
    return result;
};

export const login = async (data: { email: string; password: string }) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (!res?.ok) {
        console.error('Login Failed', await res.text());
    }
    const result = await res.json();
    // console.log('Login Result:', result);
    return result;
};
