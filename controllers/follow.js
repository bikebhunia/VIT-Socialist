var FollowersController = {};

/*
    @param Object args - validate args
    @param String args.client_id
    @param String args.user_id
    @param String args.target_id
    @param Object request
    @param Object reply
*/
FollowersController.user_follow_target = function(args, request, reply) {
    var user_id = args.user_id;
    var client_id = args.client_id;
    var targets = args.target_id;

    var query = 'MERGE (a:User {user_id: {user_id}, client_id: {client_id}}) ' +
                'MERGE (b:User {user_id: {target_id}, client_id: {client_id}}) ' +
                'MERGE (a)-[:FOLLOWS]->(b) ' +
                'RETURN a, b';

    AA.async.eachSeries(targets, function(target, next) {
        var params = {
            user_id: user_id,
            client_id: client_id,
            target_id: target
        };
        AA.NEO4JGraph.query(query, params, function(err, results) {
            if (err) {
                console.log('Neo4j error:', err);
            }
            next(err);
        });
    }, function(err) {
        if (err) {
            return reply({code: 'err', result: 'Error setting relationship'});
        }
        return reply({code: 'OK', result: args});
    });
};

module.exports = FollowersController;


