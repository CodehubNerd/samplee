const {db} = require('../db.js');
const jwt = require('jsonwebtoken');



exports.postproduct = function(req, res) {
 
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");
  
    jwt.verify(token, "jwtkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      
      const q = "INSERT INTO products(`product_name`, `product_price`, `product_dicount`, `product_description`,`product_image`,`product_availability`,`cat`,`post_date`,`featured`,`aid`) VALUES (?)";
      const values = [
        req.body.productpost,
        req.body.productprice,
        req.body.productdiscount,
        req.body.value,
        req.body.file,
        req.body.productavailibility,
        req.body.cat,
        req.body.date,
        req.body.featured,
        userInfo.id,
      ];
  
      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json('error from backend',err);
        return res.json("Post has been created.");
      });
    });
    
}

exports.getProduct = function(req, res) {
 
    const q =
    "SELECT  `id`,`product_name`,`product_price`, `product_description`,`product_image`,`product_availability`,`cat` FROM products   WHERE id = ?";

    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);
    
        return res.status(200).json(data[0]);
  });
    
}


exports.getblogdetailts = function(req, res) {
    const q =
    "SELECT b.id, `title`, `desc`,`b.img`, `cat`,`date` FROM admin a JOIN blog b ON a.id = b.aid WHERE b.id = ?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data[0]);
  });
}


exports.updatePost = function(req, res) {
 
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");
  
    jwt.verify(token, "jwtkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      const postId = req.params.id;
      const q =
        "UPDATE products SET `product_name`=?,`product_price`=?,`product_dicount`=?,`product_description`=?,`product_image`=?,`product_availability`,`cat`=? WHERE `id` = ? AND `aid` = ?";
  
        const values = [
          req.body.productpost,
          req.body.productprice,
          req.body.productdiscount,
          req.body.value,
          req.body.productavailibility,
          req.body.file,
          req.body.cat,
        ];
  
      db.query(q, [...values, postId, userInfo.id], (err, data) => {
        if (err) return res.status(500).json('error from backend',err);
        return res.json("Post has been updated.");
      });
    });
    
}



exports.deletePost = function(req, res) {
 
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");
  
    jwt.verify(token, "jwtkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      const postId = req.params.id;
      const q = "DELETE FROM products WHERE `id` = ? AND `aid` = ?";
  
      db.query(q, [postId, userInfo.id], (err, data) => {
        if (err) return res.status(403).json("You can delete only your post!");
  
        return res.json("Post has been deleted!");
      });
    });
    
}

