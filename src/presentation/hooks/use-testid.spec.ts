import { useTestId } from '.';

describe('UseTestId', () => {
  it('should data-testid key exists when NODE_ENV is equal to "test"', () => {
    const test = useTestId('test-id');

    expect(Object.keys(test).length).toBe(1);
  });

  it('should remove data-testid key not exists when NODE_ENV is different to "test"', () => {
    process.env = { ...process.env, NODE_ENV: 'production' };
    const test = useTestId('test-id');

    expect(Object.keys(test).length).toBe(0);
  });
});
