/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Для статического экспорта, подходящего для Cloudflare Pages
  trailingSlash: true, // Добавлять слэши в конец URL
  images: {
    unoptimized: true // Отключаем оптимизацию изображений для статического экспорта
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        path: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;