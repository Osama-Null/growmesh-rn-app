import "dotenv/config";

export default {
  expo: {
    name: "growmesh-rn-app",
    slug: "growmesh-rn-app",
    version: "1.0.0",
    extra: {
      grokApiKey: process.env.GROK_API_KEY,
    },
    android: {
      statusBar: {
        translucent: false,
      },
    },
    plugins: ["expo-secure-store"],
  },
};
