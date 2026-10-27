var Models = {};
Models.User = AA.Mongo.model('User', AA.Schema.user);
module.exports = Models;