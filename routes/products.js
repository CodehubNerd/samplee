const express = require('express')
const {postproduct,getProduct,getblogdetailts,deletePost,updatePost} = require('../controllers/product.js');

const router = express.Router();
router.post("/", postproduct);
router.get("/:id", getblogdetailts);
router.get("/", getProduct);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

module.exports = router;


