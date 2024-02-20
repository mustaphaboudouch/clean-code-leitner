require('dotenv').config();

const express = require('express');
const cors = require('cors');

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
 * Run server
 */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`App listening at http://localhost:${PORT}`);
});
