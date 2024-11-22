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
  webpack: (config) => {
    config.plugins.push(
      new NextFederationPlugin({
        exposes: {
          './exposed': './src/components/ExposedComponent.tsx'
        },
        filename: 'static/chunks/remoteEntry.js',
        name: 'admin',
      })
    )

    return config
  }
};

export default nextConfig;
