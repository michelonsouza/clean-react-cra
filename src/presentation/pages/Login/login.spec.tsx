import { render } from '@testing-library/react';

import { Login } from '.';

describe('LoginPage', () => {
  it('should not be render spinner and error on application start', () => {
    const { getByTestId } = render(<Login />);
    const errorWrapper = getByTestId('error-wrapper');

    expect(errorWrapper.childElementCount).toBe(0);
  });
});
