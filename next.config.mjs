/** @type {import('next').NextConfig} */
const nextConfig = {
 
  env: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "kmpugcliwjahshfdogrz.supabase.co",
        pathname: "/storage/v1/object/public/image-uploads/**",
      },
    ],
  },
};

export default nextConfig;
