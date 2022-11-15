const sql = require('./db.js');

class Content {
    constructor(content) {
        this.name = content.name;
        this.contentTypeId = content.contentTypeId;
        this.authorId = content.authorId;
        this.duration = content.duration;
        this.link = content.link;
        this.isActive = content.isActive;
        this.description = content.description;
        this.image = content.image;
        this.createdAt = content.createdAt;
        this.updatedAt = content.updatedAt;
    }
}

Content.create = (newContent, result) => {
    sql.query(
        'INSERT INTO contents (name, content_type_id, author_id, duration, link, is_active, description, image, created_at ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
        [
            newContent.name,
            newContent.contentTypeId,
            newContent.authorId,
            newContent.duration,
            newContent.link,
            1,
            newContent.description,
            newContent.image,
            newContent.createdAt,
        ],
        (err, res) => {
            if (err) {
                console.log('erros: ', err);
                result(err, null);
                return;
            }

            result(null, newContent);
        }
    );
};

Content.getById = (id, result) => {
    sql.query(
        'SELECT contents.*, content_types.name AS content_type, ' +
            'authors.name AS author_name FROM contents ' +
            'INNER JOIN content_types ON content_types.id = contents.content_type_id ' +
            'INNER JOIN authors ON authors.id = contents.author_id ' +
            'WHERE contents.id = ' +
            id,
        (err, res) => {
            if (err) {
                result(err, null);
                return;
            }

            //se encontrar algum registro com a condição, retorná-o...
            if (res.rowCount > 0) {
                result(null, res);
                return;
            }

            //senão encontrar nenhum registro, retorna uma mensagem dizendo que não encontrou...
            result({ kind: 'not_found' }, null);
        }
    );
};

Content.getByName = (name, result) => {
    sql.query(
        'SELECT contents.*, content_types.name AS content_type, ' +
            'authors.name AS author_name FROM contents ' +
            'INNER JOIN content_types ON content_types.id = contents.content_type_id ' +
            'INNER JOIN authors ON authors.id = contents.author_id ' +
            "WHERE lower(contents.name) LIKE '%" +
            name +
            "%'",
        (err, res) => {
            if (err) {
                console.log('erro: ', err);
                result(err, null);
                return;
            }

            //se encontrar algum registro com a condição, retorná-o...
            if (res.rowCount > 0) {
                result(null, res);
                return;
            }

            //senão encontrar nenhum registro, retorna uma mensagem dizendo que não encontrou...
            result({ kind: 'not_found' }, null);
        }
    );
};

Content.getAll = (result) => {
    sql.query(
        'SELECT contents.*, content_types.name AS content_type, ' +
            'authors.name AS author_name FROM contents ' +
            'INNER JOIN content_types ON content_types.id = contents.content_type_id ' +
            'INNER JOIN authors ON authors.id = contents.author_id ORDER BY contents.id ASC',
        (err, res) => {
            if (err) {
                console.log(err);
                result(null, err);
                return;
            }

            result(null, res);
        }
    );
};

Content.getActive = (result) => {
    sql.query(
        'SELECT contents.*, content_types.name AS content_type, ' +
            'authors.name AS author_name FROM contents ' +
            'INNER JOIN content_types ON content_types.id = contents.content_type_id ' +
            'INNER JOIN authors ON authors.id = contents.author_id ' +
            'WHERE contents.is_active = 1 ORDER BY contents.id ASC',
        (err, res) => {
            if (err) {
                console.log(err);
                result(null, err);
                return;
            }

            result(null, res);
        }
    );
};

Content.update = (id, content, result) => {
    console.log(content);
    sql.query(
        'UPDATE contents SET name = $1, content_type_id = $2, author_id = $3, duration = $4, link = $5, ' +
            'is_active = $6, description = $7, image = $8, updated_at = $9  WHERE id = $10',
        [
            content.name,
            content.contentTypeId,
            content.authorId,
            content.duration,
            content.link,
            content.isActive,
            content.description,
            content.image,
            content.updatedAt,
            id,
        ],
        (err, res) => {
            if (err) {
                console.log('erros: ', err);
                result(err, null);
                return;
            }

            if (res.rowCount == 0) {
                //não foi encontrado usuário com o email passado
                result({ kind: 'not_found' }, null);
                return;
            }

            result(null, content);
        }
    );
};

module.exports = Content;
