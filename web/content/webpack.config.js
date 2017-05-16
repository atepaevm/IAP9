module.exports = {
	entry: './src/index_full.tsx',
	output: {
		filename: 'index.js',
	},
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.tsx?$/,
                use: "source-map-loader"
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: "source-map-loader"
            },
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader',
                exclude: /node_modules/,
            }
        ]
    },

    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    }
};
