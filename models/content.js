const sql = require('./db.js');

const Content = function(content) {
    this.name = content.name;
    this.contentTypeId = content.contentTypeId;
    this.authorId = content.authorId;
    this.duration = content.duration;
    this.link = content.link;
    this.isActive = content.isActive;
};

Content.create = (newContent, result) => {
    sql.query('INSERT INTO content (name, content_type_id, author_id, duration, link, is_active) VALUES ($1, $2, $3, $4, $5, $6)',
             [newContent.name, newContent.contentTypeId, newContent.authorId, newContent.duration, newContent.link, 1], (err, res) => {
        if (err) {
            console.log('erros: ', err);
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

        result(null, res);
    });
};

Content.getActive = result => {
    sql.query('SELECT content.*, content_type.name AS content_type, ' +
                'author.name AS author_name FROM content ' + 
                'INNER JOIN content_type ON content_type.id = content.content_type_id ' +
                'INNER JOIN author ON author.id = content.author_id ' +
                'WHERE content.is_active = 1 ORDER BY content.id ASC', (err, res) => {
        if (err) {
            console.log(err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

Content.update = (id, content, result) => {
    sql.query(
        'UPDATE content SET name = $1, content_type_id = $2, author_id = $3, duration = $4, link = $5, is_active = $6 WHERE id = $7',
        [content.name, content.contentTypeId, content.authorId, content.duration, content.link, content.isActive, id],
        (err, res) => {
            if(err) {
                console.log('erros: ', err)
                result(err, null);
                return;
            }

            if(res.rowCount == 0) {
                //não foi encontrado usuário com o email passado
                result({kind: 'not_found'}, null);
                return;
            }

            result(null, content);
        }
    );
};

module.exports = Content;