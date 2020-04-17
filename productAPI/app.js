const express = require('express');
const compress = require('compression');
const morgan = require('morgan');
const middlewares = require('./utils/middlewares');

const healthRouter = require('./routes/health');
const productsRouter = require('./routes/products');

const app = express();

// set up compression for performance
app.use(compress());
// disable x-powered-by header for security
app.disable('x-powered-by');

// health router for checking service health
app.use('/health', healthRouter);

// decode any encoded characters in the request
app.use(middlewares.decodeURI);
app.use(express.json());

// pass req, res on to product router
app.use('/products', productsRouter);

//

// Check for NODE_ENV
if (process.env.NODE_ENV) {
    console.log(`Running on Environment: ${process.env.NODE_ENV}`);
} else {
    console.log('Set NODE_ENV environment variable and restart.')
    process.exit();
}

app.listen(3000, () => {
    console.log('App listening on port 3000');
});
