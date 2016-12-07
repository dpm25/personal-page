module.exports = {
    entry: './assets/js/country.js',
    output: {
        path: './assets/build/',
        filename: 'country-bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader"
        }]
    }
}
