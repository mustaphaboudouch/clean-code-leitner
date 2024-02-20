const ApiError = require('./error');

function asyncHandler(callback) {
	try {
		return callback();
	} catch (error) {
		if (error instanceof ApiError) {
			return res.status(error.status).json({ message: error.message });
		}
		return res.status(500).json({ message: 'internal server error' });
	}
}

module.exports = asyncHandler;
