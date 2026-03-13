/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["cdn.imagin.studio"],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**.supabase.co",
            },
            {
                protocol: "https",
                hostname: "images.unsplash.com",
            },
        ],
    },
};

module.exports = nextConfig;
