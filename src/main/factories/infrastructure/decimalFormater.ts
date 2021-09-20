import { IDecimalFormatter } from '@/application/protocols/decimalFormatter';
import { IntlNumberDecimalFormatter } from '@/infrastructure/adapter/intlNumberDecimalFormatter';

export function useDecimalFormatter(): IDecimalFormatter {
  return new IntlNumberDecimalFormatter();
}
