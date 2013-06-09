ROOT = 'http://localhost:4180'

if (typeof window === 'undefined') {
  basePath  = '..'
  files     = ['example/karma.js', ROOT + '/build/jstest.js', ROOT + '/example/runner.js']
  autoWatch = true
} else {
  __karma__.start = function() {}
}

