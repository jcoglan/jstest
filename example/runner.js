var run = function() {
  setTimeout(function() { JS.Test.autorun() }, 10)
}

var ROOT = JS.ENV.ROOT || '.'
JS.cache = false

JS.load(  ROOT + '/example/helpers.js',
          ROOT + '/example/lib/jquery.js',

          ROOT + '/example/lib/set.js',
          ROOT + '/example/spec/set_spec.js',

          ROOT + '/example/lib/widget.js',
          ROOT + '/example/spec/widget_spec.js',

          run)

