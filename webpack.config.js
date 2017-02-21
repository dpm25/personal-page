let webpack = require('webpack');

let config = {
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader"
        }]
    }
};

let mainConfig = Object.assign({}, config, {
    name: "index-bundle",
    entry: "./assets/js/index.js",
    output: {
        path: './assets/build/',
        filename: 'index-bundle.js'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false }
        })
    ]
});

let countryConfig = Object.assign({}, config, {
    name: "country-bundle.js",
    entry: "./assets/js/country.js",
    output: {
        path: './assets/build/',
        filename: 'country-bundle.js'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false }
        })
    ]
});

let todoConfig = Object.assign({}, config, {
    name: "todo-bundle.js",
    entry: "./assets/js/todo.js",
    output: {
        path: './assets/build/',
        filename: 'todo-bundle.js'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false }
        })
    ]
})

// Return Array of Configurations
module.exports = [
    mainConfig, countryConfig, todoConfig
];
