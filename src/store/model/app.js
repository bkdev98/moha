import { action } from 'easy-peasy';

export default {
  budget: 0,
  locale: 'en', // vi
  currency: 'usd', // vnd
  setBudget: action((state, payload) => ({
    ...state,
    budget: payload,
  })),
  setLocale: action((state, payload) => ({
    ...state,
    locale: payload,
  })),
  setCurrency: action((state, payload) => ({
    ...state,
    currency: payload,
  })),
};
