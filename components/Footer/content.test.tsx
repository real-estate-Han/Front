import React from 'react';
import { render } from '@testing-library/react';
import FooterContent from './content';

describe('FooterContent 컴포넌트', () => {
  it('스냅샷이 일치하는지 확인한다.', () => {
    const { asFragment } = render(<FooterContent />);
    expect(asFragment()).toMatchSnapshot();
  });
});
