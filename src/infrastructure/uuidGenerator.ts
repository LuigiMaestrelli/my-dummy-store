import { v4 as uuidv4 } from 'uuid';
import { IUUIDGenerator } from '@/application/protocols/uuidGenerator';

export class UUIDGenerator implements IUUIDGenerator {
  generate(): string {
    return uuidv4();
  }
}
