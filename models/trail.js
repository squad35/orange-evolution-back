const sql = require('./db.js');

const Trail = function(trail) {
    this.name = trail.name;
    this.image = trail.image;
    this.description = trail.description;
    this.createdAt = trail.createdAt;
    this.updatedAt = trail.updatedAt;
    this.isActive = trail.isActive;
};

Trail.create = (newTrail, result) => {
    sql.query('INSERT INTO trails (name, image, description, created_at, is_active) ' +
            'VALUES ($1, $2, $3, $4, $5)',
             [newTrail.name, newTrail.image, newTrail.description, newTrail.createdAt, 1], (err, res) => {
        if (err) {
            console.log('erros: ', err);
            result(err, null);
            return;
        }

        result(null, newTrail);
    });
};

Trail.update = (id, trail, result) => {
    sql.query(
        'UPDATE trails SET name = $1, image = $2, description = $3, updated_at = $4, is_active = $5 ' +
        'WHERE id = $6',
        [trail.name, trail.image, trail.description, trail.updatedAt, trail.isActive, id],
        (err, res) => {
            if(err) {
                console.log('erros: ', err)
                result(err, null);
                return;
            }

            if(res.rowCount == 0) {
                //não foi encontrado trilha com o id informado
                result({kind: 'not_found'}, null);
                return;
            }

            result(null, trail);
        }
    );
};

Trail.getAll = result => {
    sql.query('SELECT trails.* from trails', (err, res) => {
        if (err) {
            console.log(err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

Trail.getById = (id, result) => {
    sql.query('SELECT trails.* FROM trails WHERE trails.id = ' + id, (err, res) => {
        if(err) {
            result(err, null);
            return;
        }

        //se encontrar algum registro com a condição, retorná-o...
        if(res.rowCount > 0) {
            result(null, res);
            return;
        }

        //senão encontrar nenhum registro, retorna uma mensagem dizendo que não encontrou...
        result({kind: 'not_found'}, null);
    });
}

Trail.getActive = result => {
    sql.query('SELECT trails.* FROM trails WHERE trails.is_active = 1 ORDER BY trails.id ASC', (err, res) => {
        if (err) {
            console.log(err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

module.exports = Trail;

