module.exports = {
  presets: [['@babel/preset-env', { targets: { node: 'current' } }]],
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    [
      'babel-plugin-module-resolver',
      {
        alias: {
          '@': './src',
        },
      },
    ],
    [
      '@babel/plugin-transform-typescript',
      {
        allowDeclareFields: true,
        onlyRemoveTypeImports: true,
      },
    ],
  ],
}
