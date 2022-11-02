const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
    return res.status(200).send({message: 'A Api da squad 35 está rodando!'});
});

app.listen(port, () => {
    console.log(`servidor está rodando`);
});

module.exports = app;