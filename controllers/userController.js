const User = require('../models/user.js');

exports.create = async (req, res) => {
    //validando os dados do corpo da requisição...
    if(!req.body) {
        res.status(400).send({message: 'Os dados do usuário são obrigatórios'});
    }

    //Criando um novo usuário...
    const user = new User({
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
        role: 'user' 
    });

    //Salvando o novo usuário no banco de dados...
    User.create(user, (err, data) => {
        if (err){
            if(err.message.includes('cannot be null'))
                res.status(400).send({message: 'os dados do usuário são obrigatórios e não podem ser nulos.'});
            else if(err.message.includes('Duplicate entry'))
                res.status(422).send({message: `Já existe um usuário com o email ${user.email} cadastrado em nosso sistema.`});
            else
                res.status(500).send({message: 'Houve um erro ao criar o usuário, por favor tente mais tarde!.'});
        }
        else
            res.status(201).send(data);
    })
}

exports.getAll = (req, res) => {
    User.getAll((err, data) => {
        if(err)
            res.status(500).send({message: err.message || 'Houve um erro ao recuperar os usuários, por favor tente mais tarde!'});
        else
            res.status(200).send(data);
    });
};

exports.getByEmail = (req, res) => {
    User.getByEmail(req.body.email, (err, data) => {
        if(err) {
            if(err.kind === 'not_found')
                res.status(404).send({message: `usuário não encontrado.`});
            else
                res.status(500).send({message: 'Ocorreu um erro ao buscar o usuário, por favor tente mais tarde!'});
        }
        else
        {
            res.send(data);
        }
    })
};

exports.update = (req, res) => {
    //validando o corpo da requisição
    if(!req.body) {
        res.status(400).send({message: 'Os dados do usuário são obrigatórios e não podem ser nulos'});
    }

    User.update(new User(req.body), (err, data) => {
        if(err) {
            if(err.kind === 'not_found')
                res.status(404).send({message: `usuário não encontrado.`});
            else if(err.message.includes('cannot be null'))
                res.status(400).send({message: 'os dados do usuário são obrigatórios e não podem ser nulos.'});
            else 
                res.status(500).send({message: 'Houve um erro ao tentar editar o usuário, por favor tente mais tarde!'});
        }
        else
        {
            res.send(data);
        }
    });
};

