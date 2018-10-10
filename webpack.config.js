const webpack = require('webpack');
const miniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const path = require('path');
var MODULE_BUILD_CSS_DIR = path.resolve(__dirname, './src/dist/css/');


const config = {
    context: path.resolve(__dirname, './src/dev'),
    entry: {
        common: './common.js',
        vendor: [
            'jquery',
            'jquery-ui',
            'bootstrap',
            'bootstrap-datepicker',
            'daterangepicker',
            'angular',
            '@uirouter/angularjs',
        ]
    },
    output: {
        path: path.resolve(__dirname, './src/dist'),
        publicPath: '/',
        filename: '[name].bundle.js',
    },
    module: {
        rules: [
            // {
            //     test: /\.js$/,
            //     loader: 'babel-loader',
            //     query: {
            //         presets: ['es2015', 'stage-0'],
            //     }
            // },
            {
                test: /index\.(html)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                        } 
                    }, 'extract-loader',
                ]
            },
            {
                test: /\.(html)$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            minimize: false,
                            attrs: [':data-src']
                        }
                    },
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "less-loader" // compiles Less to CSS
                }]
            },
            {
                test: /\.(sass|scss)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'resolve-url-loader',
                    'sass-loader?sourceMap'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: './webfonts/',
                            publicPath: 'webfonts/',
                        } 
                    }
                   
                ]   
            },
            {
                test: /\.xml$/,
                use: [
                    'xml-loader'
                ]
            },
            {
                test: /\.svg$/,
                use: [
                    'svg-inline-loader'
                ]
            },
            {
                test: /\.(csv|tsv)$/,
                use: [
                    {
                        loader: 'csv-loader'
                    },
                    {
                       loader: 'file-loader',
                       options: {
                            outputPath: './example_csv',
                            publicPath: '.dist/example_csv'
                        }
                    }
                ]
            },
            {
                test: /\.(jpg|jpeg|png|svg)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: './img',
                        publicPath: './dist/img'
                    } 
                }]
            }
        ]
    },
    devServer:{
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
    },
    plugins: [
        new miniCssExtractPlugin({
            filename: "styles.css",
            allChunks: false
        })
      ],
    mode: 'development'
};

let env = process.env.NODE_ENV;
const uglify = new UglifyJsPlugin({});
    if (env === 'producton') {
        config.optimization.minimizer.push(uglify)
    }

module.exports = config;