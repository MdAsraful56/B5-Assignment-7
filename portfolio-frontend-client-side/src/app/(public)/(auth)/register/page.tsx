import { Metadata } from 'next';
import RegisterForm from '../../../../components/modules/Auth/RegisterForm';

export const metadata: Metadata = {
    title: 'Register - Portfolio',
    description: 'Create an account to view your portfolio and projects.',
};

const RegisterPage = () => {
    return (
        <div>
            <RegisterForm />
        </div>
    );
};

export default RegisterPage;
