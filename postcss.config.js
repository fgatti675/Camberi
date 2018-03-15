module.exports = {
    plugins: [
      require('autoprefixer')({ browsers: [
        'Android 2.3',
        'Android >= 4',
        'Chrome >= 35',
        'Firefox >= 31',
        'Explorer >= 9',
        'iOS >= 7',
        'Opera >= 12',
        'Safari >= 7.1',
      ] })
    ]
  }
  