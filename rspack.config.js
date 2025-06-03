const path = require('path');

const debug = process.env.NODE_ENV === "development";

/** @type {import('@rspack/cli').Configuration} */
const config = {
  context: __dirname, // Optional: sets the base directory for resolving entry points and loaders
  entry: {
    main: './src/index.js',
    shape: './src/shape.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    // Rspack's default publicPath is 'auto', which is usually fine.
  },
  mode: debug ? 'development' : 'production',
  devtool: 'source-map',
  resolve: {
    // Add .ts, .tsx, .jsx if you use them, and other extensions.
    extensions: ['...', '.js', '.scss', '.css', '.json'], // '...' includes Rspack defaults like .js, .json, .wasm
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Rspack will use its internal CSS support, these loaders are for webpack compatibility if needed by specific loader syntax
          // but for general sass processing, Rspack's built-in way is preferred.
          // For sass-loader, ensure it's configured if advanced Sass features or options are used.
          {
            loader: 'sass-loader',
            options: {
              // sassOptions, etc.
            },
          },
        ],
        type: 'css/auto', // Handles Sass, extracts CSS in production by default
      },
      {
        test: /\.css$/i,
        type: 'css', // Standard CSS handling
      },
      {
        test: /\.html$/i, // For .html files not processed by Nunjucks
        use: [
          {
            loader: 'html-loader',
            options: {
              sources: {
                list: [
                  {
                    tag: 'img',
                    attribute: 'data-src',
                    type: 'src',
                  },
                  // Add other custom source attributes if needed
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.(njk|nunjucks)$/i,
        use: [
          {
            loader: 'html-loader', // Process attributes in the output of nunjucks
            options: {
              sources: {
                list: [
                  { tag: 'img', attribute: 'data-src', type: 'src' },
                  // any other attributes html-loader should process from nunjucks output
                ],
              },
            },
          },
          {
            loader: 'nunjucks-webpack-loader',
            options: {
              // For `nunjucks-webpack-loader`, ensure options are compatible.
              // Original options for `nunjucks-html-loader` were:
              // minimize: false, (Handled by Rspack's HTML plugin or html-loader)
              // minifyJS: true, (Handled by Rspack's HTML plugin or html-loader)
              // minifyCSS: true, (Handled by Rspack's HTML plugin or html-loader)
              // collapseWhitespace: false, (Handled by Rspack's HTML plugin or html-loader)
              searchPaths: ['./src/templates'], // This is important for nunjucks to find includes/layouts
              // root: path.resolve(__dirname, 'production') // This might be specific to the old loader or project structure
            },
          },
        ],
      },
    ],
  },
  builtins: {
    html: [
      {
        template: './src/index.njk', // Rspack will use loaders defined in module.rules for .njk
        filename: 'index.html',
        // Minification is handled by Rspack in production mode by default for HTML
        // Based on original HtmlWebpackPlugin settings:
        minify: !debug, // Enable minification in production
      },
      {
        template: './src/index.njk', // Assuming this is intentional to reuse the same template
        filename: 'es/index.html',
        minify: !debug,
      },
    ],
    copy: {
      patterns: [
        {
          from: 'src/static',
          // to: 'static' (optional, defaults to output.path + from path)
        },
      ],
    },
    // Rspack handles minification (JS, CSS) by default in production mode.
    // No explicit Terser configuration needed unless for very specific overrides not covered by Rspack's SWC.
  },
  optimization: {
    // Rspack defaults to minimize: true in production mode.
    // Explicitly setting it based on 'debug' can be done if needed for development.
    minimize: !debug,
  },
  // For Rspack's dev server, configuration is typically done via CLI or in a separate devServer object.
  // e.g., devServer: { hot: true, port: 3000, static: { directory: path.resolve(__dirname, 'dist') } }
  // This replaces the BrowserSyncPlugin setup.
};

module.exports = config;
