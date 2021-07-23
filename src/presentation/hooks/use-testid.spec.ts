import { useTestId } from '.';

describe('UseTestId', () => {
  it('should remove data-testid key exists when NODE_ENV is different of "test"', () => {
    const test = useTestId('test-id');

    expect(Object.keys(test).length).toBe(1);
  });

  it('should remove data-testid key not exists when NODE_ENV is different of "test"', () => {
    process.env = { ...process.env, NODE_ENV: 'production' };
    const test = useTestId('test-id');

    expect(Object.keys(test).length).toBe(0);
  });
});
