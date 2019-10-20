import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

import HomeScreen from '../screens/Home';
import NewTransactionScreen from '../screens/NewTransaction';
import SettingScreen from '../screens/Setting';

import DrawerContent from './DrawerContent';

const HomeNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
  },
  NewTransaction: {
    screen: NewTransactionScreen,
  },
}, {
  defaultNavigationOptions: {
    header: null,
  },
});

const AppNavigator = createDrawerNavigator({
  Home: HomeNavigator,
  Setting: SettingScreen,
}, {
  drawerPosition: 'right',
  drawerType: 'slide',
  drawerBackgroundColor: '#282B35',
  drawerWidth: 250,
  hideStatusBar: true,
  contentComponent: props => <DrawerContent {...props} />,
});

export default createAppContainer(AppNavigator);
