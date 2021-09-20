import { IUUIDGenerator } from '@/application/protocols/uuidGenerator';

class UUIDGeneratorStub implements IUUIDGenerator {
  generate(): string {
    return 'valid uuid';
  }
}

export const makeUUIDGenerator = (): IUUIDGenerator => {
  return new UUIDGeneratorStub();
};
