var child     = require('child_process'),
    event     = require('event-stream'),
    http      = require('http'),
    url       = require('url'),
    WebSocket = require('faye-websocket')

var root = __dirname + '/../..',
    bin  = root + '/build/bin/jstest',
    spec = root + '/example/spec/set_spec.js'

var server = http.createServer()

server.on('upgrade', function(request, socket, body) {
  var ws = new WebSocket(request, socket, body),

      params  = url.parse(request.url, true).query,
      tests   = JSON.parse(params.test),

      options = tests.reduce(function(o, t) { return o.concat(['-t', t]) }, []),
      argv    = ['-f', 'json'].concat(options).concat([spec]),
      proc    = child.spawn(bin, argv),
      split   = event.split('\n')

  proc.stdout.pipe(split).pipe(ws)
})

server.listen(8888)

