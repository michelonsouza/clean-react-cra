import faker from 'faker';

import { SetStorageSpy } from 'data/mocks';

import { LocalSaveAccessToken } from './local-save-access-token';

type SutTypes = {
  sut: LocalSaveAccessToken;
  setStorageSpy: SetStorageSpy;
};

function makeSut(): SutTypes {
  const setStorageSpy = new SetStorageSpy();
  const sut = new LocalSaveAccessToken(setStorageSpy);

  return {
    sut,
    setStorageSpy,
  };
}

describe('LocalSaveAccessToken', () => {
  it('should call setStorage with correct value', async () => {
    const { sut, setStorageSpy } = makeSut();
    const accessToken = faker.datatype.uuid();

    await sut.save(accessToken);

    expect(setStorageSpy.key).toBe('accessToken');
    expect(setStorageSpy.value).toBe(accessToken);
  });
});
