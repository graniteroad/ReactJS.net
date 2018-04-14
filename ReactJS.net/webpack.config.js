var path = require('path');
var webpack = require('webpack');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var pkg = require('./package.json');

// bundle dependencies in separate vendor bundle
var vendorPackages = Object.keys(pkg.dependencies).filter(function (el) {
    return el.indexOf('font') === -1; // exclude font packages from vendor bundle
});

/*
 * Default webpack configuration for development
 */
var config = {
    devtool: 'eval-source-map',
    cache: true,
    entry: {
        main: path.join(__dirname, "app", "App.js"),
        vendor: vendorPackages
    },
    output: {
        path: path.join(__dirname, "js"),
        filename: '[name].js',
        sourceMapFilename: "[file].map"
    },
    resolve: {
        modules: ['node_modules']
    },
    optimization: {
        minimize: false,
        splitChunks: {
            cacheGroups: {
                default: false,
                commons: {
                    test: /node_modules/,
                    name: "vendor",
                    chunks: "initial",
                    minSize: 1
                }
            }
        }
    },
    plugins: [
    ],
    resolveLoader: {
        moduleExtensions: ['-loader']
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel',
                options: {
                    presets: ['es2015', 'react', 'stage-2']
                }
            }
        }, {
            test: /\.css$/,
            use: [
                { loader: "style-loader" },
                { loader: "css-loader" }
            ]
        }]
    }
}

/*
 * If bundling for production, optimize output
 */
if (process.env.NODE_ENV === 'production') {
    config.devtool = false;

    config.optimization = {
        minimize: true,

    };

    config.plugins = [
        new webpack.optimize.OccurrenceOrderPlugin(),

        new UglifyJsPlugin({
            uglifyOptions: {
                output: {
                    comments: false,
                },
                compress: { warnings: false }
            }
        }),

        new webpack.DefinePlugin({
            'process.env': { NODE_ENV: JSON.stringify('production') }
        })
    ];
};

module.exports = config;
