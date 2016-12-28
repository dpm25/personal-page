// module.exports = {
//     entry: ['./assets/js/country.js'],
//     output: {
//         path: './assets/build/',
//         filename: 'country-bundle.js'
//     },
//     module: {
//         loaders: [{
//             test: /\.js$/,
//             exclude: /node_modules/,
//             loader: "babel-loader"
//         }]
//     }
// }

var config = {
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader"
        }]
    }
};

var mainConfig = Object.assign({}, config, {
    name: "index-bundle",
    entry: "./assets/js/index.js",
    output: {
        path: './assets/build/',
        filename: 'index-bundle.js'
    },
});

var countryConfig = Object.assign({}, config, {
    name: "country-bundle.js",
    entry: "./assets/js/country.js",
    output: {
        path: './assets/build/',
        filename: 'country-bundle.js'
    },
});

// Return Array of Configurations
module.exports = [
    mainConfig, countryConfig,
];
