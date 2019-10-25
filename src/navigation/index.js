import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

import HomeScreen from '../screens/Home';
import TransactionScreen from '../screens/Transaction';
import SettingScreen from '../screens/Setting';
import InitialScreen from '../screens/Initial';
import EditBudgetScreen from '../screens/EditBudget';

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
  Setting: SettingScreen,
  EditBudget: EditBudgetScreen,
}, {
  drawerPosition: 'right',
  drawerType: 'slide',
  drawerBackgroundColor: '#282B35',
  drawerWidth: 250,
  hideStatusBar: true,
  contentComponent: props => <DrawerContent {...props} />,
});

export default createAppContainer(
  createSwitchNavigator({
    Initial: InitialScreen,
    App: AppNavigator,
    EditBudget: EditBudgetScreen,
  }, {
    initialRouteName: 'Initial',
  })
);
