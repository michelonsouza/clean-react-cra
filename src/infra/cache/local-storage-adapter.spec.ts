import { cleanup } from '@testing-library/react';
import faker from 'faker';
import 'jest-localstorage-mock';

import { LocalStorageAdapter } from './local-storage-adapter';

function makeSut(): LocalStorageAdapter {
  return new LocalStorageAdapter();
}

describe('LocalStorageAdapter', () => {
  afterEach(cleanup);

  beforeEach(() => {
    localStorage.clear();
  });

  it('should call localStorage.setItem', async () => {
    const sut = makeSut();
    const key = faker.database.column();
    const value = faker.random.word();

    await sut.set(key, value);

    expect(localStorage.setItem).toBeCalled();
  });
});
