const db = require('../db.js');


exports.getUsers = function(req, res) {
    const q = "SELECT  `id`,`username`,`email`,`contact`, `date` FROM users";
    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
  });

}