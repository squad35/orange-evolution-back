const sql = require('./db.js');

const User = function(user) {
    this.email = user.email;
    this.name = user.name;
    this.password = user.password;
    this.role = user.role;
};

User.create = (newUser, result) => {
    sql.query('INSERT INTO users SET ?', newUser, (err, res) => {
        if (err) {
            result(err, null);
            console.log('erro: ', err);
            return;
        }

        console.log('usuário criado: ', newUser);
        result(null, newUser);
    });
};

User.getAll = result => {
    sql.query('SELECT * FROM users', (err, res) => {
        if (err) {
            result(null, err);
            return;
        }

        result(null, res);
    });
};

User.getByEmail = (email, result) => {
    sql.query(`SELECT * FROM users WHERE email = '${email}'`, (err, res) => {
        if(err) {
            result(err, null);
            return;
        }

        //se encontrar algum registro com a condição, retorná-o...
        if(res.length) {
            result(null, res[0]);
            return;
        }

        //senão encontrar nenhum registro, retorna uma mensagem dizendo que não encontrou...
        result({kind: 'not_found'}, null);
    });
}

User.update = (user, result) => {
    sql.query(
        'UPDATE users SET name = ?, password = ?, role = ? WHERE email = ?',
        [user.name, user.password, user.role, user.email],
        (err, res) => {
            if(err) {
                console.log('erro: ', err);
                result(err, null);
                return;
            }

            if(res.affectedRows == 0) {
                //não foi encontrado usuário com o email passado
                result({kind: 'not_found'}, null);
                return;
            }

            console.log('usuário editado: ', user);
            result(null, user);
        }
    );
};

module.exports = User;