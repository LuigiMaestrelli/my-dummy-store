import { IUUIDGenerator } from '@/application/protocols/uuidGenerator';
import { UUIDGenerator } from '@/infrastructure/uuidGenerator';

const uuidGenerator = new UUIDGenerator();

export function getUUIDGenerator(): IUUIDGenerator {
  return uuidGenerator;
}
