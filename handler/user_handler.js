

var users = [
    { id: 0, name: 'tj', email: 'tj@vision-media.ca', role: 'member' }
    , { id: 1, name: 'ciaran', email: 'ciaranj@gmail.com', role: 'member' }
    , { id: 2, name: 'aaron', email: 'aaron.heckmann+github@gmail.com', role: 'admin' }
];


function loadUser(req, res, next) {
    // You would fetch your user from the db
    var user = users[req.params.id];
    if (user) {
       res.send(user)
    } else {
        res.send('error get user')
    }
}

exports.loadUser = loadUser;