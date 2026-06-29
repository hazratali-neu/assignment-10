// /** @type {import('next').NextConfig} */
// const path = require('path');
// const nextConfig = {
//   /* config options here */
//   outputFileTracingRoot: path.join(__dirname),
//   reactCompiler: true,
//     images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: '***',
       
//       },
//     ],
//   },
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '***',
      },
    ],
  },
};

export default nextConfig;