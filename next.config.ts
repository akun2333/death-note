const WindiCSSWebpackPlugin = require('windicss-webpack-plugin')
const withTM = require('next-transpile-modules')(['antd-mobile'])

const nextConfig = {
  reactStrictMode: false,
  webpack: (config: any) => {
    config.plugins.push(new WindiCSSWebpackPlugin())
    return config
  }
}

module.exports = withTM(nextConfig)
export {}
