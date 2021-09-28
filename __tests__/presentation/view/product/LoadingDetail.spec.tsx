import { render } from '@testing-library/react';
import LoadingDetail from '@/presentation/view/product/LoadingDetail';

describe('LoadingDetail', () => {
  it('should render the component', () => {
    const result = render(<LoadingDetail />);
    expect(result.baseElement).toBeVisible();
  });
});
