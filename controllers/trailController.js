const Trail = require('../models/trail.js');

const createTrail = (trail, itsUpdate = false) => {
    let newTRail = new Trail({
        name: trail.name,
        image: trail.image != null ? trail.image : '',
        description: trail.description,
        createdAt: itsUpdate == true ? null : new Date(),
        updatedAt: itsUpdate == true ? new Date() : null,        
        isActive: trail.is_active != null ? trail.is_active : 1,
    });

    return newTRail;
}

exports.create = async (req, res) => {
    //validando os dados do corpo da requisição...
    if(!req.body) {
        res.status(400).send({message: 'Os dados da trilha são obrigatórios'});
    }

    //Salvando a nova trilha no banco de dados...
    Trail.create(createTrail(req.body), (err, data) => {
        if (err){
            if(err.message.includes('null value'))
                res.status(400).send({message: 'os dados da trilha são obrigatórios e não podem ser nulos.'});
            else
                res.status(500).send({message: 'Houve um erro ao criar a nova trilha, por favor tente mais tarde!.'});
        }
        else
            res.status(201).send(data);
    })
}

exports.update = (req, res) => {
    //validando o corpo da requisição
    if(!req.body) {
        res.status(400).send({message: 'Os dados da trilha são obrigatórios e não podem ser nulos'});
    }

    Trail.update(req.params.id, createTrail(req.body, true), (err, data) => {
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
            res.send(data);
        }
    });
};

exports.getAll = (req, res) => {
    Trail.getAll((err, data) => {
        if(err)
            res.status(500).send({message: err.message || 'Houve um erro ao recuperar as trilhas, por favor tente mais tarde!'});
        else
            res.status(200).send(data.rows);
    });
};

exports.getById = (req, res) => {
    Trail.getById(req.params.id, (err, data) => {
        if(err) {
            if(err.kind === 'not_found')
                res.status(404).send({message: `Trilha não encontrada, verifique o Id da trilha.`});
            else
                res.status(500).send({message: 'Ocorreu um erro ao buscar a trilha, por favor tente mais tarde!'});
        }
        else
        {
            res.status(200).send(data.rows);
        }
    })
};

exports.getActive = (req, res) => {
    Trail.getActive((err, data) => {
        if(err)
            res.status(500).send({message: err.message || 'Houve um erro ao recuperar as trilhas, por favor tente mais tarde!'});
        else
            res.status(200).send(data.rows);
    });
};