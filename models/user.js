const sql = require('./db.js');

const User = function(user) {
    this.email = user.email;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.password = user.password;
    this.image = user.image;
    this.newsletter = user.newsletter;
    this.role = user.role;
};

User.create = (newUser, result) => {
    sql.query('INSERT INTO users (email, first_name, last_name, password, image, newsletter, role) ' +
            'VALUES ($1, $2, $3, $4, $5, $6, $7)', [newUser.email, newUser.firstName, newUser.lastName,
             newUser.password, newUser.image, newUser.newsletter, newUser.role], (err, res) => {
        if (err) {
            console.log('erro: ', err);
            result(err, null);
            return;
        }

        result(null, newUser);
    });
};

User.getAll = result => {
    sql.query('SELECT users.first_name FROM users', (err, res) => {
        if (err) {
            result(null, err);
            return;
        }

        result(null, res);
    });
};

User.getByEmail = (email, result) => {
    sql.query('SELECT * FROM users WHERE email = $1', [email], (err, res) => {
        if(err) {
            result(err, null);
            return;
        }

        //se encontrar algum registro com a condição, retorná-o...
        if(res.rowCount > 0) {
            result(null, res);
            return;
        }

        //senão encontrar nenhum registro, retorna uma mensagem dizendo que não encontrou...
        result({kind: 'not_found'}, null);
    });
}

User.update = (user, result) => {
    sql.query(
        'UPDATE users SET first_name = $1, last_name = $2, password = $3, image = $4, ' +
        'newsletter = $5, role = $6 WHERE email = $7',
        [user.firstName, user.lastName, user.password, user.image, user.newsletter, user.role, user.email],
        (err, res) => {
            if(err) {
                console.log('erro: ', err);
                result(err, null);
                return;
            }

            if(res.rowCount == 0) {
                //não foi encontrado usuário com o email passado
                result({kind: 'not_found'}, null);
                return;
            }

            result(null, user);
        }
    );
};

User.login = (user, result) => {
    sql.query('SELECT * FROM users WHERE email = $1', [user.email], (err, res) => {
        if (err) {
            console.log('erros: ', err);
            result(err, null);
            return;
        }

        //se encontrar o usuário com o email iformado, verifica se as senhas batem...
        if(res.rowCount > 0) {
            console.log(res.rows[0].email);      
            //Se as senhas baterem retorna os dados do usuário
            if(res.rows[0].password === user.password) {
                result(null, res);
                return;
            }    
            
            //caso as senhas não baterem, retorna erro de validação...
            result({kind: 'invalid_password'});
            return;
        }

        result({kind: 'not_found'});
    })
}

module.exports = User;