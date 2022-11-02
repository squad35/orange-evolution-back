const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`servidor está rodando na porta ${port}`);
});

app.get('/teste', (req, res) => {
    return res.status(200).send({message: 'A Api da squad 35 está rodando!'});
});

module.exports = app;