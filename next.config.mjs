import { NextFederationPlugin } from '@module-federation/nextjs-mf';

/** @type {import('next').NextConfig} */
const nextConfig = {
    devIndicators: {
        buildActivity: false,
    },
    experimental: {
        esmExternals: "loose",
    },
    i18n: {
        defaultLocale: "ru",
        locales: ["en", "ru"],
    },
    reactStrictMode: true,
    webpack(config, options) {

        // Добавляем плагин в конфиг
        config.plugins.push(
            new NextFederationPlugin({
                extraOptions: {
                    enableImageLoaderFix: true,
                    enableUrlLoaderFix: true,
                    exposePages: true,
                },
                filename: 'static/chunks/remoteEntry.js',
                name: 'host',
                remotes: {
                    messenger: `messenger@http://localhost:3001/_next/static/chunks/remoteEntry.js`,  // Убедитесь, что этот путь правильный
                },
            })
        );

        return config;
    },
};

export default nextConfig;
