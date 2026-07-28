/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // framer-motion isn't in Next's default optimizePackageImports list.
    // Mostly a dev-compile win (its barrel re-exports ~200 symbols); prod
    // tree-shaking already works since the package sets sideEffects: false.
    optimizePackageImports: ["framer-motion"],
  },
};

export default nextConfig;
