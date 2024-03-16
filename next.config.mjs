/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    env: {
        SERVER_URI: 'http://localhost:3000/api/v1'
    },
    images: {
        remotePatterns: [
            {
                hostname: 'res.cloudinary.com',
            },
            {
                hostname: "avatars.githubusercontent.com"
            }, {
                hostname: "cloudflare-ipfs.com"
            },
            { hostname: "cloudflare-ipfs.com" }
        ],
    },
};

export default nextConfig;
