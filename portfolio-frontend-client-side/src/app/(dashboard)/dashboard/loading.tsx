'use client';
import Lottie from 'lottie-react';
import loadingData from '../../../../public/assetes/loading.json';

const loading = () => {
    return (
        <div className=' items-center justify-center flex mt-10'>
            <Lottie animationData={loadingData} />
        </div>
    );
};

export default loading;
