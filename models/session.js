const sql = require('./db.js');

const Session = function(session) {
    this.name = session.name;
    this.TrailId = session.TrailId;
};

Session.create = (newSession, result) => {
    sql.query('INSERT INTO sessions (name, trail_id) ' +
            'VALUES ($1, $2)', [newSession.name, newSession.TrailId], (err, res) => {
        if (err) {
            console.log('erro: ', err);
            result(err, null);
            return;
        }

        result(null, newSession);
    });
};

Session.getByTrail = (trailId, result) => {
    sql.query('SELECT sessions.* FROM sessions WHERE trail_id = $1', [trailId], (err, res) => {
        if (err) {
            console.log('erro: ', err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

Session.deleteById = (id, result) => {
    sql.query('DELETE from sessions WHERE id = $1', [id],  (err, res) => {
        if (err) {
            result(null, err);
            return;
        }

        result(null, res);
    });
};

module.exports = Session;