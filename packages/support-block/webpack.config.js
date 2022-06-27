const path = require("path");



const env = process.env.NODE_ENV || "production";
console.log(env);
const isPro = env === 'production'



/** @type {import('webpack').Configuration} */
const config = {
  mode: env,

  cache: {
    type: "filesystem", //  'memory' | 'filesystem'
    cacheDirectory: path.resolve(__dirname, "node_modules/.cache/webpack"), // 默认将缓存存储在 node_modules/.cache/webpack
  },
  output: {
    path: path.resolve(__dirname, "dist"),


    filename: "index.js",
    library: "HelpWebModule",
    libraryTarget: "umd",
    umdNamedDefine: true,
    globalObject: 'this'
  },
  watch: !isPro,
  devServer: isPro ? undefined : {
    hot: true,
  },
  resolve: {
    // 引入的默认后缀名,一个个找
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    alias: {
      // "@": path.resolve("src"), // 这样配置后 @ 可以指向 src 目录
      "@core/rc-components":path.resolve("../rc-components/src/index.ts")
    },
  },

  //   optimization: {
  //     usedExports: true,
  //   },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: ["/node_modules/"],
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        ],
      },
      {
        test: /\.ts(x?)$/,
        use: [
          {
            loader: "ts-loader",
            options: {},
          },
        ],
      },
      {
        test: /\.less$/i,
        use: [
          // compiles Less to CSS
          "style-loader",
          "css-loader",
          "less-loader",
        ],
      },
      {
        test: /\.css$/i,
        use: [
          // compiles Less to CSS
          "style-loader",
          "css-loader",

        ],
      },

    ],
  },
  plugins: isPro ? [] : [
  
  ],
};

module.exports = config;
