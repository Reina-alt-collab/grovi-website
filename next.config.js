/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      const originalError = console.error;
      console.error = (...args) => {
        if (
          typeof args[0] === 'string' && 
          args[0].includes('hydration')
        ) {
          return;
        }
        originalError(...args);
      };
    }
    return config;
  }
}

module.exports = nextConfig