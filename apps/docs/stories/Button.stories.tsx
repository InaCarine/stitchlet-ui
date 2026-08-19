import { Button, type ButtonProps } from '@stitchlet/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

type DefaultButtonProps = ButtonProps<'button'>;

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    as: {
      control: false,
    },
    className: {
      control: false,
    },
    appearance: {
      control: 'select',
      options: ['primary', 'warning', 'danger', 'success'],
    },
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
    },
    disabled: {
      control: 'boolean',
    },
    loading: {
      control: 'boolean',
    },
    iconBefore: {
      control: false,
    },
    iconAfter: {
      control: false,
    },
    shouldFitContainer: {
      control: 'boolean',
    },
  },
  args: {
    children: 'Button',
    appearance: 'primary',
    variant: 'solid',
    size: 'medium',
    disabled: false,
    loading: false,
    shouldFitContainer: false,
    type: 'button',
    onClick: fn(),
  } satisfies DefaultButtonProps,
} satisfies Meta<DefaultButtonProps>;

export default meta;

type Story = StoryObj<Meta<DefaultButtonProps>>;

export const Primary: Story = {};

export const Success: Story = {
  args: {
    appearance: 'success',
  } satisfies Partial<DefaultButtonProps>,
};

export const Danger: Story = {
  args: {
    appearance: 'danger',
  } satisfies Partial<DefaultButtonProps>,
};

export const Warning: Story = {
  args: {
    appearance: 'warning',
  } satisfies Partial<DefaultButtonProps>,
};

export const Disabled: Story = {
  args: {
    disabled: true,
  } satisfies Partial<DefaultButtonProps>,
};

export const Loading: Story = {
  args: {
    loading: true,
  } satisfies Partial<DefaultButtonProps>,
};

export const FullWidth: Story = {
  parameters: {
    layout: 'padded',
  },
  args: {
    shouldFitContainer: true,
  } satisfies Partial<DefaultButtonProps>,
};

export const WithLeadingIcon: Story = {
  args: {
    iconBefore: <span aria-hidden="true">←</span>,
    children: 'Back',
  } satisfies Partial<DefaultButtonProps>,
};

export const WithTrailingIcon: Story = {
  args: {
    iconAfter: <span aria-hidden="true">→</span>,
    children: 'Next',
  } satisfies Partial<DefaultButtonProps>,
};
