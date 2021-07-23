import faker from 'faker';

import { useTestId } from '.';

describe('UseTestId', () => {
  it('should data-testid key exists when NODE_ENV is equal to "test"', () => {
    const testId = `id-${faker.datatype.uuid()}`;
    const test = useTestId(testId);

    expect(Object.keys(test).length).toBe(1);
    expect(Object.values(test)[0]).toBe(testId);
  });

  it('should remove data-testid key not exists when NODE_ENV is different to "test"', () => {
    process.env = { ...process.env, REACT_APP_NODE_ENV: 'production' };
    const test = useTestId(`id-${faker.datatype.uuid()}`);

    expect(Object.keys(test).length).toBe(0);
  });
});
