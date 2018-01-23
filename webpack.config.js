module.exports = {
    entry: './index.js', 
    output: {
        filename: '[name].bundle.js', 
        path: __dirname, 
        publicPath: __dirname
    }, 
    watch: true
};