module.exports = {
    testPathIgnorePatterns: [
      '<rootDir>/node_modules/',
      '<rootDir>/frontend/',
      "<rootDir>/babel.config.js",
      {
        "transform": {
          "^.+\\.js$": "babel-jest"
        }
      } 
    ],
    presets: [
      '@babel/preset-env',
      '@babel/preset-react',
    ],
    plugins: [
      '@babel/plugin-transform-runtime',
    ],
  };
  