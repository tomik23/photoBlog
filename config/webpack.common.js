const path = require('path');
const fs = require('fs');
const buildMode =
  process.env.NODE_ENV === 'production' ? 'production' : 'development';
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

const dataFiles = fs.readdirSync(path.resolve(__dirname, '../sources/', 'data'));

// Configure Html Loader
const configureHtmlLoader = (mode) => {
  const type = mode === 'production' ? true : false;
  return {
    test: /\.html$/,
    use: [
      {
        loader: 'html-loader',
        options: {
          minimize: type
        }
      },
    ],
  };
};

// Configure Babel Loader
const configureBabelLoader = () => {
  return {
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
    },
  };
};

// Configure Pug Loader
const configurePugLoader = () => {
  return {
    test: /\.pug$/,
    loader: 'pug-loader',
    options: {
      pretty: true,
      self: true,
    },
  };
};

// Configure File Loader
const configureFileLoader = () => {
  return {
    test: /\.(jpe?g|png|gif|svg)$/i,
    loader: 'file-loader',
    options: {
      name: '[name].[ext]',
    },
  };
};

// Multiple Entry
const entryHtmlPlugins = dataFiles.map(entryName => {
  const nameData = entryName.split('.')[0];
  const templateName = nameData === 'index' ? 'index' : 'article';

  return new HtmlWebPackPlugin({
    filename: `${nameData}.html`,
    template: `./sources/templates/${templateName}.pug`,
    DATA: require(`../sources/data/${entryName}`),
    chunks: [templateName, 'share'],
    inject: true,
    cache: true
  });
});

module.exports = {
  entry: {
    index: {
      import: './sources/js/index.js',
      dependOn: 'share'
    },
    article: {
      import: './sources/js/article.js',
      dependOn: 'share'
    },
    share: ['./sources/js/share.js']
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'vendor/js/[name].[fullhash].js',
    chunkFilename: 'vendor/js/[name].[fullhash].chunk.js',
  },
  resolve: {
    alias: {
      'styles': path.resolve(__dirname, '../sources/scss')
    }
  },
  module: {
    rules: [
      configureHtmlLoader(buildMode),
      configureBabelLoader(),
      configurePugLoader(),
      configureFileLoader(),
    ],
  },
  plugins: [
    ...entryHtmlPlugins
  ]
};
