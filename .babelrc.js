const envConfig = process.env.ESM
  ? {modules: false, targets: {esmodules: true}}
  : {};

module.exports = {
  presets: [
    ['@babel/env', envConfig],
  ],
};
