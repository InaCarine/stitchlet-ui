/* eslint-disable @typescript-eslint/no-empty-object-type */

type PropsWithAs<E extends React.ElementType> = {
  as?: E;
};

type PropsToOmit<E extends React.ElementType, P> = keyof (PropsWithAs<E> & P);

export type PolymorphicComponentProps<
  E extends React.ElementType,
  Props = {},
> = React.PropsWithChildren<Props & PropsWithAs<E>> &
  Omit<React.ComponentPropsWithRef<E>, PropsToOmit<E, Props>>;
