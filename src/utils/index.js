import { moneyToString, MoneyFormat } from 'short-money';
import store from '../store';

export function formatMoney(value) {
  const currency = store.getState().app.currency;
  if (value < 1000000 && currency === 'vnd') {
    return moneyToString(value, MoneyFormat.shortAndNoDecimal);
  }
  return moneyToString(value, MoneyFormat.short);
}
