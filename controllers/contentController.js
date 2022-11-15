const Content = require('../models/content.js');

const createContent = (content, itsUpdate = false) => {
    let newContent = new Content({
        name: content.name,
        contentTypeId: content.content_type_id,
        authorId: content.author_id,
        duration: content.duration,
        link: content.link,
        isActive: content.is_active != null ? content.is_active : 1,
        description: content.description,
        createdAt: itsUpdate == true ? null : new Date(),
        updatedAt: itsUpdate == true ? new Date() : null,
        image: content.image != null ? content.image : '',
    });

    return newContent;
};

exports.create = async (req, res) => {
    //validando os dados do corpo da requisição...
    if (!req.body) {
        res.status(400).send({ message: 'Os dados do conteúdo são obrigatórios' });
    }

    //Salvando o novo usuário no banco de dados...
    Content.create(createContent(req.body), (err, data) => {
        if (err) {
            if (err.message.includes('null value'))
                res.status(400).send({
                    message: 'os dados do conteúdo são obrigatórios e não podem ser nulos.',
                });
            else
                res.status(500).send({
                    message: 'Houve um erro ao criar o conteúdo, por favor tente mais tarde!.',
                });
        } else res.status(201).send(data);
    });
};

exports.getById = (req, res) => {
    Content.getById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === 'not_found')
                res.status(404).send({
                    message: `conteúdo não encontrado, verifique o Id do conteúdo.`,
                });
            else
                res.status(500).send({
                    message: 'Ocorreu um erro ao buscar o usuário, por favor tente mais tarde!',
                });
        } else {
            res.status(200).send(data.rows);
        }
    });
};

exports.getByName = (req, res) => {
    Content.getByName(req.params.name, (err, data) => {
        if (err) {
            if (err.kind === 'not_found')
                res.status(404).send({
                    message: `conteúdo não encontrado, tente pesquisar por outra palavra chave.`,
                });
            else
                res.status(500).send({
                    message: 'Ocorreu um erro ao buscar o conteúd, por favor tente mais tarde!',
                });
        } else {
            res.status(200).send(data.rows);
        }
    });
};

exports.getAll = (req, res) => {
    Content.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message ||
                    'Houve um erro ao recuperar os conteúdos, por favor tente mais tarde!',
            });
        else res.status(200).send(data.rows);
    });
};

exports.getActive = (req, res) => {
    Content.getActive((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message ||
                    'Houve um erro ao recuperar os conteúdos, por favor tente mais tarde!',
            });
        else res.status(200).send(data.rows);
    });
};

exports.update = (req, res) => {
    //validando o corpo da requisição
    if (!req.body) {
        res.status(400).send({
            message: 'Os dados do usuário são obrigatórios e não podem ser nulos',
        });
    }

    Content.update(req.params.id, createContent(req.body, true), (err, data) => {
        if (err) {
            if (err.kind === 'not_found')
                res.status(404).send({ message: `usuário não encontrado.` });
            else if (err.message.includes('null value'))
                res.status(400).send({
                    message: 'os dados do usuário são obrigatórios e não podem ser nulos.',
                });
            else
                res.status(500).send({
                    message:
                        'Houve um erro ao tentar editar o usuário, por favor tente mais tarde!',
                });
        } else {
            res.send(data);
        }
    });
};
