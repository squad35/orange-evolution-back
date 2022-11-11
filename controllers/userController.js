const User = require('../models/user.js');

const createUser = (user, itsUpdated = false) => {
    let newUser = new User({
        email : user.email,
        firstName : user.first_name,
        lastName : user.last_name,
        password : user.password,
        image : user.image == null || user.image == ""  ? null : user.image,
        newsletter : user.newsletter,
        role : itsUpdated == true ? user.role : "user"
    });
    console.log(newUser);

    return newUser;
}

exports.create = async (req, res) => {
    //validando os dados do corpo da requisição...
    if(!req.body) {
        res.status(400).send({message: 'Os dados do usuário são obrigatórios'});
    }

    //Salvando o novo usuário no banco de dados...
    User.create(createUser(req.body), (err, data) => {
        if (err){
            if(err.message.includes('null value'))
                res.status(400).send({message: 'os dados do usuário são obrigatórios e não podem ser nulos.'});
            else if(err.message.includes('duplicate key'))
                res.status(422).send({message: `Já existe um usuário com o email ${req.body.email} cadastrado em nosso sistema.`});
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
            res.status(200).send(data.rows);
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
            res.send(data.rows);
        }
    })
};

exports.update = (req, res) => {
    //validando o corpo da requisição
    if(!req.body) {
        res.status(400).send({message: 'Os dados do usuário são obrigatórios e não podem ser nulos'});
    }

    User.update(createUser(req.body, true), (err, data) => {
        if(err) {
            if(err.kind === 'not_found')
                res.status(404).send({message: `usuário não encontrado.`});
            else if(err.message.includes('null value'))
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

exports.login = (req, res) => {
    User.login(req.body, (err, data) => {
        //validando o corpo da requisição
        if(!req.body) {
            res.status(400).send({message: 'Os dados do usuário são obrigatórios e não podem ser nulos'});
        }

        if(err) {
            if(err.kind === 'not_found')
                res.status(404).send({message: `usuário não encontrado com o email: ${req.body.email}.`});
            else if(err.kind === 'invalid_password')
                res.status(404).send({message: `A senha está incorreta, tente novamente.`});
            else
                res.status(500).send({message: 'Ocorreu um erro ao buscar o usuário, por favor tente mais tarde!'});
        }
        else
        {
            res.send(data.rows);
        }
    })
};

