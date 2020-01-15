import React from 'react';
import ReviewDate from '..';
import { shallow } from 'enzyme';

describe('ReviewDate', () => {
  it('matches snapshot', () => {
    const element = shallow(<ReviewDate />);
    expect(element).toMatchSnapshot('ReviewDate');
    element.unmount();
  });

  it('works with lastReview and nextReview', () => {
    const element = shallow(
      <ReviewDate lastReview="19 November 2019" nextReview="19 November 2020"></ReviewDate>,
    );
    expect(element.containsMatchingElement(<br />)).toBeTruthy();
    expect(element.text()).toBe(
      'Page last reviewed: 19 November 2019Next review due: 19 November 2020',
    );
    element.unmount();
  });
});
