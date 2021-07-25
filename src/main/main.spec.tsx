import { render, waitFor, RenderResult } from '@testing-library/react';

import { App } from '.';

function makeSut(): RenderResult {
  return render(<App />);
}

describe('MainApp', () => {
  test('should render App in screen', async () => {
    const sut = makeSut();

    await waitFor(() => sut.getByText(/Hello world/i));

    expect(sut.getByText(/Hello world/i)).toBeTruthy();
  });
});
