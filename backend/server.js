require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 5000
const cors = require('cors')
const productsRouter = require('./routes/productsRouter')
const adminRouter = require('./routes/adminRouter')
const userRouter = require('./routes/userRouter')
const orderRouter = require('./routes/orderRouter')
const connectDb = require('./database/db/connectDb')

app.use(cors());
app.use(express.static(__dirname + '/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }))



app.use('/api/products', productsRouter)
app.use('/api/admin', adminRouter)
app.use('/api/user', userRouter)
app.use('/api/order', orderRouter)



if (process.env.NODE_ENV === 'production') { // Set static folder 
  app.use(express.static('frontend/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}

connectDb();

app.listen(port, () => { console.log(`Server is running on ${port}`) })
