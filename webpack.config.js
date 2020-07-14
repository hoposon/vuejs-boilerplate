// webpack.config.js

var webpack = require('webpack');
var path = require('path');

// vue plugin
const VueLoaderPlugin = require('vue-loader/lib/plugin');

// other plugins

module.exports = {
	mode: 'development',
	entry: {
		account: './src/family-js/family.js'
	},
	output: {
		path: path.resolve(__dirname, 'playground/dist'),
		filename: '[name].js'
	},
	module: {
	  rules: [
		// ... other rules
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
	plugins: [
	  new VueLoaderPlugin(),
	  new webpack.ContextReplacementPlugin(/\.\/locale$/, 'empty-module', false, /js$/)
	],
	devtool: 'source-map',
	devServer: {
		contentBase: path.join(__dirname, 'playground/dist'),
		compress: true,
		port: 5000, 
		hot: true,
		disableHostCheck: true,
		historyApiFallback: true
	}
}
