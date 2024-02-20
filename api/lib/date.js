/**
 * Returns the difference between two dates in days
 */
function diffInDays({ startDate, endDate }) {
	return endDate.getDate() - startDate.getDate();
}

/**
 * Get today's date in YYYY-MM-DD format
 */
function getToday() {
	return new Date().toISOString().split('T')[0];
}

module.exports = {
	diffInDays,
	getToday,
};
