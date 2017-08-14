const conn = require('./db.js');
const bcrypt = require('bcryptjs');

function createUser(username, email, password, image, done) {
    const hash = bcrypt.hashSync(password, 8);
    const sql = `INSERT INTO users (username, email, password, image_link)
    VALUES (?, ?, ?, ?)`

    conn.query(sql, [username, email, hash, image], function (error, results, fields) {
        if (error) {
            console.log('Error trying to create a duplicate user', error)
            done(false,error)
        }
        else if (!error) {
            //Created user in db
            conn.query('SELECT LAST_INSERT_ID() as id', function (error, results, fields) {
                if (error) {
                    throw (error)
                } else {
                    let sql = `SELECT * FROM users WHERE id = ?`;
                    conn.query(sql, [results[0].id], function (err, results, fields) {
                        if (err) {
                            throw (err)
                        }
                        else {
                            let userData = {
                                id: results[0].id,
                                username: results[0].username,
                                image: results[0].image_link
                            }
                            return done(true, userData)
                        }
                    })
                }
            })
        }
    })
}
function authenticateUser(username, password, done) {
    const sql = `SELECT * FROM users WHERE username = ?`
    conn.query(sql, [username], function (error, results, fields) {
        if (error) {
            done(error);
        }
        if (results.length === 0) {
            done(null, false);
        }
        else {
            const hash = results[0].password.toString();
            bcrypt.compare(password, hash, function (error, res) {
                if (res === true) {
                    let userData = {
                        id: results[0].id,
                        username: results[0].username,
                        image: results[0].image_link
                    }
                    return done(null, userData)
                }
                else {
                    return done(null, false);
                }
            })
        }
    })
}

module.exports = {
    authenticateUser: authenticateUser,
    createUser: createUser
}