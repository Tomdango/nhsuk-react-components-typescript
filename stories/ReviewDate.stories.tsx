/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { ReviewDate } from '../src';

const stories = storiesOf('Review Date', module);

stories
  .add('Standard', () => <ReviewDate lastReview="12 Feburary 2016" nextReview="1 Feburary 2019" />)
  .add('Just Last Review', () => <ReviewDate lastReview="12 Feburary 2016" />)
  .add('Just next review', () => <ReviewDate nextReview="1 Feburary 2019"></ReviewDate>);
