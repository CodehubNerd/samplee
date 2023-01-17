const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const getUsers = require('./routes/users.js');
const takeorders = require('./routes/takeorders.js');
const productspost = require('./routes/products.js');

const postRoutes = require('./routes/posts.js');
const authRoutes = require('./routes/auth.js');

const app = express();
app.use(express.json());

/*middlewares*/
app.use(cors({
    origin: ['http://localhost:3000','http://localhost:5000','http://localhost:3001'],
    methods: ['GET', 'POST'],
    credentials:true
}));


app.use(cookieParser());


app.get('/', (req, res) => {
  res.send('server is live!')
})

app.use("/api/posts", postRoutes);
app.use("/api/takeorders", takeorders);
app.use("/api/users", getUsers);
app.use("/api/products", productspost);
app.use("/api/auth", authRoutes);


const port = process.env.PORT || 5000;




app.listen(port, () => {
  console.log(`Server is listening on the port http://localhost:5000/ ${port}.`)
})