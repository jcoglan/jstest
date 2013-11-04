var staticHost = 'http://localhost:4180'

exports.tests = {
  environment:  'browser',
  rootPath:     '..',
  sources:      ['build/jstest.js'],
  tests:        ['example/runner.js'],
  autoRun:      false,

  resources: ['/build', '/example'].map(function(path) {
    return {path: path, backend: staticHost + path}
  })
}

