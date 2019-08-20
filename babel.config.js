const esm = !!process.env.ESM

module.exports = {
  presets: [
    ['@babel/preset-env', {
      ...(esm ? {modules: false} : {}),
      exclude: [
        '@babel/plugin-transform-typeof-symbol',
      ],
    }],
  ],
  plugins: [
    ['@babel/proposal-decorators', {legacy: true}],
    ['@babel/proposal-class-properties', {loose: true}],
  ]
}
