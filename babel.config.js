module.exports = {
  comments: true,
  presets: [
    ['@babel/preset-env', {
      targets: { browsers: ['last 2 versions'] },
      modules: false,
      loose: true,
      useBuiltIns: false,
    }],
    '@babel/preset-react',
  ],
  plugins: [
    '@babel/plugin-transform-runtime',
    '@babel/plugin-syntax-class-properties',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-object-rest-spread',
  ],
};
