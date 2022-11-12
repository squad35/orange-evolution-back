const Author = require('../models/author.js');

exports.getAll = (req, res) => {
    Author.getAll((err, data) => {
        if(err)
            res.status(500).send({message: err.message || 'Houve um erro ao recuperar os autores, por favor tente mais tarde!'});
        else
            res.status(200).send(data.rows);
    });
};