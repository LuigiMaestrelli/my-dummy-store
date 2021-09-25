import { render } from '@testing-library/react';

import { Offset } from '@/presentation/components/common/AppBar/components';

describe('AppBar - Offset Component', () => {
  it('should render the offset component', () => {
    const renderResult = render(<Offset />);
    expect(renderResult.baseElement).toBeInTheDocument();
  });
});
