const UserTrail = require('../models/userTrail.js');

const createUserTrail = (userTrail) => {
    let newUserTrail = new UserTrail({
        userEmail : userTrail.user_email,
        trailId : userTrail.trail_id,
        status: userTrail.status != null ? userTrail.status : 1,
    });

    return newUserTrail;
}

exports.create = async (req, res) => {
    //validando os dados do corpo da requisição...
    if(!req.body) {
        res.status(400).send({message: 'Os dados da Trilha são obrigatórios'});
    }

    //Salvando o novo usuário no banco de dados...
    UserTrail.create(createUserTrail(req.body), (err, data) => {
        if (err){
            if(err.message.includes('null value'))
                res.status(400).send({message: 'os dados do da trilha são obrigatórios e não podem ser nulos.'});
            else
                res.status(500).send({message: 'Houve um erro ao criar a trilha, por favor tente mais tarde!.'});
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

    UserTrail.update(req.params.id, createUserTrail(req.body), (err, data) => {
        if(err) {
            if(err.kind === 'not_found')
                res.status(404).send({message: `Trilha não encontrada.`});
            else if(err.message.includes('null value'))
                res.status(400).send({message: 'os dados da trilha são obrigatórios e não podem ser nulos.'});
            else 
                res.status(500).send({message: 'Houve um erro ao tentar editar a trilha, por favor tente mais tarde!'});
        }
        else
        {
            res.send({message: 'Trilha editada com sucesso!'});
        }
    });
};

exports.getByUserEmail = (req, res) => {
    UserTrail.getByUserEmail(req.body.user_email, (err, data) => {
        if(err) {
            if(err.kind === 'not_found')
                res.status(500).send({message: 'Ocorreu um erro ao buscar as trilhas, por favor tente mais tarde!'});
        }
        else
        {
            if(data.rowCount <= 0)
                res.status(400).send({message: 'Não foi encontrado trilhas vinculadas ao usuário.'});
            else
                res.status(200).send(data.rows);
        }
    })
};