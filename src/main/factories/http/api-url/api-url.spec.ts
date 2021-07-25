import { makeApiUrl } from '.';

describe('ApiUrl', () => {
  it('should makeApiUrl returns a string', () => {
    const url = makeApiUrl();

    expect(typeof url).toBe('string');
  });
});
