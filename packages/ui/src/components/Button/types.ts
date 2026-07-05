import { ElementType } from 'react';

import { PolymorphicComponentProps } from '@/types/polymorphic-component';

export interface ButtonOwnProps {
  color?: string;
}

export type ButtonProps<E extends ElementType> = PolymorphicComponentProps<E, ButtonOwnProps>;
