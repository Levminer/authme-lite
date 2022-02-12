const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
const path = require("path")
let source_map = false

if (process.env.NODE_ENV !== "production") {
	source_map = "inline-source-map"
}

module.exports = {
	entry: "./interface/index.js",
	devtool: source_map,
	target: "web",
	cache: true,
	module: {
		rules: [
			{
				test: [/\.js$/, /\.jsx$/],
				exclude: /node_modules/,
				use: {
					loader: "swc-loader",
					options: {
						jsc: {
							"parser": {
								"syntax": "ecmascript",
								"jsx": true,
							  },
							  "target": "es2016",
						},
					},
				},
			},
			{
				test: [/\.css$/i],
				use: ["style-loader", "css-loader", "postcss-loader"],
			},
		],
	},
	plugins: [new NodePolyfillPlugin()],
	resolve: {
		extensions: [".js", ".jsx"],
	},
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "static"),
	},
	devServer: {
		static: {
			directory: path.join(__dirname, "static"),
		},
		client: {
			overlay: false,
		},
		compress: true,
		port: 8080,
		hot: true,
		historyApiFallback: true,
	},
	stats: {
		warnings: false,
	},
}
