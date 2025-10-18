import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    /* config options here */
};

module.exports = {
    images: {
        domains: ['images.unsplash.com', 'www.wyv.com', 'www.zyb.com.au'],
        // Add this line
    },
};

export default nextConfig;
