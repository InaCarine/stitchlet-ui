import { useRef } from 'react';
import { fireEvent, render } from '@testing-library/react';

import { useClickOutside } from '../useClickOutside';

const TestComponent = ({
  onOutsideClick,
  isOpen = true,
}: {
  onOutsideClick: () => void;
  isOpen?: boolean;
}) => {
  const elementRef = useRef(null);

  useClickOutside({ elementRef, callback: onOutsideClick, isOpen });

  return (
    <div>
      <div ref={elementRef} data-testid="inside-element">
        Inside Element
      </div>
      <div data-testid="outside-element">Outside Element</div>
    </div>
  );
};

const mockCallback = jest.fn();

describe('useClickOutside', () => {
  it('should call the callback when clicking outside the element', () => {
    const { getByTestId } = render(<TestComponent onOutsideClick={mockCallback} />);

    fireEvent.click(getByTestId('outside-element'));
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it('should not call the callback when clicking inside the element', () => {
    const { getByTestId } = render(<TestComponent onOutsideClick={mockCallback} />);

    fireEvent.click(getByTestId('inside-element'));
    expect(mockCallback).not.toHaveBeenCalled();
  });

  it('should not trigger the callback when isOpen is false', () => {
    const { getByTestId } = render(<TestComponent onOutsideClick={mockCallback} isOpen={false} />);

    fireEvent.click(getByTestId('outside-element'));
    expect(mockCallback).not.toHaveBeenCalled();
  });

  it('should clean up event listeners on unmount', () => {
    const { getByTestId, unmount } = render(<TestComponent onOutsideClick={mockCallback} />);

    fireEvent.click(getByTestId('outside-element'));
    expect(mockCallback).toHaveBeenCalledTimes(1);

    unmount();
    fireEvent.click(document);

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });
});
