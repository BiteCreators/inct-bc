import {NextFederationPlugin} from '@module-federation/nextjs-mf'

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: false,
  },
  i18n: {
    defaultLocale: "ru",
    locales: ["en", "ru"]
  },
  reactStrictMode: true,
  sassOptions: {
    silenceDeprecations: ["legacy-js-api"],
  },
  transpilePackages: ["@packages/shared"],
  webpack: (config, options) => {
    const {isServer} = options

    config.plugins.push(
      new NextFederationPlugin({
        exposes: {
        },
        filename: 'static/chunks/remoteEntry.js',
        name: 'admin',
        remotes: {
          host: `host@http://localhost:3000/_next/static/${isServer ? 'ssr' : 'chunks'}/remoteEntry.js`
          // admin: `admin@http://localhost:3001/_next/static/chunks/remoteEntry.js`
        },
      })
    )

    return config
  },
};

export default nextConfig;
