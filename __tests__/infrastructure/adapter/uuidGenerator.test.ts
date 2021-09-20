import { UUIDGenerator } from '@/infrastructure/adapter/uuidGenerator';

const makeSut = (): UUIDGenerator => {
  return new UUIDGenerator();
};

const validationRegex =
  /^[A-Za-z0-9]{8}-[A-Za-z0-9]{4}-4[A-Za-z0-9]{3}-[A-Za-z0-9]{4}-[A-Za-z0-9]{12}$/;

const isUUIDValid = (arg: string): boolean => {
  return validationRegex.test(arg);
};

describe('UUID Adapter', () => {
  test('should generate a valid uuid', () => {
    const sut = makeSut();

    const uuid = sut.generate();

    expect(uuid).toBeTruthy();
    expect(isUUIDValid(uuid)).toBe(true);
  });
});
