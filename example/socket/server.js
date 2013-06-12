var child     = require('child_process'),
    http      = require('http'),
    url       = require('url'),
    split     = require('split'),
    WebSocket = require('faye-websocket')

var bin  = 'bundle',
    argv = ['exec', 'rspec', '-r', './spec/formatter', '-f', 'Formatter', './spec']

var server = http.createServer()

server.on('upgrade', function(request, socket, body) {
  var ws = new WebSocket(request, socket, body),

      params  = url.parse(request.url, true).query,
      tests   = JSON.parse(params.test),

      options = tests.reduce(function(o, t) { return o.concat(['-e', t]) }, []),
      proc    = child.spawn(bin, argv.concat(options))

  proc.stdout.pipe(split()).pipe(ws)
})

server.listen(8888)

