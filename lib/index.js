// Load modules

var Hoek = require('hoek');


// Declare internals

var internals = {
    after: function (options, server, next) {

        Hoek.assert(options, 'Visionary missing configuration');
        Hoek.assert(options.engines, 'Visionary configuration missing engines');

        var settings = Hoek.cloneWithShallow(options, 'engines');
        settings.engines = {};

        // Process configuration

        var engines = Object.keys(options.engines);
        engines.forEach(function (engine) {

            var value = options.engines[engine];
            settings.engines[engine] = typeof value === 'string' ? require(value) : value;
        });

        // Setup manager

        server.root.views(settings);
        return next();
    }
};


exports.register = function (server, options, next) {

    server.dependency('vision', internals.after.bind(null, options));

    return next();
};


exports.register.attributes = {
    pkg: require('../package.json')
};
