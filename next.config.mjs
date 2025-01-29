/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: {
    buildActivity: false,
  },
  i18n: {
    defaultLocale: "ru",
    locales: ["en", "ru"],
  },
  reactStrictMode: true,
  
};

export default nextConfig;
