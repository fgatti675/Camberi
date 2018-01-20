module.exports = {
    
    entry: './index.js', 

    output: {
        filename: '[name].bundle.js', 
        path: __dirname, 
        publicPath: __dirname
    }, 

    watch: true,
    
    devServer: {
        contentBase: __dirname,
        historyApiFallback: true,
        open: true,
        hot: true,
        compress: true,
        inline: true,
        stats: {
            modules: false,
            hash: false
        }
    }    

};