import { action } from 'easy-peasy';

export default {
  items: [],
  addTransaction: action((state, payload) => ({
    ...state,
    items: [...state.items, payload],
  })),
};
