const express = require('express');
const compress = require('compression');
const morgan = require('morgan');

const healthRouter = require('./routes/health');

const app = express();

app.use(compress());

app.disable('x-powered-by');

app.use('/health', healthRouter);

app.use(decodeURI);
app.use(express.json());


// Check for NODE_ENV

if (process.env.NODE_ENV) {
    console.log('Running on Environment: ${process.env.NODE_ENV}');
} else {
    console.log('Set NODE_ENV environment variable and restart.')
    process.exit();
}

app.listen(3000, () => {
    console.log('App listening on port 3000');
});
