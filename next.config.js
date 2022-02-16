const WindiCSSWebpackPlugin = require('windicss-webpack-plugin')
const withImages = require('next-images')
const withTM = require('next-transpile-modules')(['antd-mobile'])

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outDir: 'dist',
  webpack(config) {
    config.plugins.push(new WindiCSSWebpackPlugin())
    return config
  },
}

module.exports = withTM(withImages(nextConfig));
