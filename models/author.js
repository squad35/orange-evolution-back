const sql = require('./db.js');

const Author = function(author) {
    this.name = author.name;
};

Author.getAll = result => {
    sql.query('SELECT authors.* FROM authors', (err, res) => {
        if (err) {
            console.log('erro: ', err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

module.exports = Author;