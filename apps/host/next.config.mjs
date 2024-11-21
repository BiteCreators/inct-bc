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
  transpilePackages: ["@packages/shared"],
  webpack: (config, options) => {
    const {isServer} = options

    config.plugins.push(
      new NextFederationPlugin({
        filename: 'static/chunks/remoteEntry.js',
        name: 'host',
        remotes: {
          // admin: `admin@http://localhost:3001/_next/static/${isServer ? 'ssr' : 'chunks'}/remoteEntry.js`
          admin: `admin@http://localhost:3001/_next/static/chunks/remoteEntry.js`
        },
      })
    )

    return config
  }
};

export default nextConfig;
