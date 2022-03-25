const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { env } = require('process');

module.exports = {
    devServer: {
        static: {
            directory: path.resolve(__dirname,'build'),
            publicPath: '/build'
        },
        // compress: true,
        // port: 8080,
        proxy: {
            '/showdata': 'http://localhost:3000'
        },
        historyApiFallback: true
    },
    entry: '/client/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    mode: process.env.NODE_ENV,
    module: {
        rules: [
            {
                test: /\.jsx?/,
                exclude: '/node_modules',
                use: {
                    loader: 'babel-loader', 
                    options: {
                        presets: ['@babel/preset-env','@babel/preset-react']
                    }
                }
            },
            {
                test: /.(css|scss)$/,
                exclude: '/node_modules',
                use: [
                    'style-loader',
                    'css-loader',
                ]
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin({template:'./index.html'})]
}