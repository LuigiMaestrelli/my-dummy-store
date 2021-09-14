import { DecimalFormatter } from '@/application/protocols/decimalFormatter';
import { IntlNumberDecimalFormatter } from '@/infrastructure/intlNumberDecimalFormatter';

export function useDecimalFormatter(): DecimalFormatter {
  return new IntlNumberDecimalFormatter();
}
