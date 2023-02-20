import { render, screen } from '@testing-library/react';
import Home from '@pages/index';

describe('Homepage', () => {
  it('renders a home', () => {
    render(<Home />);
    const heading = screen.getByRole('heading', { name: 'welcom to next' });
    expect(heading).toBeInTheDocument();
  });
});
