/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "googleusercontent.com",
      "firebasestorage.googleapis.com",
      "github.com",
      "storage.googleapis.com",
    ],
  },
};

module.exports = nextConfig;
