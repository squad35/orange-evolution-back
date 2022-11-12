const sql = require('./db.js');

const UserItem = function(userItem) {
    this.userEmail = userItem.userEmail;
    this.itemId = userItem.itemId;
    this.completed = userItem.completed;
};

UserItem.create = (newUserItem, result) => {
    sql.query('INSERT INTO user_items (user_email, item_id, completed) ' +
            'VALUES ($1, $2, $3)', [newUserItem.userEmail, newUserItem.itemId, newUserItem.completed], (err, res) => {
        if (err) {
            console.log('erro: ', err);
            result(err, null);
            return;
        }

        result(null, newUserItem);
    });
};

UserItem.update = (id, userItem, result) => {
    sql.query(
        'UPDATE user_items SET completed = $1 WHERE id = $2',
        [userItem.completed, id],
        (err, res) => {
            if(err) {
                console.log('erros: ', err)
                result(err, null);
                return;
            }

            if(res.rowCount == 0) {
                //não foi encontrado registro com o id informado
                result({kind: 'not_found'}, null);
                return;
            }

            result(null, userItem);
        }
    );
};

UserItem.getByUserEmail = (userEmail, result) => {
    sql.query('SELECT user_items.* FROM user_items WHERE user_items.user_email = $1', [userEmail], (err, res) => {
        if (err) {
            console.log('erro: ', err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

module.exports = UserItem;