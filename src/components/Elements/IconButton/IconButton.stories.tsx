import { Meta, Story } from '@storybook/react';

import { IconButton, IconButtonProps } from './IconButton';

const meta: Meta = {
  title: 'Components/Elements/IconButton',
  component: IconButton,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<IconButtonProps> = (props) => <IconButton {...props} />;

export const Primary = Template.bind({});
Primary.args = {
  children: 'Primary Button',
  variant: 'primary',
};

export const Inverse = Template.bind({});
Inverse.args = {
  children: 'Inverse Button',
  variant: 'inverse',
};

export const Danger = Template.bind({});
Danger.args = {
  children: 'Danger Button',
  variant: 'danger',
};
