// Load modules

var Hapi = require('hapi');
var Lab = require('lab');
var Visionary = require('../');

// Declare internals

var internals = {};


// Test shortcuts

var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var expect = Lab.expect;


describe('register()', function () {

    it('registers a views manager', function (done) {

        var views = {
            engines: { 'html': require('handlebars') },
            path: __dirname
        };

        var server = new Hapi.Server();
        server.pack.register({ plugin: Visionary, options: views }, function (err) {

            expect(err).to.not.exist;

            var handler = function (request, reply) {

                return reply.view('test', { message: 'hi' });
            };

            server.route({ method: 'GET', path: '/', handler: handler });

            server.inject('/', function (res) {

                expect(res.result).to.equal('<div>\n    <h1>hi</h1>\n</div>\n');
                done();
            });
        });
    });

    it('registers a views manager (string engine)', function (done) {

        var views = {
            engines: { 'html': 'handlebars' },
            path: __dirname
        };

        var server = new Hapi.Server();
        server.pack.register({ plugin: Visionary, options: views }, function (err) {

            expect(err).to.not.exist;

            var handler = function (request, reply) {

                return reply.view('test', { message: 'hi' });
            };

            server.route({ method: 'GET', path: '/', handler: handler });

            server.inject('/', function (res) {

                expect(res.result).to.equal('<div>\n    <h1>hi</h1>\n</div>\n');
                done();
            });
        });
    });
});
