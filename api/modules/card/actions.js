const asyncHandler = require('../../lib/asyncHandler');
const { getToday } = require('../../lib/date');
const ApiError = require('../../lib/error');
const { CATEGORY_TYPES_NAMES, CARD_ERROR_MESSAGES } = require('./constants');
const { getNextCategory, isCardAnswerable } = require('./utils');

/**
 * Get all user cards
 */
async function getAllCards(_req, res) {
	asyncHandler(async () => {
		const response = await fetch(`${process.env.DATABASE_URL}/cards`);
		const cards = await response.json();

		res.status(200).json(cards);
	});
}

/**
 * Create a new card
 */
async function createCard(req, res) {
	asyncHandler(async () => {
		const { question, answer, tag } = req.body;

		if (!question || !answer) {
			throw new ApiError(CARD_ERROR_MESSAGES.QUESTION_AND_ANSWER_REQUIRED, 400);
		}

		const newCard = {
			question,
			answer,
			tag,
			category: CATEGORY_TYPES_NAMES.FIRST,
			updatedAt: getToday(),
		};

		const response = await fetch(`${process.env.DATABASE_URL}/cards`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newCard),
		});
		const createdCard = await response.json();

		res.status(201).json(createdCard);
	});
}

/**
 * Get all cards by date
 * If no date is provided, return today's cards
 */
async function getCardsByDate(req, res) {
	asyncHandler(async () => {
		const { date } = req.query;

		const dateFilter = date ? date : getToday();
		const formattedDate = new Date(dateFilter);

		const response = await fetch(`${process.env.DATABASE_URL}/cards`);
		const cards = await response.json();

		const filteredCards = cards.filter((card) =>
			isCardAnswerable({ card, date: formattedDate }),
		);

		res.status(200).json(filteredCards);
	});
}

/**
 * Update card answer
 */
async function updateCardAnswer(req, res) {
	asyncHandler(async () => {
		const { cardId } = req.params;
		const { isValid } = req.body;

		if (isValid == undefined) {
			throw new ApiError(CARD_ERROR_MESSAGES.IS_VALID_REQUIRED, 400);
		}

		const response1 = await fetch(
			`${process.env.DATABASE_URL}/cards/${cardId}`,
		);
		const card = await response1.json();

		if (!card) {
			throw new ApiError(CARD_ERROR_MESSAGES.CARD_NOT_FOUND, 404);
		}

		if (!isCardAnswerable({ card, date: new Date(getToday()) })) {
			throw new ApiError(CARD_ERROR_MESSAGES.CARD_CANT_BE_ANSWERED_YET, 400);
		}

		const nextCategory = getNextCategory({
			currentCategory: card.category,
			isValid,
		});

		const response2 = await fetch(
			`${process.env.DATABASE_URL}/cards/${cardId}`,
			{
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					category: nextCategory,
					updatedAt: getToday(),
				}),
			},
		);
		const updatedCard = await response2.json();

		return res.status(200).json({ card: updatedCard });
	});
}

module.exports = {
	getAllCards,
	createCard,
	getCardsByDate,
	updateCardAnswer,
};
