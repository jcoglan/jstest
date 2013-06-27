if (typeof process === 'object') {
  console.log(
    JSON.parse(
      require('fs').readFileSync(__dirname + '/../package.json', 'utf8')
    )
    .testling.scripts.join(' ')
  )
} else {
  JS.Test.autorun(function(runner) {
    runner.setReporter(new JS.Test.Reporters.TAP())
  })
}

