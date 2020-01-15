/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowRightCircle,
  ChevronLeft,
  ChevronRight,
  Close,
  SmallEmdash,
  Cross,
  Emdash,
  Minus,
  Plus,
  Search,
  Tick,
} from '../src/components/icons/full';

const stories = storiesOf('Icons', module);

stories
  .add('ArrowLeft', () => <ArrowLeft />)
  .add('ArrowRight', () => <ArrowRight />)
  .add('ArrowRightCircle', () => <ArrowRightCircle />)
  .add('ChevronLeft', () => <ChevronLeft />)
  .add('ChevronRight', () => <ChevronRight />)
  .add('Close', () => <Close />)
  .add('Cross', () => <Cross />)
  .add('SmallEmdash', () => <SmallEmdash />)
  .add('Emdash', () => <Emdash />)
  .add('Minus', () => <Minus />)
  .add('Plus', () => <Plus />)
  .add('Search', () => <Search />)
  .add('Tick', () => <Tick />);
