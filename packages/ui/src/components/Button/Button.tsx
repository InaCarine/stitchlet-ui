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
  disabled,
  loading,
  ...restProps
}: ButtonProps<E>) => {
  const Element = as || defaultElement;
  const isButtonElement = Element === 'button';

  const isLoading = Boolean(isButtonElement && loading);
  const isDisabled = Boolean(isButtonElement && (disabled || loading));

  const buttonType =
    isButtonElement && 'type' in restProps ? (restProps.type ?? 'button') : 'button';
  const buttonOnClick =
    isButtonElement && !isDisabled && 'onClick' in restProps ? restProps.onClick : undefined;

  const buttonProps = isButtonElement
    ? {
        type: buttonType,
        'aria-disabled': isDisabled || undefined,
        onClick: buttonOnClick,
      }
    : {};

  const elementStyles = clsx(
    styles.button,
    styles[`button--${appearance}`],
    styles[`button--${variant}`],
    styles[`button--${size}`],
    iconBefore && styles['button--icon-before'],
    iconAfter && styles['button--icon-after'],
    shouldFitContainer && styles['button--fit-container'],
    isLoading && styles['button--loading'],
    className
  );

  return (
    <Element className={elementStyles} {...restProps} {...buttonProps}>
      {children}
    </Element>
  );
};
