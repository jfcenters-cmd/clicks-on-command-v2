import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "frame-ancestors 'self'",
              "https://builder.io",
              "https://*.builder.io",
              "https://builder.codes",
              "https://*.builder.codes",
            ].join(" "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
