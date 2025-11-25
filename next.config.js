/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    basePath: process.env.NODE_ENV === 'production' ? '/test_react_eco_alpha' : '',
    images: {
        unoptimized: true,
    },
    reactStrictMode: false,
    trailingSlash: true,
};

module.exports = nextConfig;
