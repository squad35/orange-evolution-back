const UserItem = require('../models/userItem.js');

const createUserItem = (userItem) => {
    let newUserItem = new UserItem({
        userEmail : userItem.user_email,
        itemId : userItem.item_id,
        completed: userItem.completed != null ? userItem.completed : 0,
    });

    return newUserItem;
}

exports.create = async (req, res) => {
    //validando os dados do corpo da requisição...
    if(!req.body) {
        res.status(400).send({message: 'Os dados do item são obrigatórios'});
    }

    //Salvando o novo usuário no banco de dados...
    UserItem.create(createUserItem(req.body), (err, data) => {
        if (err){
            if(err.message.includes('null value'))
                res.status(400).send({message: 'os dados item são obrigatórios e não podem ser nulos.'});
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
        res.status(400).send({message: 'Os dados da trilha são obrigatórios e não podem ser nulos'});
    }

    UserItem.update(req.params.id, createUserItem(req.body), (err, data) => {
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

exports.getByUserEmail = (req, res) => {
    UserItem.getByUserEmail(req.body.user_email, (err, data) => {
        if(err) {
            if(err.kind === 'not_found')
                res.status(500).send({message: 'Ocorreu um erro ao buscar os itens, por favor tente mais tarde!'});
        }
        else
        {
            if(data.rowCount <= 0)
                res.status(400).send({message: 'Não foi encontrado conteúdos vinculadas ao usuário.'});
            else
                res.status(200).send(data.rows);
        }
    })
};