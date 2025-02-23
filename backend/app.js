const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const {errorConverter, errorHandler, notFoundHandler} = require('./middlewares');
const { authRoutes, productRoutes,categoryRoutes} = require('./routes');



const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/admin/products', productRoutes);
app.use('/api/products', productRoutes);




app.use(notFoundHandler);
app.use(errorConverter);
app.use(errorHandler);

module.exports = app;