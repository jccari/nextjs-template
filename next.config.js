const withBundleAnalyzer = require("@zeit/next-bundle-analyzer");
const path = require("path");

const nextConfig = {
  analyzeServer: ["server", "both"].includes(process.env.BUNDLE_ANALYZE),
  analyzeBrowser: ["browser", "both"].includes(process.env.BUNDLE_ANALYZE),
  bundleAnalyzerConfig: {
    server: {
      analyzerMode: "static",
      reportFilename: "../bundles/server.html"
    },
    browser: {
      analyzerMode: "static",
      reportFilename: "bundles/client.html"
    }
  },
  webpack: (config) => {
    config.resolve.modules = [
      path.resolve('./node_modules'),
      path.resolve('.')
    ];

    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: "empty"
    };

    return config;
  }
};

module.exports = withBundleAnalyzer(nextConfig);
