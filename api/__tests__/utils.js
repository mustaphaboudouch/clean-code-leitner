const { getNextCategory, isCardAnswerable } = require('../modules/card/utils');
const { CATEGORY_TYPES_NAMES } = require('../modules/card/constants');

describe('getNextCategory function', () => {
  test('should return FIRST category if current is DONE and isValid is true', () => {
    const result = getNextCategory({
      currentCategory: CATEGORY_TYPES_NAMES.DONE,
      isValid: true,
    });
    expect(result).toBe(CATEGORY_TYPES_NAMES.DONE);
  });

  test('should return NEXT category if isValid is true', () => {
    const result = getNextCategory({
      currentCategory: CATEGORY_TYPES_NAMES.FIRST,
      isValid: true,
    });
    expect(result).toBe(CATEGORY_TYPES_NAMES.SECOND);
  });

  test('should return FIRST category if isValid is false', () => {
    const result = getNextCategory({
      currentCategory: CATEGORY_TYPES_NAMES.SECOND,
      isValid: false,
    });
    expect(result).toBe(CATEGORY_TYPES_NAMES.FIRST);
  });
});

describe('isCardAnswerable function', () => {
  test('should return false if card category is DONE', () => {
    const card = { category: CATEGORY_TYPES_NAMES.DONE, updatedAt: new Date() };
    const result = isCardAnswerable({ card, date: new Date() });
    expect(result).toBe(false);
  });

  test('should return true if card category matches frequency requirement', () => {
    const card = {
      category: CATEGORY_TYPES_NAMES.FIRST,
      updatedAt: new Date('2021-01-01'),
    };
    const result = isCardAnswerable({ card, date: new Date('2021-01-02') });
    expect(result).toBe(true);
  });

  test('should return false if card does not match frequency requirement', () => {
    const card = {
      category: CATEGORY_TYPES_NAMES.SECOND,
      updatedAt: new Date('2021-01-01'),
    };
    const result = isCardAnswerable({ card, date: new Date('2021-01-02') });
    expect(result).toBe(false);
  });
});
