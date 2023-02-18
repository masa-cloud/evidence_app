module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [require.resolve('expo-router/babel')],
      [
        '@tamagui/babel-plugin',
        {
          components: ['tamagui'],
          config: './src/tamagui.config.ts',
          logTimings: true,
          disableExtraction: process.env.NODE_ENV === 'development',
        },
      ],
      [
        'transform-inline-environment-variables',
        {
          include: 'TAMAGUI_TARGET',
        },
      ],
      ['react-native-reanimated/plugin'],
      [
        'babel-plugin-root-import',
        {
          rootPathSuffix: 'src',
          rootPathPrefix: '~',
        },
      ],
    ],
  };
};
