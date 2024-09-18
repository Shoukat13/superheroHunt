const { mode } = require('crypto-js');
const path = require('path');

module.exports = {
  entry: {
    bundle: './src/script.js', // Assuming this is your main JS file for the homepage
    homepage: './src/homepage.js', // Add this line to include homepage.js
    favorites: './src/favorites.js', // Include the favorites page JavaScript as well
    superherodetails: './src/superherodetails.js',
  },
  output: {
    filename: '[name].js', // This will create bundle.js, homepage.js, and favorites.js
    path: path.resolve(__dirname, 'dist'),
  },
  // Other Webpack configurations like loaders, plugins, etc.
  mode: 'development',
};