var child     = require('child_process'),
    event     = require('event-stream'),
    http      = require('http'),
    url       = require('url'),
    WebSocket = require('faye-websocket')

var bin  = 'bundle',
    base = ['exec', 'rspec', '-r', './spec/formatter', '-f', 'Formatter'],
    spec = './spec'

var server = http.createServer()

server.on('upgrade', function(request, socket, body) {
  var ws = new WebSocket(request, socket, body),

      params  = url.parse(request.url, true).query,
      tests   = JSON.parse(params.test),

      options = tests.reduce(function(o, t) { return o.concat(['-e', t]) }, []),
      argv    = base.concat(options).concat([spec]),
      proc    = child.spawn(bin, argv),
      split   = event.split('\n')

  proc.stdout.pipe(split).pipe(ws)
})

server.listen(8888)

