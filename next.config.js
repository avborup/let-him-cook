const CopyPlugin = require("copy-webpack-plugin");

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

  // For all the issues with WASM bundling, see https://github.com/vercel/next.js/issues/25852
  webpack: (config, { isServer, dev }) => {
    config.experiments = { ...config.experiments, asyncWebAssembly: true };

    // I think the client configuration is unnecessary since that WASM file
    // is copied into static/media for some reason.
    config.plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: "cooklang-wasm/pkg/wasm-server/cooklang_wasm_bg.wasm",
            to: "./static/wasm/cooklang_wasm_bg-server.wasm",
          },
        ],
      }),
    );

    if (isServer && !dev) {
      config.output.webassemblyModuleFilename =
        "./../static/wasm/cooklang_wasm_bg-server.wasm";
    }

    return config;
  },
};

module.exports = nextConfig;
