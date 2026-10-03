import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});

const nextConfig: NextConfig = {
  // Turbopack warning/error ကို ကျော်ရန် empty object သတ်မှတ်ပေးပါ
  experimental: {
    // လိုအပ်ပါက အခြား experimental options များ
  },
  turbopack: {},
};

export default withPWA(nextConfig);
