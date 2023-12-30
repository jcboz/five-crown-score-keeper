module.exports = function (api) {
  const presets = ['babel-preset-expo'];
  const plugins = [
    'transform-class-properties',
    '@babel/plugin-transform-export-namespace-from',
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '~assets': './assets',
          '~components': './components',
          '~config': './config',
          '~helpers': './helpers',
          '~hoc': './hoc',
          '~navigation': './navigation',
          '~screens': './screens',
        },
      },
    ],
    [
      'transform-inline-environment-variables',
      {
        include: ['NODE_ENV'],
      },
    ],
    'react-native-reanimated/plugin', // Reanimated plugin has to be last.
  ];

  if (api.env() === 'development') {
    // dev things here
  } else {
    plugins.push('transform-remove-console');
  }

  api.cache(true);

  return { presets, plugins };
};
