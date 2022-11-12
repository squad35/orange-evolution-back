const sql = require('./db.js');

const UserTrail = function(userTrail) {
    this.userEmail = userTrail.userEmail;
    this.trailId = userTrail.trailId;
    this.status = userTrail.status;
};

UserTrail.create = (newUserTrail, result) => {
    sql.query('INSERT INTO user_trails (user_email, trail_id, status) ' +
            'VALUES ($1, $2, $3)', [newUserTrail.userEmail, newUserTrail.trailId, newUserTrail.status], (err, res) => {
        if (err) {
            console.log('erro: ', err);
            result(err, null);
            return;
        }

        result(null, newUserTrail);
    });
};

UserTrail.update = (id, userTrail, result) => {
    sql.query(
        'UPDATE user_trails SET status = $1 WHERE id = $2',
        [userTrail.status, id],
        (err, res) => {
            if(err) {
                console.log('erros: ', err)
                result(err, null);
                return;
            }

            if(res.rowCount == 0) {
                //não foi encontrado registro com o id informado
                result({kind: 'not_found'}, null);
                return;
            }

            result(null, userTrail);
        }
    );
};

UserTrail.getByUserEmail = (userEmail, result) => {
    sql.query('SELECT user_trails.* FROM user_trails WHERE user_trails.user_email = $1', [userEmail], (err, res) => {
        if (err) {
            console.log('erro: ', err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

module.exports = UserTrail;