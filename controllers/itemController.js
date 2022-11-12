const Item = require('../models/item.js');

const createItem = (item) => {
    let newItem = new Item({
        contentId : item.content_id,
        sessionId : item.session_id,
        isActive: item.is_active != null ? item.is_active : 1
    });

    return newItem;
}

exports.create = async (req, res) => {
    //validando os dados do corpo da requisição...
    if(!req.body) {
        res.status(400).send({message: 'Os dados do item são obrigatórios'});
    }

    //Salvando o novo item no banco de dados...
    Item.create(createItem(req.body), (err, data) => {
        if (err){
            if(err.message.includes('null value'))
                res.status(400).send({message: 'os dados do item são obrigatórios e não podem ser nulos.'});
            else
                res.status(500).send({message: 'Houve um erro ao criar o item, por favor tente mais tarde!.'});
        }
        else
            res.status(201).send(data);
    });
}

exports.update = (req, res) => {
    //validando o corpo da requisição
    if(!req.body) {
        res.status(400).send({message: 'Os dados do item são obrigatórios e não podem ser nulos'});
    }

    Item.update(req.params.id, createItem(req.body), (err, data) => {
        if(err) {
            if(err.kind === 'not_found')
                res.status(404).send({message: `Item não encontrado.`});
            else if(err.message.includes('null value'))
                res.status(400).send({message: 'os dados do item são obrigatórios e não podem ser nulos.'});
            else 
                res.status(500).send({message: 'Houve um erro ao tentar editar o item, por favor tente mais tarde!'});
        }
        else
        {
            res.send({message: 'Item editado com sucesso!'});
        }
    });
};

exports.getActive = (req, res) => {
    Item.getActive((err, data) => {
        if(err)
            res.status(500).send({message: err.message || 'Houve um erro ao recuperar os itens, por favor tente mais tarde!'});
        else
            res.status(200).send(data.rows);
    });
};

exports.getAll = (req, res) => {
    Item.getAll((err, data) => {
        if(err)
            res.status(500).send({message: err.message || 'Houve um erro ao recuperar os itens, por favor tente mais tarde!'});
        else
            res.status(200).send(data.rows);
    });
};

exports.getBySession = (req, res) => {
    Item.getBySession(req.params.id, (err, data) => {
        if(err) {
            if(err.kind === 'not_found')
                res.status(500).send({message: 'Ocorreu um erro ao buscar os itens, por favor tente mais tarde!'});
        }
        else
        {
            if(data.rowCount <= 0)
                res.status(400).send({message: 'Não foi encontrado items com a sessão informada.'});
            else
                res.status(200).send(data.rows);
        }
    })
};
