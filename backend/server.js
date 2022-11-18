require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 5000
const productsRouter = require('./routes/productsRouter')
const adminRouter = require('./routes/adminRouter')


const connectDb = require('./database/db/connectDb')

connectDb();

app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use('/api/products', productsRouter)
app.use('/api/admin', adminRouter)

app.listen(port, () => { console.log(`Server is running on ${port}` ) })

