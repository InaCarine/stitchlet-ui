'use client';

import { ElementType } from 'react';

import styles from './Button.module.css';
import { ButtonProps } from './types';

const defaultElement = 'button';

export const Button = <E extends ElementType = typeof defaultElement>({
  as,
  children,
  className,
  ...restProps
}: ButtonProps<E>) => {
  const Element = as || defaultElement;

  return (
    <Element className={`${styles.button} ${className ?? ''}`} {...restProps}>
      {children}
    </Element>
  );
};
