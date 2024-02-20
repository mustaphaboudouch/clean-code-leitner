const {
  getAllCards,
  createCard,
  getCardsByDate,
  updateCardAnswer,
} = require('../modules/card/actions');
const fetchMock = require('jest-fetch-mock');

fetchMock.enableMocks();

describe('Tests on get AllCards', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('fetch cards successfully', async () => {
    const cards = [{ id: 1, question: 'question', answer: 'No' }];
    fetch.mockResponseOnce(JSON.stringify(cards));

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    await getAllCards(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(cards);
  });
});

describe('Tests on create', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('should create a card successfully', async () => {
    const response = {
      id: 1,
      question: 'question one?',
      answer: 'Yes',
      tag: 'tags',
      category: 'FIRST',
    };
    fetch.mockResponseOnce(JSON.stringify(response));

    const req = {
      body: {
        question: 'question one?',
        answer: 'Yes',
        tag: 'tags',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await createCard(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(response);
  });
});

describe('Tests on get Cards By Date', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('fetches cards by date', async () => {
    const cards = [
      { id: 1, updatedAt: '2024-03-18', category: 'FIRST' },
      { id: 2, updatedAt: '2024-04-10', category: 'FIRST' },
      { id: 3, updatedAt: '2024-04-11', category: 'SECOND' },
      { id: 4, updatedAt: '2024-04-12', category: 'THIRD' },
    ];
    fetch.mockResponseOnce(JSON.stringify(cards));

    const req = {
      query: { updatedAt: '2024-04-10' },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getCardsByDate(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.arrayContaining([expect.objectContaining({ id: 2 })])
    );
  });

  it('fetches when no date is provided', async () => {
    const cards = [
      {
        id: 1,
        updatedAt: new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
          .toISOString()
          .split('T')[0],
        category: 'FIRST',
      },
      { id: 2, updatedAt: '2024-03-24', category: 'SECOND' },
    ];
    fetch.mockResponseOnce(JSON.stringify(cards));

    const req = { query: {} };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getCardsByDate(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.arrayContaining([expect.objectContaining({ id: 1 })])
    );
  });
});
