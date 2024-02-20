require('dotenv').config();

const express = require('express');
const cors = require('cors');

const cardRoutes = require('./modules/card/routes');

/**
 * Application instances
 */

const app = express();

/**
 * Middlewares
 */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

/**
 * Routes
 */

app.get('/', (req, res) => {
	res.send('API is running');
});

app.use('/cards', cardRoutes);

/**
 * Run server
 */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`App listening at http://localhost:${PORT}`);
});
