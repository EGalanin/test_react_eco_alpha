/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/test_react_eco_alpha',
  images: {
    unoptimized: true,
  },
  // Отключаем минификацию для отладки (опционально)
  swcMinify: false,
};

module.exports = nextConfig;
