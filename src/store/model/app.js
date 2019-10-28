import { action } from 'easy-peasy';
import i18n from 'i18n-js';
import moment from 'moment';
import 'moment/locale/vi';

export default {
  budget: 0,
  locale: null, // en,vi
  currency: null, // usd,vnd
  setBudget: action((state, payload) => ({
    ...state,
    budget: payload,
  })),
  setLocale: action((state, payload) => {
    i18n.locale = payload;
    moment.locale(payload);
    return {
      ...state,
      locale: payload,
    };
  }),
  setCurrency: action((state, payload) => ({
    ...state,
    currency: payload,
  })),
};
