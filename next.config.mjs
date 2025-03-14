/** @type {import('next').NextConfig} */
const nextConfig = {
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
