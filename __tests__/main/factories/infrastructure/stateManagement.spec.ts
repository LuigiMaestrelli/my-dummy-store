import { getStateManagement } from '@/main/factories/infrastructure/stateManagement';

describe('StateManagement Factory', () => {
  it('should return a valid IStateManagement', () => {
    const result = getStateManagement();
    expect(result).toBeTruthy();
  });
});
