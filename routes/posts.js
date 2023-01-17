const express = require('express')
const {
   
    addPost,
    addcustomizer,
    addcustomizer1,
    addcustomizer2,
    getPost,
    getfeatures,
    getblogstotal,
    getblogs,
    getcustoms,
    getcustoms1,
    getcustoms2,
    getPosts,
    updatePost,
} = require('../controllers/post.js');



const router = express.Router();

router.get("/products", getPosts);
router.get("/blogs", getblogs);
router.get("/customs", getcustoms);
router.get("/customs1", getcustoms1);
router.get("/blogstotal", getblogstotal);

router.get("/customs2", getcustoms2);
router.get("/:id", getPost);
router.get("/", getfeatures);
router.post("/", addPost);

router.post("/styles", addcustomizer);
router.post("/styles1", addcustomizer1);
router.post("/styles2", addcustomizer2);
router.put("/:id", updatePost);

module.exports = router;

