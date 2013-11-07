ROOT = 'http://localhost:4180'

if (typeof window === 'undefined') {
  module.exports = function(config) {
    config.set({
      autoWatch: true,
      basePath:  '..',
      files: [
        ROOT + '/example/karma.js',
        ROOT + '/build/jstest.js',
        ROOT + '/example/runner.js'
      ]
    })
  }
} else {
  __karma__.start = function() {}
}

