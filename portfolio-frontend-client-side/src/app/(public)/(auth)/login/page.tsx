import { Metadata } from 'next';
import LoginForm from '../../../../components/modules/Auth/LoginForm';

export const metadata: Metadata = {
    title: 'Login - Portfolio',
    description: 'Access your account to view your portfolio and projects.',
};

const LoginPage = () => {
    return (
        <div>
            <LoginForm />
        </div>
    );
};

export default LoginPage;
