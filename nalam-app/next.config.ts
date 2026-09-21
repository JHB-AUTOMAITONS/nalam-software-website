import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/hospital-management-software",
        destination: "/#hms",
        permanent: true,
      },
      {
        source: "/lab-management-software",
        destination: "/#lms",
        permanent: true,
      },
      {
        source: "/clinic-management-software",
        destination: "/#cms",
        permanent: true,
      },
      {
        source: "/healthcare-management-software",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
