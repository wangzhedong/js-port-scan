const merge = require('webpack-merge');
const common = require('./webpack.base.js');
const path = require('path');

module.exports = merge(common, {
    devtool: 'inline-source-map',
    devServer: {
        contentBase: '../dist',
        port: 7000,
        host: '0.0.0.0',
        historyApiFallback: {
            rewrites: [
                { from: /.*/, to: path.posix.join('/', 'index.html') },
            ],
        },
    },
    output: {
        filename: 'js/[name].[hash].js',
        path: path.resolve(__dirname, '../dist'),
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    // 'postcss-loader',
                    { loader: 'sass-loader' },
                    // 全局引入公共的scss样式
                    /*  {
                         loader: 'sass-resources-loader',
                         options: {
                             sourceMap: true,
                             resources: ['./src/assets/styles/common.scss'],
                         },
                     }, */
                ],
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    // 'postcss-loader',
                    'less-loader',
                ],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            limit: 5000,
                            name: 'imgs/[name].[ext]',
                            // publicPath: '../'
                        },
                    },
                ],
            },
        ],
    },
    mode: 'development',
});
