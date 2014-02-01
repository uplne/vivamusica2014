var specs = [];

for (var file in window.__karma__.files) {
  if (window.__karma__.files.hasOwnProperty(file)) {
    if (/Spec\.js$/.test(file)) {
      specs.push(file);
    }
  }
}

requirejs.config({
    // Karma serves files from '/base'
    baseUrl: '/base/static/js',

    "paths": {
        //jquery: '//ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min'
        jquery: 'lib/jquery/jquery'
    },

    // ask Require.js to load these files (all our tests)
    deps: specs,

    // start test run, once Require.js is done
    callback: window.__karma__.start
});