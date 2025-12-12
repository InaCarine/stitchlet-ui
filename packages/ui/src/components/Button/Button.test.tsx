import { fireEvent, render, screen } from '@testing-library/react';

import { Button } from './';

describe('Button', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('matches snapshot', () => {
    const { container } = render(<Button appName="SnapApp">Snapshot</Button>);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders children', () => {
    render(<Button appName="TestApp">Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  it('calls alert with the appName when clicked', () => {
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    render(<Button appName="Awesome">Press</Button>);

    fireEvent.click(screen.getByRole('button'));

    expect(alertSpy).toHaveBeenCalledWith('Hello from your Awesome app!');
  });
});
