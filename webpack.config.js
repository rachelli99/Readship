const path = require('path');
let export_list = [];

export_list.push(
  {
    entry: './read_ship/@react/ReadShip.jsx',
    output: {
      path: path.join(__dirname, '/read_ship/static/jsx/'),
      filename:  'read_ship_bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        }
      ]
    },
    resolve: {
      extensions: ['*', '.js', '.jsx']
    },
  }
);

module.exports = export_list;
