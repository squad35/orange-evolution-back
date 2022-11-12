const sql = require('./db.js');

const Item = function(item) {
    this.contentId = item.contentId;
    this.sessionId = item.sessionId;
    this.isActive = item.isActive;
};

Item.create = (newItem, result) => {
    sql.query('INSERT INTO items (content_id, session_id, is_active) ' +
            'VALUES ($1, $2, $3)', [newItem.contentId, newItem.sessionId, 1], (err, res) => {
        if (err) {
            console.log('erro: ', err);
            result(err, null);
            return;
        }

        result(null, newItem);
    });
};

Item.update = (id, item, result) => {
    sql.query(
        'UPDATE items SET is_active = $1 WHERE id = $2',
        [item.isActive, id],
        (err, res) => {
            if(err) {
                console.log('erros: ', err)
                result(err, null);
                return;
            }

            if(res.rowCount == 0) {
                //não foi encontrado item com o id informado
                result({kind: 'not_found'}, null);
                return;
            }

            result(null, item);
        }
    );
};

Item.getActive = result => {
    sql.query('SELECT items.*, contents.name AS content_name, content_types.name AS content_type_name ' + 
                'FROM items INNER JOIN contents ON contents.id = items.content_id ' +
                'INNER JOIN content_types ON content_types.id = contents.content_type_id ' +
                'WHERE items.is_active = 1', (err, res) => {
        if (err) {
            console.log(err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

Item.getAll = result => {
    sql.query('SELECT items.* FROM items', (err, res) => {
        if (err) {
            console.log('erro: ', err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

Item.getBySession = (sessionId, result) => {
    sql.query('SELECT items.*, contents.name AS content_name, content_types.name ' + 
                'FROM items INNER JOIN contents ON contents.id = items.content_id ' +
                'INNER JOIN content_types ON content_types.id = contents.content_type_id ' +
                'WHERE items.session_id = $1 AND items.is_active = 1', [sessionId], (err, res) => {
        if (err) {
            console.log('erro: ', err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

module.exports = Item;