const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

// middlewares
app.use(express.json());

// miniapp
const authRouter = require('./routers/authRouter');
const userRouter = require('./routers/userRouter');
const productRouter = require('./routers/productRouter');
const cartRouter = require('./routers/cartRouter');

// use of miniapps
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/products', productRouter)
app.use('/cart', cartRouter);

app.listen(process.env.PORT, function() {
    console.log("server listening at " + process.env.PORT);
});

// mini apps
