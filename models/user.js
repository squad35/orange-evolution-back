const sql = require('./db.js');

const User = function(user) {
    this.email = user.email;
    this.name = user.name;
    this.password = user.password;
    this.role = user.role;
};

User.create = (newUser, result) => {
    sql.query('INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4)', [newUser.name, newUser.email, newUser.password, newUser.role], (err, res) => {
        if (err) {
            result(err, null);
            return;
        }

        result(null, newUser);
    });
};

User.getAll = result => {
    sql.query('SELECT users.name FROM users', (err, res) => {
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
        'UPDATE users SET name = $1, password = $2, role = $3 WHERE email = $4',
        [user.name, user.password, user.role, user.email],
        (err, res) => {
            if(err) {
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
                console.log('as senhas bateram');
                result(null, res);
                return;
            }    
            
            //caso as senhas não baterem, retorna erro de validação...
            console.log('as senhas não são iguais');
            result({kind: 'invalid_password'});
            return;
        }

        console.log('esta aqui');
        result({kind: 'not_found'});
    })
}

module.exports = User;