import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const projectRoot = fileURLToPath(new URL(".", import.meta.url));

const nextConfig: NextConfig = {
  turbopack: {
    root: projectRoot,
  },
};

export default nextConfig;
