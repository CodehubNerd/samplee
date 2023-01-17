const {db} = require('../db.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');




exports.registeradmin = function(req, res) {
    //CHECK EXISTING USER
    const q = "SELECT * FROM admin WHERE admin_email = ? OR admin_username = ?";

    db.query(q, [req.body.email, req.body.username], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length) return res.status(409).json("Access Denied!");
  
      //Hash the password and create a user
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
  
      const q = "INSERT INTO admin(`admin_username`,`admin_email`,`admin_image`,`password`) VALUES (?)";
      const values = [req.body.username,req.body.email,req.body.images, hash];
  
      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("User has been created.");
      });
    });
}


exports.loginadmin = function(req, res) {
     //CHECK USER

     const q = "SELECT * FROM admin WHERE admin_username = ? ";

     db.query(q, [req.body.username], (err, data) => {
       if (err) return res.status(500).json(err);
       if (data.length === 0) return res.status(404).json("Admin not found!");
   
       //Check password
       const isPasswordCorrect = bcrypt.compareSync(
         req.body.password,
         data[0].password
       );
   
       if (!isPasswordCorrect)
         return res.status(400).json("Wrong username or password!");
   
       const token = jwt.sign({ id: data[0].id }, "jwtkey");
       const { password, ...other } = data[0];
   
       
       res.cookie("access_token", token, {
           httpOnly: true,
         }).status(200).json(other);
     });   
}


exports.logoutadmin = function(req, res) {
    res.clearCookie("access_token",{
        sameSite:"none",
        secure:true
      }).status(200).json("User has been logged out.")
}



