import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Button } from './';

describe('Button', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('matches snapshot', () => {
    const { container } = render(<Button>Snapshot</Button>);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  it('renders as the provided element', () => {
    render(
      <Button as="a" href="/test">
        Link button
      </Button>
    );

    expect(screen.getByRole('link')).toHaveAttribute('href', '/test');
  });

  it('defaults type to button', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('respects an explicit type', () => {
    render(<Button type="submit">Submit</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });

  it('sets aria-disabled when disabled', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'true');
  });

  it('sets aria-disabled when loading', () => {
    render(<Button loading>Loading</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'true');
  });

  it('does not call onClick when disabled', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();

    render(
      <Button disabled onClick={onClick}>
        Disabled
      </Button>
    );

    await user.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('calls onClick when enabled', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();

    render(<Button onClick={onClick}>Enabled</Button>);

    await user.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
