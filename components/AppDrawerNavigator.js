import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import { AppTabNavigator } from './AppTabNavigator'
import CustomSideBarMenu  from './CustomSideBarMenu';
import MyDonationScreen from '../screens/MyDonationScreen';
import NotificationScreen from '../screens/NotificationScreen';
import SettingScreen from '../screens/SettingScreen';
import MyReceivedBooksScreen from '../screens/MyReceivedBooksScreen';
import {Icon} from 'react-native-elements'
export const AppDrawerNavigator = createDrawerNavigator({
  Home : {
    screen : AppTabNavigator,
    navigationOptions:{
      drawerIcon:<Icon name='Home' type='fontawesome5' >

      </Icon>
    }
    },
  MyDonations : {
    screen : MyDonationScreen,
    navigationOptions:{
      drawerIcon:<Icon name='gift' type='fontawesome5' >

      </Icon>,
      drawerLabel:'my Donations'
    }
  },
  Notification : {
    screen : NotificationScreen,
    navigationOptions:{
      drawerIcon:<Icon name='bell' type='fontawesome5' >

      </Icon>,
      drawerLabel:'my notifications'
    }
  },
  MyReceivedBooks :{
    screen: MyReceivedBooksScreen,
    navigationOptions:{
      drawerIcon:<Icon name='gift' type='fontawesome5' >

      </Icon>,
      drawerLabel:'my Recieved books'
    }
  },
  Setting : {
    screen : SettingScreen,
    navigationOptions:{
      drawerIcon:<Icon name='settings' type='fontawesome5' >

      </Icon>,
      drawerLabel:'settings'
    }
  }
},
  {
    contentComponent:CustomSideBarMenu
  },
  {
    initialRouteName : 'Home'
  })
