const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const loaders = [];

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
      rules: [
          {
              test: /\.js$/,
              loader: 'babel-loader',
              exclude: /node_modules/
          }, 
          {
              test: /(\.jsx|\.js)$/,
              enforce: 'pre',
              exclude: /node_modules/,
              include: path.resolve(process.cwd(), 'src'),
              // resolve: { extensions: ['.js', '.jsx'] },
              loader: "eslint-loader",
              options: {
               fix: true, 
              },
          }          
      ]
  },
  resolve: {      
      alias: {          
        'react': path.resolve(__dirname, './node_modules/react'),
        'react-dom': path.resolve(__dirname, './node_modules/react-dom'),      
      }  
  },
  externals: {      
    // Don't bundle react or react-dom      
      // react: {          
      //     commonjs: "react",          
      //     commonjs2: "react",          
      //     amd: "React",          
      //     root: "React"      
      // },      
      // "react-dom": {          
      //     commonjs: "react-dom",          
      //     commonjs2: "react-dom",          
      //     amd: "ReactDOM",          
      //     root: "ReactDOM"      
      // }  
  },
  plugins: [
      new HtmlWebpackPlugin({
          template: __dirname + '/src/index.html',
          filename: 'index.html',
          inject: 'body'
      })
  ]    
};


// const path = require('path');
// const autoprefixer = require('autoprefixer');
// const HtmlWebpackPlugin = require('html-webpack-plugin');


// module.exports = {
//   entry: './src/index.js',
//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     filename: 'bundle.js',
//   },
//   resolve: {
//       extensions: ['.js', '.jsx']
//   },
//   devServer: {
//     publicPath: '/dist',
//     filename: 'bundle.js'
//   },
//   module: {
//       rules: [
//           {
//               test: /\.js$/,
//               loader: 'babel-loader',
//               exclude: /node_modules/
//           },
//           // {
//           //     test: /\.css$/,
//           //     exclude: /node_modules/,
//           //     use: [
//           //         { loader: 'style-loader' },
//           //         { 
//           //             loader: 'css-loader',
//           //             options: {
//           //                 modules: {
//           //                     localIdentName: "[name]__[local]___[hash:base64:5]",
//           //                 },														
//           //                 sourceMap: true
//           //             }
//           //          },
//           //          { 
//           //              loader: 'postcss-loader',
//           //             options: {
//           //                 postcssOptions: {
//           //                     plugins: [
//           //                         [ 'autoprefixer', {}, ],
//           //                     ],
//           //                 },
//           //             }
//           //           }
//           //     ]
//           // },
//           // {
//           //     test: /\.(png|jpe?g|gif)$/,
//           //     loader: 'url-loader?limit=10000&name=img/[name].[ext]'
//           // }
//       ]
//   },
//   // plugins: [
//   //     new HtmlWebpackPlugin({
//   //         template: __dirname + '/src/index.html',
//   //         filename: 'index.html',
//   //         inject: 'body'
//   //     })
//   // ]  
// };