import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Legacy landing URLs. These previously pointed at homepage anchors
      // (/#hms, /#lms, /#cms); they now go straight to the dedicated
      // solution pages so link equity lands on the right URL.
      {
        source: "/hospital-management-software",
        destination: "/solutions/hospital-management-system",
        permanent: true,
      },
      {
        source: "/lab-management-software",
        destination: "/solutions/laboratory-management-system",
        permanent: true,
      },
      {
        source: "/clinic-management-software",
        destination: "/solutions/clinic-management-system",
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
