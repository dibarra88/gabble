const conn = require('./db.js');

function createPost(post, userid, done) {
    const sql = `INSERT INTO posts (post, userid)
    VALUES (?, ?)`;
    conn.query(sql, [post, userid], function (error, results, fields) {
        if (error) {
            throw (error);
        }
        else if (!error) {
            done(true, results)
        }
    })
}
function getAllPosts(userId, done) {
    const sql = `SELECT p.*, u.image_link, u.username, DATE_FORMAT(p.date, "%M %d %Y") as formatDate,
    if(p.userid = ?, true, false)  as authUserPost,  count(pl.postId) as likes, 
   al.alreadyLikedByUser
     FROM posts p
		LEFT JOIN users u on p.userid = u.id
        LEFT  JOIN post_likes pl on p.id = pl.postId
        LEFT OUTER JOIN (select postId, 1 as alreadyLikedByUser from post_likes where userId = ?) al ON al.postId = p.id
     WHERE p.active = true 
     GROUP BY p.id
     ORDER BY p.date DESC;`
    conn.query(sql, [userId, userId], function (error, results, fields) {
        if (error) {
            throw (error)
        }
        else {
            done(true, results)
        }
    })
}

function deletePost(postId, done) {
    const sql = `UPDATE posts SET active = false WHERE id = ? `;
    conn.query(sql, [postId], function (error, results, fields) {
        if (error) {
            throw (error);
        }
        else {
            done(true, results);
        }
    })
}

function createLike(postId, userId, done) {
    const sql = `INSERT INTO post_likes (postId, userId)
    VALUES (?,?)`;
    conn.query(sql, [postId, userId], function (error, results, fields) {
        if (error) {
            throw (error)
        }
        else {
            done(true, results)
        }
    })
}

function getPostLikes(userId,postId, done) {

    let sql = `SELECT p.post, p.id,p.userId, DATE_FORMAT(p.date, "%M %d %Y") as formatDate, u.username, u.image_link, if(p.userid = ?, true, false) as authUserPost, if(al.alreadyLikedByUser, true, false) as alreadyLikedByUser
    FROM posts p
    JOIN users u on p.userId = u.id
         LEFT OUTER JOIN (select postId, 1 as alreadyLikedByUser from post_likes where userId = ?) al ON al.postId = p.id
    WHERE p.id = ? AND p.active = true;`
    conn.query(sql, [userId,userId,postId], function (error, results, fields) {
        if (error) {
            throw (error);
        }
        if (results.length === 0) {
            console.log('Error no active record found.')
            return done(false, error)
        } else {
            let data = results[0];
            let sql = `SELECT u.username FROM post_likes pl
            JOIN users u ON pl.userid = u.id
            WHERE pl.postId = ?
            GROUP BY pl.userid;`;

            conn.query(sql, [postId], function (err, results, error) {
                if (err) {
                    throw (err);
                } else {
                    if (results.length == 0) {
                        data.likes = 0;
                    }
                    else {
                        data.likers = results;
                        data.likes = results.length;
                    }
                    done(true, data)
                }
            })
        }
    })
}
module.exports = {
    createPost: createPost,
    getAllPosts: getAllPosts,
    deletePost: deletePost,
    createLike: createLike,
    getPostLikes: getPostLikes
}