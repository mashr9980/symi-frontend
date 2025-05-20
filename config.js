const config = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.symi.io',
  webSocketUrl: 'wss://api.symi.io/chat', // WebSocket URL
  webSocketUrlHome: 'wss://api.symi.io/home-chat ', // WebSocket URL
  googleClientId: "506721369558-hlbudtj8s2vdieg3v78r1g7f0l43p8i3.apps.googleusercontent.com",
  googleClientSecret: "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",
  planImages: [
    "/assets/icons/cc7.png",
    "/assets/icons/cc29.jpg",
    "/assets/icons/cc28.png",
  ]
};

export default config;