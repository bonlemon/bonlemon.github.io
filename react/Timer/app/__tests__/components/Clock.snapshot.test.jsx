import React from 'react';
import Clock from 'Clock';

//  It provides a React renderer that can be used to render React components to pure JavaScript objects.
import renderer from 'react-test-renderer';

describe('Clock component renders the clock correctly', () => {
  it('renders correctly', () => {
    const seconds = 63;
    const rendered = renderer.create(
      <Clock timeInSeconds={seconds}/>
    );

    expect(rendered.toJSON()).toMatchSnapshot();
  });
});