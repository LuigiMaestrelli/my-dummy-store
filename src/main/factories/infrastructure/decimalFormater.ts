import { IDecimalFormatter } from '@/application/protocols/decimalFormatter';
import { IntlNumberDecimalFormatter } from '@/infrastructure/intlNumberDecimalFormatter';

export function useDecimalFormatter(): IDecimalFormatter {
  return new IntlNumberDecimalFormatter();
}
