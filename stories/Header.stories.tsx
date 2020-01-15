/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import Header from '../src/components/header/full';

const stories = storiesOf('Header', module);

stories.add('Header', () => <Header />);
