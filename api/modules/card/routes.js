const router = require('express').Router();
const {
	getAllCards,
	createCard,
	getCardsByDate,
	updateCardAnswer,
} = require('./actions');

router.get('/', getAllCards);

router.post('/', createCard);

router.get('/quizz', getCardsByDate);

router.patch('/:cardId/answer', updateCardAnswer);

module.exports = router;
