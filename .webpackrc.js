const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
const path = require("path")

module.exports = {
	entry: "./interface/index.js",
	devtool: "inline-source-map",
	target: "web",
	cache: true,
	module: {
		rules: [
			{
				test: [/\.js$/, /\.jsx$/],
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: [
							[
								"@babel/preset-env",
								{
									targets: {
										esmodules: true,
									},
								},
							],
							"@babel/preset-react",
						],
					},
				},
			},
			{
				test: [/\.s[ac]ss$/i, /\.css$/i],
				use: ["style-loader", "css-loader", "sass-loader", "postcss-loader"],
			},
		],
	},
	plugins: [new NodePolyfillPlugin()],
	resolve: {
		extensions: [".js", ".jsx"],
	},
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "resources"),
	},
	devServer: {
		contentBase: path.join(__dirname, "resources"),
		compress: true,
		port: 8080,
		hot: true,
		inline: true,
		disableHostCheck: true,
		historyApiFallback: true,
	},
	stats: {
		warnings: false,
	},
}
