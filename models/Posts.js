var db = require('../conf/database');
const PostModel = {};

PostModel.create = (title, description, photoPath, thumbnil, fk_userId) => {
    let baseSQL = 'INSERT INTO posts (title, description, photopath, thumbnil, created, fk_userid) VALUE (?,?,?,?, now(),?);;';
    return db.execute(baseSQL,[
        title,
        description,
        photoPath,
        thumbnil,
        fk_userId
    ])
        .then(([results, fields]) => {
            return Promise.resolve(results && results.affectedRows);
        })
        .catch((err) => Promise.reject(err));
};

PostModel.search = (searchTerm) => {
    let baseSQL = "SELECT id, title, description, thumbnil, concat_ws(' ', title, description) AS haystack \
            FROM posts \
            HAVING haystack like ?;";
    let sqlReadySearchTerm = "%"+searchTerm+"%";
    return db.execute(baseSQL, [sqlReadySearchTerm])
        .then(([results, fields]) => {
            return Promise.resolve(results);
        })
        .catch((err) => Promise.reject(err));
};

PostModel.getNRecentPosts = (numberOfPost) => {
    let baseSql = 'SELECT id, title, description, thumbnil, created FROM posts ORDER BY created DESC LIMIT ?';
    return db.query(baseSql, [numberOfPost]).then(([results, fields]) => {
    return Promise.resolve(results);
    })
        .catch((err) => Promise.reject(err));
};

PostModel.getPostById = (postId) => {
    let baseSQL =
        `SELECT u.username, p.title, p.description, p.photopath, p.created
         FROM users u 
         JOIN posts p 
         ON u.id=fk_userid 
         WHERE p.id=?;`;


    return db.execute(baseSQL, [postId])
        .then(([results, fields]) => {
            return Promise.resolve(results);
        })
        .catch((err) => Promise.reject(err))
};
module.exports = PostModel;