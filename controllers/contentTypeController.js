const ContentType = require('../models/content_type.js');

const createContentType = (contentType) => {
    let newContentType = new ContentType({
        name: contentType.name,
    });
    console.log(newContentType);

    return newContentType;
};

exports.create = async (req, res) => {
    //validando os dados do corpo da requisição...
    if (!req.body || req.body.name === '') {
        res.status(400).send({ message: 'Os dados do tipo do conteúdo são obrigatórios' });
    }

    //Salvando o novo usuário no banco de dados...
    ContentType.create(createContentType(req.body), (err, data) => {
        if (err) {
            if (err.message.includes('null value'))
                res.status(400).send({
                    message: 'os dados do tipo do conteúdo são obrigatórios e não podem ser nulos.',
                });
            else
                res.status(500).send({
                    message:
                        'Houve um erro ao criar o tipo do conteúdo, por favor tente mais tarde!.',
                });
        } else res.status(201).send(data);
    });
};

exports.getAll = (req, res) => {
    ContentType.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message ||
                    'Houve um erro ao recuperar os usuários, por favor tente mais tarde!',
            });
        else res.status(200).send(data.rows);
    });
};

exports.deleteById = async (req, res) => {
    //validando os dados do corpo da requisição...
    if (!req.params.id === '') {
        res.status(400).send({
            message: 'Para fins de exclusão, o id do tipo do conteúdo é obrigatório',
        });
    }

    //Deletando o tipo de conteúdo do banco de dados...
    ContentType.deleteById(req.params.id, (err, data) => {
        if (err) {
            res.status(500).send({
                message: 'Houve um erro ao criar o tipo do conteúdo, por favor tente mais tarde!.',
            });
        } else {
            if (data.rowCount === 0) {
                res.status(400).send({ message: 'O conteúdo não foi encontrado!' });
            } else {
                res.status(200).send({ message: 'tipo de conteúdo deletado com sucesso!' });
            }
        }
    });
};
