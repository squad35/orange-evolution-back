const sql = require('./db.js');

const Content = function(content) {
    this.name = content.name;
    this.content_type_id = content.content_type_id;
    this.author_id = content.author_id;
    this.duration = content.duration;
    this.link = content.link;
};

Content.create = (newContent, result) => {
    sql.query('INSERT INTO content (name, content_type_id, author_id, duration, link) VALUES ($1, $2, $3, $4, $5)',
             [newContent.name, newContent.content_type_id, newContent.author_id, newContent.duration, newContent.link], (err, res) => {
        if (err) {
            result(err, null);
            return;
        }

        result(null, newContent);
    });
};

Content.getById = (id, result) => {
    sql.query('SELECT content.*, content_type.name AS content_type, ' +
                'author.name AS author_name FROM content ' + 
                'INNER JOIN content_type ON content_type.id = content.content_type_id ' +
                'INNER JOIN author ON author.id = content.author_id ' +
                'WHERE content.id = ' + id, (err, res) => {
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

Content.getAll = result => {
    sql.query('SELECT content.*, content_type.name AS content_type, ' +
                'author.name AS author_name FROM content ' + 
                'INNER JOIN content_type ON content_type.id = content.content_type_id ' +
                'INNER JOIN author ON author.id = content.author_id ORDER BY content.id ASC', (err, res) => {
        if (err) {
            console.log(err);
            result(null, err);
            return;
        }

       // res.push({tempo: '50:29'});

        result(null, res);
    });
};

module.exports = Content;