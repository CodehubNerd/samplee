
const {db} = require('../db.js');
const jwt = require('jsonwebtoken')


exports.ordersIntake = function(req, res) {
 
    const q =
    "INSERT INTO orders(`cusomer_name`, `email`, `product_name`, `total_price`, `address_line`,`country`,`phone_number`,`date`) VALUES (?)";

  const values = [
    req.body.customername,
    req.body.email,
    req.body.productname,
    req.body.total,
    req.body.streetaddress,
    req.body.country,
    req.body.phone,
    req.body.date,
 
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("order taken.");
  });
    
}