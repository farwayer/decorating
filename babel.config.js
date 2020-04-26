const esm = !!process.env.ESM

module.exports = {
  presets: [
    ['@babel/preset-env', {
      bugfixes: true,
      loose: true,
      modules: esm ? false : undefined,
    }],
  ],
  plugins: [
    ['@babel/proposal-decorators', {legacy: true}],
    ['@babel/proposal-class-properties', {loose: true}],
  ]
}
