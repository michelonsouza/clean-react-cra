import faker from 'faker';

describe('LocalStorage', () => {
  test('shoud call localstorage with corrected key and value', () => {
    const key = faker.random.word();
    const value = faker.random.words(6);

    localStorage.setItem(key, value);

    expect(localStorage.setItem).toHaveBeenCalledWith(key, value);
  });
});
