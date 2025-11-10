  import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Evita que Webpack use cache en disco (filesystem) en desarrollo.
  // En Windows + OneDrive, el renombrado de archivos de cache puede fallar con ENOENT.
  // Usamos cache en memoria para prevenir errores como:
  // [webpack.cache.PackFileCacheStrategy] ENOENT: no such file or directory, rename '...0.pack.gz_' -> '...0.pack.gz'
  webpack: (config, { dev }) => {
    if (dev) {
      // En dev priorizamos estabilidad sobre velocidad de reconstrucción.
      // Cambiamos a cache en memoria para evitar escrituras en .next/cache.
      config.cache = { type: "memory" };
    }
    return config;
  },
};

export default nextConfig;
