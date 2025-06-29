import type { NextConfig } from "next";
import withTM from "next-transpile-modules";

const withTranspile = withTM([
  "@dfinity/candid",
  "@dfinity/identity",
  "@dfinity/auth-client"
]);

const nextConfig: NextConfig = {};

export default nextConfig;
