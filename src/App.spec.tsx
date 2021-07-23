import { cleanup } from '@testing-library/react';
import ReactDOM from 'react-dom';

import { renderApp } from '.';

jest.mock('react-dom');

describe('AppRender', () => {
  beforeEach(cleanup);

  it('should render app', () => {
    jest.spyOn(ReactDOM, 'render');

    renderApp();

    expect(ReactDOM.render).toHaveBeenCalled();
  });
});
