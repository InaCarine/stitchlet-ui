import { useEffect } from 'react';

type useClickOutsideProps = {
  elementRef: React.RefObject<HTMLElement | null>;
  callback: () => void;
  isOpen?: boolean;
};

export const useClickOutside = ({ elementRef, callback, isOpen = true }: useClickOutsideProps) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent | Event) => {
      if (elementRef?.current && !elementRef?.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [callback, elementRef, isOpen]);
};
