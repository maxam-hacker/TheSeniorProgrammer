module.exports = {
	mode: 'development',
	entry: './theraphosa.js',
	output: {
		filename: "theraphosa.js"
	},
	node: {
		fs: "empty",
		net: 'empty',
    	tls: 'empty',
	},
	target: 'electron-renderer'
};