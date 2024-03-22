/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'res.cloudinary.com',
            },
            {
                hostname: "avatars.githubusercontent.com"
            }, 
            {
                hostname: "cloudflare-ipfs.com"
            },
            { hostname: "cloudflare-ipfs.com" }
        ],
    },
};

export default nextConfig;
