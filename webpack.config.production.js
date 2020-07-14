// webpack.config.production.js

var webpack = require('webpack');
var path = require('path');

// vue plugin
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
	mode: 'production',
	entry: {
		account: './src/family-js/family.js'
	},
	output: {
		path: path.resolve(__dirname, 'lib'),
		filename: '[name].js'
	},
	module: {
	  rules: [
		{
			test: /\.vue$/,
			loader: 'vue-loader'
		},
		{
			enforce: 'pre',
			test: /\.(js|vue)$/,
			loader: 'eslint-loader',
			exclude: /node_modules/
		},
		{
			test: /\.js?$/,
			// loader: 'babel-loader',
			exclude: file => (
				/node_modules/.test(file) &&
				!/\.vue\.js/.test(file)
			),
			use: {
				loader: 'babel-loader',
				options: {
				  	presets: [
						[
							'@babel/preset-env', 
							{
								//   include: ["*flat*"],
								"useBuiltIns": "entry",
						  		"corejs": 3
							}
						]
					]
				}
			}
			// query: {
			// 	presets: ['@babel/preset-env']
			// }
		},
		{
			test: /\.styl(us)?$/,
			use: [
				'vue-style-loader',
				'css-loader',
				'stylus-loader'
			]
		}
	  ]
	},
	optimization: {
		splitChunks: {
			chunks: 'all',
			minSize: 30000,
			maxSize: 0,
			minChunks: 1,
			maxAsyncRequests: 5,
			maxInitialRequests: 3,
			automaticNameDelimiter: '-',
			name: true,
			cacheGroups: {
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					priority: -10
				},
				default: {
					minChunks: 2,
					priority: -20,
					reuseExistingChunk: true
				}
			}
		}
	},
	plugins: [
	  new VueLoaderPlugin(),
	  new webpack.ContextReplacementPlugin(/\.\/locale$/, 'empty-module', false, /js$/)
	]
}