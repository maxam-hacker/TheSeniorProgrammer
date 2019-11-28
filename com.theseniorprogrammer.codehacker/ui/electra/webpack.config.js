module.exports = {
	mode: 'development',
	entry: './app.js',
	module: {
		rules: [
		  {
			test: /\.css$/i,
			use: ['style-loader', 'css-loader'],
		  },
		  {
			test: /\.(js|jsx)$/,
			exclude: /node_modules/,
			use: {
			  loader: 'babel-loader',
			},
		  },
		],
	  },
	node: {
		fs: "empty",
		net: 'empty',
    	tls: 'empty',
	},
	output: {
		filename: "theraphosa.js",
		crossOriginLoading: "anonymous"
	},
	target: 'electron-renderer'
};