// Load modules

var Hoek = require('hoek');


// Declare internals

var internals = {};


exports.register = function (plugin, options, next) {

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

    var servers = plugin.servers;
    for (var i = 0, il = servers.length; i < il; ++i) {
        servers[i].views(settings);
    }

    next();
};


exports.register.attributes = {
    pkg: require('../package.json')
};
