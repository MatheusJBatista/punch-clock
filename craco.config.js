const path = require('path')

module.exports = function ({ env, paths }) {
  return {
    babel: {
      presets: [],
      plugins: ['@babel/plugin-proposal-optional-chaining', '@babel/plugin-proposal-nullish-coalescing-operator'],
    },
    webpack: {
      alias: {
        '@environment': path.join(__dirname, 'src', 'environments', process.env.CLIENT_ENV),
        '@constants': path.join(__dirname, 'src', 'constants'),
        '@views': path.join(__dirname, 'src', 'views'),
        '@redux': path.join(__dirname, 'src', 'redux'),
        '@models': path.join(__dirname, 'src', 'models'),
        '@utilities': path.join(__dirname, 'src', 'utilities'),
        '@selectors': path.join(__dirname, 'src', 'selectors'),
        '@api': path.join(__dirname, 'src', 'api'),
      },
      configure: {
        externals: {
          externalConfig: 'externalConfig',
        },
      },
    },
    jest: {
      configure: {
        setupFilesAfterEnv: ['<rootDir>/src/test-setup/setup-tests.js'],
        moduleNameMapper: {
          '^@environment(.*)$': '<rootDir>/src/environments/development',
          '^@constants(.*)$': '<rootDir>/src/constants$1',
          '^@views(.*)$': '<rootDir>/src/views$1',
          '^@redux(.*)$': '<rootDir>/src/redux$1',
          '^@models(.*)$': '<rootDir>/src/models$1',
          '^@utilities(.*)$': '<rootDir>/src/utilities$1',
          '^@selectors(.*)$': '<rootDir>/src/selectors$1',
        },
      },
    },
  }
}
