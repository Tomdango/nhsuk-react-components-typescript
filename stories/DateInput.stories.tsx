/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import DateInput from '../src/components/date-input/full';
import Form from '../src/components/form';
import Fieldset from '../src/components/fieldset/full';

const stories = storiesOf('DateInput', module);

stories
  .add('Standard', () => (
    <Form>
      <Fieldset aria-describedby="dob-hint">
        <Fieldset.Legend>What is your date of birth?</Fieldset.Legend>
        <DateInput id="dob" name="dob" hint="For example, 31 3 1980"></DateInput>
      </Fieldset>
    </Form>
  ))
  .add('With individual elements', () => (
    <Form>
      <Fieldset aria-describedby="dob-hint">
        <Fieldset.Legend>What is your date of birth?</Fieldset.Legend>
        <DateInput id="dob" name="dob" hint="For example, 31 3 1980">
          <DateInput.Day />
          <DateInput.Month />
          <DateInput.Year />
        </DateInput>
      </Fieldset>
    </Form>
  ))
  .add('With missing components', () => (
    <Form>
      <Fieldset aria-describedby="dob-hint">
        <Fieldset.Legend>What is your date of birth?</Fieldset.Legend>
        <DateInput id="dob" name="dob" hint="For example, 31 3 1980">
          <DateInput.Month />
          <DateInput.Year />
        </DateInput>
      </Fieldset>
    </Form>
  ))
  .add('With autoFocusNext', () => (
    <Form>
      <Fieldset aria-describedby="dob-hint">
        <Fieldset.Legend>What is your date of birth?</Fieldset.Legend>
        <DateInput id="dob" name="dob" hint="For example, 31 3 1980" autoFocusNext>
          <DateInput.Day />
          <DateInput.Month />
          <DateInput.Year />
        </DateInput>
      </Fieldset>
    </Form>
  ))
  .add('With autoFocusNext and missing elements', () => (
    <Form>
      <Fieldset aria-describedby="dob-hint">
        <Fieldset.Legend>What is your date of birth?</Fieldset.Legend>
        <DateInput id="dob" name="dob" hint="For example, 31 3 1980" autoFocusNext>
          <DateInput.Day />
          <DateInput.Year />
        </DateInput>
      </Fieldset>
    </Form>
  ))
  .add('With autoComplete Attribute', () => (
    <Form>
      <Fieldset>
        <Fieldset.Legend>What is your date of birth?</Fieldset.Legend>
        <DateInput hint="For example, 31 3 1980">
          <DateInput.Day autoComplete="bday-day" />
          <DateInput.Month autoComplete="bday-month" />
          <DateInput.Year autoComplete="bday-year" />
        </DateInput>
      </Fieldset>
    </Form>
  ))
  .add('With Error (Boolean)', () => (
    <Form>
      <Fieldset>
        <Fieldset.Legend>What is your date of birth?</Fieldset.Legend>
        <DateInput hint="For example, 31 3 1980" error>
          <DateInput.Day autoComplete="bday-day" />
          <DateInput.Month autoComplete="bday-month" />
          <DateInput.Year autoComplete="bday-year" />
        </DateInput>
      </Fieldset>
    </Form>
  ))
  .add('With Error (String)', () => (
    <Form>
      <Fieldset>
        <Fieldset.Legend>What is your date of birth?</Fieldset.Legend>
        <DateInput hint="For example, 31 3 1980" error="Error message goes here">
          <DateInput.Day autoComplete="bday-day" />
          <DateInput.Month autoComplete="bday-month" />
          <DateInput.Year autoComplete="bday-year" />
        </DateInput>
      </Fieldset>
    </Form>
  ))
  .add('With Error on Specific Components', () => (
    <Form>
      <Fieldset>
        <Fieldset.Legend>What is your date of birth?</Fieldset.Legend>
        <DateInput hint="For example, 31 3 1980">
          <DateInput.Day autoComplete="bday-day" error />
          <DateInput.Month autoComplete="bday-month" />
          <DateInput.Year autoComplete="bday-year" error />
        </DateInput>
      </Fieldset>
    </Form>
  ));
