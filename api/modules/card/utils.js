const { diffInDays } = require('../../lib/date');
const {
	CATEGORY_TYPES,
	CATEGORY_TYPES_NAMES,
	CATEGORY_TYPES_FREQUENCY,
} = require('./constants');

/**
 * Get next category based on current category and if the answer is valid
 */
function getNextCategory({ currentCategory, isValid }) {
	if (currentCategory === CATEGORY_TYPES_NAMES.DONE) {
		return CATEGORY_TYPES_NAMES.DONE;
	}

	if (isValid) {
		return CATEGORY_TYPES[CATEGORY_TYPES.indexOf(currentCategory) + 1];
	}

	return CATEGORY_TYPES_NAMES.FIRST;
}

/**
 * Get if card is can be answered this date
 */
function isCardAnswerable({ card, date }) {
	if (card.category === CATEGORY_TYPES_NAMES.DONE) {
		return false;
	}

	const daysDiff = diffInDays({
		startDate: new Date(card.updatedAt),
		endDate: date,
	});

	if (daysDiff <= 0) {
		return false;
	}

	for (const categoryType of CATEGORY_TYPES) {
		if (
			card.category === categoryType &&
			daysDiff % CATEGORY_TYPES_FREQUENCY[categoryType] === 0
		) {
			return true;
		}
	}

	return false;
}

module.exports = {
	getNextCategory,
	isCardAnswerable,
};
