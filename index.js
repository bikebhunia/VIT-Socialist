if (!global.AA) { global.AA = {}; }

//GET ENVIORMENT
var environment = 'dev';
if (process.argv['env']) {
    switch (process.argv['env'].toLowerCase()) {
        case 'stage':
            environment = 'stage';
            break;
        case 'prod':
            environment = 'prod';
            break;
        default:
            environment = 'dev';
            break;
    }
}

//Modules
AA.async = require('async');
AA.lodash = require('lodash');
AA.Hapi = require("hapi");
AA.Joi = require("joi");
AA.Mongo = require('mongoose');
AA.neo4j = require('neo4j');

//Settings
AA.Settings = require('./settings')({env: environment});

//Data Sets
AA.MongoDB = AA.Mongo.connect(AA.Settings.MONGODB.URL, { useNewUrlParser: true, useUnifiedTopology: true });
AA.MongoDB.then(function () {
    console.log('Mongo connected');
}).catch(function (e) {
    console.log('Mongo connection error:', e.message);
});
AA.NEO4JGraph = new AA.neo4j.GraphDatabase(AA.Settings.NEO4J.URL);
// AA.NEO4J.getNode
AA.Validation = require('./adapters/validate');
AA.Routes = require('./routes');
AA.Schema = require('./schemas');
AA.Models = require('./models');
AA.Controllers = require('./controllers');

AA.server = new AA.Hapi.Server(AA.Settings.PORT, AA.Settings.HOST);

AA.server.route([
    AA.Routes.external.follow.routes.follow,
    AA.Routes.external.follow.routes.unfollow,
    AA.Routes.external.follow.routes.check_relationship,
    AA.Routes.external.users.create_user,
    AA.Routes.external.users.get_user
]);

AA.server.start(function() {
    console.log("Hapi server started @", AA.server.info.uri);
});