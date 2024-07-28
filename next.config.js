/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/recipes",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
