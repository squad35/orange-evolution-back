const Session = require('../models/session.js');

const createSession = (session) => {
    let newSession = new Session({
        name : session.name,
        TrailId : session.trail_id
    });

    return newSession;
}

exports.create = async (req, res) => {
    //validando os dados do corpo da requisição...
    if(!req.body || req.body.name === '') {
        res.status(400).send({message: 'Os dados da sessão são obrigatórios'});
    }

    //Salvando a nova sessão no banco de dados...
    Session.create(createSession(req.body), (err, data) => {
        if (err){
            if(err.message.includes('null value'))
                res.status(400).send({message: 'os dados da sessão são obrigatórios e não podem ser nulos.'});
            else
                res.status(500).send({message: 'Houve um erro ao criar a nova sessão, por favor tente mais tarde!.'});
        }
        else
            res.status(201).send(data);
    });
}

exports.getByTrail = (req, res) => {
    Session.getByTrail(req.params.id, (err, data) => {
        if(err) {
            if(err.kind === 'not_found')
                res.status(404).send({message: `Sessão não encontrada, verifique o Id da sessão.`});
            else
                res.status(500).send({message: 'Ocorreu um erro ao buscar a sessão, por favor tente mais tarde!'});
        }
        else
        {
            res.status(200).send(data.rows);
        }
    })
};

exports.deleteById = async (req, res) => {
    //validando os dados do corpo da requisição...
    if(!req.body || req.body.id === '') {
        res.status(400).send({message: 'Para fins de exclusão, o id da sessão é obrigatório'});
    }

    //Deletando a sessão do banco de dados...
    Session.deleteById(req.body.id, (err, data) => {
        if (err){
            res.status(500).send({message: 'Houve um erro ao deletar a sessão, por favor tente mais tarde!.'});
        } else {
            if(data.rowCount === 0) {
                res.status(400).send({message: 'A sessão não foi encontrada!'});
            } else {
                res.status(200).send({message: `A sessão com id ${req.body.id} foi deletada com sucesso!`});
            }
        }            
    });
}