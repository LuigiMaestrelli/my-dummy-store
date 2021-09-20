import { IUUIDGenerator } from '@/application/protocols/uuidGenerator';
import { UUIDGenerator } from '@/infrastructure/adapter/uuidGenerator';

const uuidGenerator = new UUIDGenerator();

export function getUUIDGenerator(): IUUIDGenerator {
  return uuidGenerator;
}
