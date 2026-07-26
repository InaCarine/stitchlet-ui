'use client';

import { ElementType } from 'react';
import { clsx } from '@stitchlet/utilities';

import styles from './Button.module.css';
import { ButtonProps } from './types';

const defaultElement = 'button';

export const Button = <E extends ElementType = typeof defaultElement>({
  as,
  children,
  className,
  appearance = 'primary',
  variant = 'solid',
  size = 'medium',
  iconBefore,
  iconAfter,
  shouldFitContainer,
  ...props
}: ButtonProps<E>) => {
  const Element = as || defaultElement;
  const isButtonElement = Element === 'button';

  const disabled = isButtonElement && 'disabled' in props ? props.disabled : undefined;
  const loading = isButtonElement && 'loading' in props ? props.loading : undefined;
  const type = isButtonElement && 'type' in props ? (props.type ?? 'button') : undefined;

  const elementProps = isButtonElement
    ? {
        ...props,
        type,
        disabled,
      }
    : props;

  const elementStyles = clsx(
    styles.button,
    styles[`button--${appearance}`],
    styles[`button--${variant}`],
    styles[`button--${size}`],
    iconBefore && styles['button--icon-before'],
    iconAfter && styles['button--icon-after'],
    shouldFitContainer && styles['button--fit-container'],
    disabled && styles['button--disabled'],
    loading && styles['button--loading'],
    className
  );

  return (
    <Element className={elementStyles} {...elementProps}>
      {children}
    </Element>
  );
};
