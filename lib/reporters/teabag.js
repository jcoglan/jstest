// https://github.com/modeset/teaspoon

Test.Reporters.extend({
  Teaspoon: new JS.Class({
    extend: {
      Spec: new JS.Class({
        initialize: function(spec) {
          this._spec           = spec;
          this.fullDescription = spec.event.fullName;
          this.description     = spec.event.shortName;
          this.parent          = Test.Reporters.Teaspoon.Suite.find(spec.event.context);
          this.link            = '?grep=' + encodeURIComponent(this.fullDescription);
        },

        errors: function() {
          var errors = [], faults = this._spec.faults;

          for (var i = 0, n = faults.length; i < n; i++) {
            errors.push(faults[i].error);
          }
          return errors;
        },

        getParents: function() {
          if (this._parents) return this._parents;
          this._parents = [];
          var context = this._spec.event.context;
          for (var i = 1, n = context.length; i < n; i++) {
            this._parents.push(Test.Reporters.Teaspoon.Suite.find(context.slice(0, i)));
          }
          return this._parents;
        },

        result: function() {
          var status = 'passed';
          if (this._spec.faults.length > 0) status = 'failed';
          return {status: status, skipped: false};
        }
      }),

      Suite: new JS.Class({
        extend: {
          _cache: {},

          find: function(context) {
            var key = context.join('~');
            if (key === '') return null;
            return this._cache[key] = this._cache[key] || {context: context};
          }
        },

        initialize: function(suite) {
          var context = suite.context;
          this.fullDescription = context.join(' ');
          this.description     = context[context.length - 1];
          this.parent          = this.klass.find(context.slice(0, context.length - 1));
          this.link            = '?grep=' + encodeURIComponent(this.fullDescription);
        }
      })
    },

    initialize: function(options, teaspoon) {
      this._teaspoon = teaspoon;
    },

    startSuite: function(event) {
      this._teaspoon.reportRunnerStarting({total: event.size});
    },

    startContext: function(event) {},

    startTest: function(event) {
      this._faults = [];
      if (this._teaspoon.reportSpecStarting)
        this._teaspoon.reportSpecStarting({event: event, faults: this._faults});
    },

    addFault: function(event) {
      event.error.stack = event.error.backtrace;
      this._faults.push(event);
    },

    endTest: function(event) {
      this._teaspoon.reportSpecResults({event: event, faults: this._faults});
    },

    endContext: function(event) {},

    update: function(event) {},

    endSuite: function(event) {
      this._teaspoon.reportRunnerResults();
    }
  })
});

(function() {
  if (!JS.ENV.Teaspoon) return;

  Teaspoon.Reporters.HTML.prototype.envInfo = function() {
    return 'jstest';
  };

  Teaspoon.Runner.prototype.setup = function() {
    var options = {};
    if (Teaspoon.params.grep) options.test = [Teaspoon.params.grep];

    var teaspoon = this.getReporter(),
        reporter = new Test.Reporters.Teaspoon({}, new teaspoon());

    Test.autorun(options, function(runner) {
      runner.setReporter(reporter);
    });
  };

  Teaspoon.Spec  = Test.Reporters.Teaspoon.Spec;
  Teaspoon.Suite = Test.Reporters.Teaspoon.Suite;
})();

