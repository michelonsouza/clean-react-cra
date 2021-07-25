/* eslint-disable import/no-extraneous-dependencies */
import { render, waitFor, RenderResult } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import MakeLogin from '.';

const history = createMemoryHistory({
  initialEntries: ['/login'],
});

function makeSut(): RenderResult {
  return render(
    <Router history={history}>
      <MakeLogin />
    </Router>,
  );
}

describe('MakeLoginPage', () => {
  it('should be render LoginPage', async () => {
    const { getByText } = makeSut();

    await waitFor(() => getByText(/Login/i));

    expect(getByText(/Login/i)).toBeTruthy();
  });
});
