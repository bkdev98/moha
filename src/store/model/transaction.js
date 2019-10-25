import { action } from 'easy-peasy';

export default {
  items: [],
  addTransaction: action((state, payload) => ({
    ...state,
    items: [payload, ...state.items],
  })),
  editTransaction: action((state, payload) => ({
    ...state,
    items: state.items.map(i => i.time === payload.time ? payload : i),
  })),
  deleteTransaction: action((state, payload) => ({
    ...state,
    items: state.items.filter(i => i.time !== payload),
  })),
};
