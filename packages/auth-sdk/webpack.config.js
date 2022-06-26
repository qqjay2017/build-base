const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

const env = process.env.NODE_ENV || "production";

const isPro = env === 'production'

const htmlPlugin = new HtmlWebpackPlugin({
    template: path.join(__dirname, "./public/index.html"),
    filename: "index.html",
    inject: true,
});

const Define = new webpack.DefinePlugin({
    'process.env': JSON.stringify(process.env),
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    'process.version': JSON.stringify(process.version),
})


/** @type {import('webpack').Configuration} */
const config = {
    mode: env,

    cache: {
        type: "filesystem", //  'memory' | 'filesystem'
        cacheDirectory: path.resolve(__dirname, "node_modules/.cache/webpack"), // 默认将缓存存储在 node_modules/.cache/webpack
    },
    output: {
        path: path.resolve(__dirname, "dist"),


        filename: "index.umd.js",
        library: "CoreAuthSdk",
        libraryTarget: "umd",
        umdNamedDefine: true,
        globalObject: 'this'
    },
    watch: !isPro,
    devServer: isPro ? undefined : {
        hot: true,
        proxy: {
            '/api': {
                target: 'http://ymsl.kxgcc.com:30872/api',
                changeOrigin: true,
                pathRewrite: { '^': '' },
            }
            // pathRewrite:['/api','']
        },

        historyApiFallback: {
            index: "./index.html",
        },
    },
    resolve: {
        // 引入的默认后缀名,一个个找
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
        alias: {
            "@": path.resolve("src"), // 这样配置后 @ 可以指向 src 目录
        },
        fallback: {
            "buffer": require.resolve("buffer"),
            "util": require.resolve("util"),
            "stream": require.resolve("stream-browserify"),
            "crypto": require.resolve("crypto-browserify"),
            process: false,

        }
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
    plugins: isPro ? [Define] : [
        Define,
        htmlPlugin
    ],
};

module.exports = config;
