import { ElementType } from 'react';

import { PolymorphicComponentProps } from '../../types/polymorphic-component';

interface ButtonBaseProps {
  appearance?: 'primary' | 'secondary' | 'warning' | 'danger' | 'success';
  variant?: 'solid' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  iconBefore?: React.ReactNode;
  iconAfter?: React.ReactNode;
  shouldFitContainer?: boolean;
}

interface NativeButtonProps extends ButtonBaseProps {
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  loading?: boolean;
}

type ButtonAsButton = PolymorphicComponentProps<'button', NativeButtonProps> & {
  as?: 'button';
};

type ButtonAsOther<E extends ElementType> = PolymorphicComponentProps<E, ButtonBaseProps> & {
  as: E;
};

export type ButtonProps<E extends ElementType = 'button'> = ButtonAsButton | ButtonAsOther<E>;
