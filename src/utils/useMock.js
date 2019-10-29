import React, { useEffect } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import moment from 'moment';

function getNonZeroRandomNumber(num){
  return Math.floor(Math.random() * (num * 2 + 1)) - num || getNonZeroRandomNumber();
}

const defaultItems = [{
  name: 'Coffee',
  icon: 2,
}, {
  name: 'Grab',
  icon: 3,
}, {
  name: 'Beer',
  icon: 6,
}, {
  name: 'Breakfast',
  icon: 24,
}, {
  name: 'Gift',
  icon: 27,
}, {
  name: 'Gym',
  icon: 33,
}, {
  name: 'Piano lesson',
  icon: 32,
}, {
  name: 'Dog food',
  icon: 8,
}, {
  name: 'Travel',
  icon: 4,
}];

const useMock = () => {
  const budget = useStoreState(state => state.app.budget);
  const mockTransaction = useStoreActions(state => state.transaction.mockTransaction);

  const avgValue = parseFloat(budget) / moment().daysInMonth() / 4.3;

  const getRandomItem = (day, hour = 7) => {
    const item = defaultItems[Math.floor(Math.random() * defaultItems.length)]
    return {
      ...item,
      value: avgValue + getNonZeroRandomNumber(avgValue),
      time: moment().set('date', day).set('hour', hour).toISOString(),
    }
  }

  useEffect(() => {
    const transactions = [];
    Array.from({ length: moment().daysInMonth() }, (v, i) => i + 1)
      .forEach(day => {
        if (day <= moment().get('date')) {
          transactions.push(
            getRandomItem(day, 7),
            getRandomItem(day, 9),
            getRandomItem(day, 12),
            getRandomItem(day, 17),
          );
        }
      });
    mockTransaction(transactions.reverse());
  }, []);

  return true;
}

export default useMock;
