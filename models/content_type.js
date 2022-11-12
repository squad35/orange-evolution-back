const sql = require('./db.js');

const ContentType = function(contentType) {
    this.name = contentType.name;
};

ContentType.create = (newContentType, result) => {
    sql.query('INSERT INTO content_types (name) ' +
            'VALUES ($1)', [newContentType.name], (err, res) => {
        if (err) {
            console.log('erro: ', err);
            result(err, null);
            return;
        }

        result(null, newContentType);
    });
};

ContentType.getAll = result => {
    sql.query('SELECT content_types.* FROM content_types', (err, res) => {
        if (err) {
            console.log('erro: ', err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

ContentType.deleteById = (id, result) => {
    sql.query('DELETE from content_types WHERE id = $1', [id],  (err, res) => {
        if (err) {
            result(null, err);
            return;
        }

        result(null, res);
    });
};

module.exports = ContentType;