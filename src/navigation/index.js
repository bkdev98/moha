import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { useStoreState } from 'easy-peasy';

import HomeScreen from '../screens/Home';
import TransactionScreen from '../screens/Transaction';
import InitialScreen from '../screens/Initial';
import EditBudgetScreen from '../screens/EditBudget';
import EditLocaleScreen from '../screens/EditLocale';
import EditCurrencyScreen from '../screens/EditCurrency';
import PrivacyPolicyScreen from '../screens/PrivacyPolicy';
import FAQScreen from '../screens/FAQ';
import AboutScreen from '../screens/About';

import DrawerContent from './DrawerContent';

const HomeNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
  },
  Transaction: {
    screen: TransactionScreen,
  },
}, {
  defaultNavigationOptions: {
    header: null,
  },
});

const AppNavigator = createDrawerNavigator({
  Home: HomeNavigator,
  EditBudget: EditBudgetScreen,
  EditLocale: EditLocaleScreen,
  EditCurrency: EditCurrencyScreen,
  PrivacyPolicy: PrivacyPolicyScreen,
  FAQ: FAQScreen,
  About: AboutScreen,
}, {
  drawerPosition: 'right',
  drawerType: 'slide',
  drawerBackgroundColor: '#282B35',
  drawerWidth: 250,
  hideStatusBar: true,
  contentComponent: props => <DrawerContent {...props} />,
});

const AppContainer = createAppContainer(
  createSwitchNavigator({
    Initial: InitialScreen,
    App: AppNavigator,
    EditBudget: EditBudgetScreen,
  }, {
    initialRouteName: 'Initial',
  })
);

export default () => {
  const locale = useStoreState(state => state.app.locale);
  return <AppContainer screenProps={locale} />;
}
