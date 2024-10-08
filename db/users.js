// users.js
var records = [
  { id: 1, facebookId: '12345', displayName: 'Westcliff', emails: [ { value: 'west@example.com'} ] },
  { id: 2, facebookId: '67890', displayName: 'Westcliff University', emails: [ { value: 'cliff@example.com'} ] }
];

exports.findById = function(id, cb) {
  process.nextTick(function() {
    var idx = id - 1;
    if (records[idx]) {
      cb(null, records[idx]);
    } else {
      cb(new Error('User ' + id + ' does not exist'));
    }
  });
}

exports.findOrCreate = function(profile, cb) {
  process.nextTick(function() {
    for (var i = 0, len = records.length; i < len; i++) {
      var record = records[i];
      if (record.facebookId === profile.facebookId) {
        return cb(null, record);
      }
    }
    var newUser = {
      id: records.length + 1,
      facebookId: profile.facebookId,
      displayName: profile.displayName,
      emails: profile.emails
    };
    records.push(newUser);
    return cb(null, newUser);
  });
}
