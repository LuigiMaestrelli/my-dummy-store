import { getUUIDGenerator } from '@/main/factories/infrastructure/uuidGenerator';

describe('UUIDGenerator Factory', () => {
  it('should return a valid IUUIDGenerator', () => {
    const result = getUUIDGenerator();
    expect(result).toBeTruthy();
  });
});
