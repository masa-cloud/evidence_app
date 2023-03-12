import 'dotenv/config';

export default {
  expo: {
    name: 'evidence_app',
    android: {
      adaptiveIcon: {
        backgroundColor: '#ffffff',
        foregroundImage: 'src/assets/images/adaptive-icon.png',
      },
    },
    assetBundlePatterns: ['**/*'],
    extra: {
      example: process.env.example,
    },
    icon: 'src/assets/images/icon.png',
    ios: {
      supportsTablet: true,
    },
    orientation: 'portrait',
    plugins: ['expo-localization'],
    scheme: 'myapp',
    slug: 'evidence_app',
    splash: {
      backgroundColor: '#ffffff',
      image: 'src/assets/images/splash.png',
      resizeMode: 'contain',
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    userInterfaceStyle: 'automatic',
    version: '1.0.0',
    web: {
      bundler: 'metro',
      favicon: 'src/assets/images/favicon.png',
    },
  },
};
