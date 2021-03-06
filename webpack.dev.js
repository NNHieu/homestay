const path = require('path');

// const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'eval-cheap-module-source-map',
    entry: './frontend/src/index.js',
    output: {
        path: path.resolve('./frontend/static/frontend', 'js'),
        filename: 'main.js'
    },

    devServer: {
        port: 8080,
        contentBase: path.join(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                // options: {
                //     presets: ['env']
                // }
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    {
                        // creates style nodes from JS strings
                        loader: "style-loader",
                    },
                    {
                        // translates CSS into CommonJS
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        // compiles Sass to CSS
                        loader: "sass-loader",
                        options: {
                            sourceMap: true,
                            sassOptions: {
                                outputStyle: 'compressed',
                            },
                            // sourceMapContents: true
                        }
                    },
                    // Please note we are not running postcss here
                ]
            }
            ,
            {
                // Load all images as base64 encoding if they are smaller than 8192 bytes
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            // On development we want to see where the file is coming from, hence we preserve the [path]
                            name: '[path][name].[ext]?hash=[hash:20]',
                            limit: 8192
                        }
                    }
                ]
            },
            {
                test: /\.md$/,
                use: [
                    {
                        loader: "html-loader"
                    },
                    {
                        loader: "markdown-loader",
                        options: {
                            /* your options here */
                        }
                    }
                ]
            }
        ],
    },
    // plugins: [
    //     new HtmlWebpackPlugin({
    //         template: './index.html',
    //         inject: true
    //     })
    // ]
};