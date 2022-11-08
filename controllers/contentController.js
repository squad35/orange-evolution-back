const Content = require('../models/content.js');

exports.create = async (req, res) => {
    //validando os dados do corpo da requisição...
    if(!req.body) {
        res.status(400).send({message: 'Os dados do conteúdo são obrigatórios'});
    }

    //Criando um novo usuário...
    const content = new Content({
        name: req.body.name,
        content_type_id: req.body.content_type_id,
        author_id: req.body.author_id,
        duration: req.body.duration || 0,
        link: req.body.link
    });

    //Salvando o novo usuário no banco de dados...
    Content.create(content, (err, data) => {
        if (err){
            if(err.message.includes('null value'))
                res.status(400).send({message: 'os dados do conteúdo são obrigatórios e não podem ser nulos.'});
            else
                res.status(500).send({message: 'Houve um erro ao criar o conteúdo, por favor tente mais tarde!.'});
        }
        else
            res.status(201).send(data);
    })
}

exports.getById = (req, res) => {
    Content.getById(req.params.id, (err, data) => {
        if(err) {
            if(err.kind === 'not_found')
                res.status(404).send({message: `conteúdo não encontrado, verifique o Id do conteúdo.`});
            else
                res.status(500).send({message: 'Ocorreu um erro ao buscar o usuário, por favor tente mais tarde!'});
        }
        else
        {
            res.status(200).send(data.rows);
        }
    })
};

exports.getAll = (req, res) => {
    Content.getAll((err, data) => {
        if(err)
            res.status(500).send({message: err.message || 'Houve um erro ao recuperar os conteúdos, por favor tente mais tarde!'});
        else
            res.status(200).send(data.rows);
    });
};