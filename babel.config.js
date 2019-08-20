const esm = !!process.env.ESM

module.exports = {
  presets: [
    ['@babel/preset-env', {...(esm ? {modules: false} : {})}],
  ],
  plugins: [
    ['@babel/proposal-decorators', {legacy: true}],
    ['@babel/proposal-class-properties', {loose: true}],
  ]
};
