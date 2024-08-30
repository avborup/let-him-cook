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

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/recipePhotos/*",
      },
    ],
  },

  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack },
  ) => {
    // Use the client static directory in the server bundle and prod mode
    // Fixes `Error occurred prerendering page "/"`
    config.output.webassemblyModuleFilename =
      isServer && !dev
        ? "../static/pkg/[modulehash].wasm"
        : "static/pkg/[modulehash].wasm";

    // Since Webpack 5 doesn't enable WebAssembly by default, we should do it manually
    config.experiments = { ...config.experiments, asyncWebAssembly: true };

    return config;
  },
};

module.exports = nextConfig;
