/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
   typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.pexels.com' },
      { protocol: 'https', hostname: 'localhost' },
    ],
  },
};

export default nextConfig;
