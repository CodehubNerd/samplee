const db = require('../db.js');
const jwt = require('jsonwebtoken');


exports.getPosts = function(req, res) {
 
    const q = req.query.cat
    ? "SELECT * FROM products WHERE cat=?"
    : "SELECT * FROM products";
  db.query(q, [req.query.cat], (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(data);
  });
    
}

exports.getfeatures = function(req, res) {
 
    const q = req.query.cat
    ? "SELECT * FROM products WHERE cat=?"
    : "SELECT `id`,`product_name`,`product_price`, `product_description`,`product_image`,`product_availability`,`featured`,`cat` FROM products WHERE featured = 'featured'"
   ;
  db.query(q, [req.query.cat], (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(data);
  });

}


exports.getblogstotal = function(req, res) {
 
    const q = "SELECT count( * ) as  id FROM blog";
    db.query(q, [req.query.cat], (err, data) => {
      if (err) return res.status(500).send(err);
      return res.status(200).json(data);
    });

}



exports.getbeselling = function(req, res) {
 
    const q = req.query.cat
    ? "SELECT * FROM products WHERE cat=?"
    : "SELECT `id`,`product_name`,`product_price`, `product_description`,`product_image`,`product_availability`,`featured`,`cat` FROM products WHERE featured = 'nonfeatured' or  featured = 'Select"
   ;
  db.query(q, [req.query.cat], (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(data);
  });

}

exports.getblogs = function(req, res) {
 
    const q = req.query.cat
    ? "SELECT * FROM blog WHERE cat=?"
    : "SELECT * FROM blog";
  db.query(q, [req.query.cat], (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(data);
  });

}


exports.getcustoms = function(req, res) {
 
    const q = "SELECT * FROM customizer1";
    db.query(q, [req.params.id], (err, data) => {
      if (err) return res.status(500).send(err);
  
      return res.status(200).json(data);
    });

}


exports.getcustoms1 = function(req, res) {
 
    const q = "SELECT * FROM customizer2";
    db.query(q, [req.params.id], (err, data) => {
      if (err) return res.status(500).send(err);
  
      return res.status(200).json(data);
    });

}


exports.getcustoms2 = function(req, res) {
 
    const q = "SELECT * FROM customizer3";
    db.query(q, [req.params.id], (err, data) => {
      if (err) return res.status(500).send(err);
  
      return res.status(200).json(data);
    });

}

exports.getPost = function(req, res) {
 
    const q =
    "SELECT  `id`,`product_name`,`product_price`, `product_description`,`product_image`,`product_availability`,`cat` FROM products   WHERE id = ?";

    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data[0]);
  });

}
exports.addPost = function(req, res) {
 
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");
  
    jwt.verify(token, "jwtkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      const q =
        "INSERT INTO blog(`title`, `desc`, `img`, `cat`, `date`,`aid`) VALUES (?)";
  
      const values = [
        req.body.title,
        req.body.desc,
        req.body.file,
        req.body.cat,
        req.body.date,
        userInfo.id,
      ];
  
      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json("Post has been created.");
      });
    });

}

exports.addcustomizer = function(req, res) {
 
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");
  
    jwt.verify(token, "jwtkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      const q =
        "INSERT INTO customizer1(`backgroundColor`, `textMedium`, `textSmall`, `textPrice`, `productImage`,`admin_id`) VALUES (?)";
  
      const values = [
        req.body.backgoundColor,
        req.body.textmedium,
        req.body.textSmall,
        req.body.textPrice,
        req.body.productImage,
        userInfo.id,
      ];
  
      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json("Styles applied.");
      });
    });

}

exports.addcustomizer1 = function(req, res) {
 
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");
  
    jwt.verify(token, "jwtkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      const q =
        "INSERT INTO customizer2(`backgroundColor`, `textMedium`, `textSmall`, `textPrice`, `productImage`,`admin_id`) VALUES (?)";
  
      const values = [
        req.body.backgoundColor1,
        req.body.textmedium1,
        req.body.textSmall1,
        req.body.textPrice1,
        req.body.productImage1,
        userInfo.id,
      ];
  
      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json("Styles applied.");
      });
    });

}
exports.addcustomizer2 = function(req, res) {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");
  
    jwt.verify(token, "jwtkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      const q =
        "INSERT INTO customizer3(`backgroundColor`, `textMedium`, `textSmall`, `textPrice`, `productImage`,`admin_id`) VALUES (?)";
  
      const values = [
        req.body.backgoundColor2,
        req.body.textmedium2,
        req.body.textSmall2,
        req.body.textPrice2,
        req.body.productImage2,
        userInfo.id,
      ];
  
      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json("Styles applied.");
      });
    });


}
exports.updatePost = function(req, res) {
 
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");
  
    jwt.verify(token, "jwtkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      const postId = req.params.id;
      const q =
        "UPDATE posts SET `title`=?,`desc`=?,`img`=?,`cat`=? WHERE `id` = ? AND `aid` = ?";
  
      const values = [req.body.title, req.body.desc, req.body.img, req.body.cat];
  
      db.query(q, [...values, postId, userInfo.id], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json("Post has been updated.");
      });
    });

}
