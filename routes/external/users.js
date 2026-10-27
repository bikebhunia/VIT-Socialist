var users = {};
var _ = AA.lodash;
var joi = AA.Joi;
var valid = AA.Validation;

users.create_user = {
    method: 'POST',
    path: '/api/{client_id}/users/create',
    config: {
        handler: function (request, reply) {
            var args = _.merge(request.params, request.payload);
            joi.validate(args, valid.User.create_user, function (err, value) {
                if (err) {
                    return reply({ code: 'Fail', err: { code: err.name, details: err.details[0] } });
                }
                var doc = new AA.Models.User({
                    client_id: args.client_id,
                    username: args.username,
                    email: args.email,
                    phone: args.phone,
                    name: _.compact([args.first_name, args.middle_name, args.last_name]).join(' ')
                });
                doc.user_id = String(doc._id);
                doc.save(function (saveErr, saved) {
                    if (saveErr) {
                        console.log('Mongo error:', saveErr);
                        return reply({ code: 'err', result: 'Error saving user' });
                    }
                    return reply({ code: 'OK', result: saved });
                });
            });
        }
    }
};

users.update_user = {
    method: 'PUT',
    path: '/api/{client_id}/users/{user_id}/update',
    config: {
        handler: function (request, reply) {
            var args = _.merge(request.params, request.payload);
            joi.validate(args, valid.User.user_update, function (err, value) {
                if (err) {
                    return reply({ code: 'Fail', err: { code: err.name, details: err.details[0] } });
                }
                return reply({response: 'OK', result: args});
            });
        }
    }
};

users.get_user = {
    method: 'GET',
    path: '/api/{client_id}/users/{user_id}',
    config: {
        handler: function (request, reply) {
            var args = _.merge(request.params, request.payload);
            AA.Models.User.findOne({ client_id: args.client_id, user_id: args.user_id }, function (err, user) {
                if (err) {
                    console.log('Mongo error:', err);
                    return reply({ code: 'err', result: 'Error reading user' });
                }
                if (!user) {
                    return reply({ code: 'Fail', result: 'User not found' });
                }
                return reply({ code: 'OK', result: user });
            });
        }
    }
};

/*
    GET users data pass an array of users id as a query param or payload users_ids: []
*/
users.get_users = {
    method: 'GET',
    path: '/api/{client_id}/users/{users_ids}',
    config: {
        handler: function (request, reply) {
            var args = _.merge(request.params, request.payload);
            joi.validate(args, valid.User.users_get, function (err, value) {
                if (err) {
                    return reply({ code: 'Fail', err: { code: err.name, details: err.details[0] } });
                }
                return reply({response: 'OK', result: args});
            });
        }
    }
};

module.exports = users;

