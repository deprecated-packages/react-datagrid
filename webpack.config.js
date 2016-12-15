/*eslint no-console: 0*/
"use strict";

var webpack = require("webpack");
var path = require("path");

//Webpack config
module.exports = {
	entry: {
		datagrid: './src/index.jsx',
		vendor: ["react"]
	},
	resolve: {
		extensions: ["", ".webpack.js", ".web.js", ".js", ".jsx"]
	},
	output: {
		path: path.join(__dirname, "dist"),
		filename: "[name].js",
		publicPath: "http://localhost:9090/"
	},
	devServer: {
		hot: true,
		inline: true,
		contentBase: './dist'
	},
	eslint: {
		configFile: './.eslintrc'
	},
	module: {
		loaders: [
			{test: /\.css$/, loader: "style!css"},
			{test: /\.less$/, loader: "style!css!less"},
			{test: /\.jsx$/, exclude: /node_modules/, loader: "babel!eslint-loader"},
			{test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff"},
			{test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader"}
		]
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: "vendor",
			//pokud je modul pouzity na vice nez 3 mistech jde do chunku
			fileName: "vendor.js",
			minChunks: 3
		})
	]
};