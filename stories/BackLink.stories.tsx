/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import BackLink from '../src/components/back-link/full';

const stories = storiesOf('BackLink', module);

stories.add('BackLink', () => <BackLink>Link</BackLink>);
