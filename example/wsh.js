if (this.ActiveXObject) load = function(path) {
  var fso = new ActiveXObject('Scripting.FileSystemObject'), file, runner
  try {
    file   = fso.OpenTextFile(path)
    runner = function() { eval(file.ReadAll()) }
    runner()
  } finally {
    try { if (file) file.Close() } catch (e) {}
  }
}

load('build/jstest.js')
load('example/runner.js')
