import type { NextConfig } from 'next';

const useRust = process.env.RUST_COMPILER === '1';

const nextConfig: NextConfig = {
  reactCompiler: true,
  experimental: useRust ? { turbopackRustReactCompiler: true } : {},
};

export default nextConfig;
