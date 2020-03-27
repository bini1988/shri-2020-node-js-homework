module.exports = {
  comments: true,
  presets: [
    ['@babel/preset-env', {
      targets: { browsers: ['last 2 versions'] },
      modules: false,
      loose: true,
      useBuiltIns: false,
    }],
    '@babel/preset-typescript',
    '@babel/preset-react',
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-transform-regenerator',
    '@babel/plugin-transform-runtime'
  ],
  env: {
    test: {
      presets: [
        "@babel/preset-env",
        "@babel/preset-react"
      ],
      plugins: [
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-proposal-object-rest-spread",
        "@babel/plugin-transform-modules-commonjs"
      ]
    }
  },
};
