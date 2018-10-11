const envConfig = process.env.ESM ? {modules: false} : {};

module.exports = {
  presets: [
    ['@babel/env', envConfig],
  ],
  plugins: [
    ['@babel/proposal-decorators', {legacy: true}],
    ['@babel/proposal-class-properties', {loose: true}],
  ]
};
