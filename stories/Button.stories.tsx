/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import Button, { ButtonLink } from '../src/components/button/full';

const stories = storiesOf('Button', module);

stories
  .add('Primary', () => <Button>Primary</Button>)
  .add('As a link', () => <ButtonLink>As a Link</ButtonLink>)
  .add('Disabled', () => <Button disabled>Disabled</Button>)
  .add('Secondary', () => <Button secondary>Secondary</Button>)
  .add('Reverse', () => <Button reverse>Reverse</Button>);
