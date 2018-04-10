import React, { Component } from 'react';
import {
  AppRegistry,
  View,
  PermissionsAndroid,

} from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
var appColors = require('./components/appStyles.js')

import ContactForm from './scenes/ContactForm'
// import ContactFormWithAttachment from './scenes/ContactFormWithAttachment'
// import PhotoLibrary from './scenes/PhotoLibrary'
import Home from './scenes/Home'
import Identify from './scenes/Identify'
// import TakePhoto from './scenes/TakePhoto'



const TabView = TabNavigator({
  Home: {
    screen: Home,
    navigationOptions: () => ({
      tabBarLabel: 'About',
      title: 'Kissing Bugs',
      headerTintColor: appColors.yellow,
      headerStyle: { backgroundColor: appColors.blackish },
    }),
  },
  Identify: {
    screen: Identify,
    navigationOptions: () => ({
      tabBarLabel: 'Found a bug?',
      title: 'Kissing Bugs',
      headerTintColor: appColors.yellow,
      headerStyle: { backgroundColor: appColors.blackish },
    }),
  },
  Contact: {
    screen: ContactForm,
    navigationOptions: () => ({
      tabBarLabel: 'Contact us',
      title: 'Kissing Bugs',
      headerTintColor: appColors.yellow,
      headerStyle: { backgroundColor: appColors.blackish },
    }),
  },
  // SubmitaBug: {
  //   screen: ContactFormWithAttachment,
  //   navigationOptions: () => ({
  //     tabBarLabel: 'Submit a bug',
  //     title: 'Kissing Bugs',
  //     headerTintColor: appColors.yellow,
  //     headerStyle: { backgroundColor: appColors.blackish },
  //   }),
  // },

}, {
    tabBarOptions: {
      activeTintColor: appColors.yellow,
      labelStyle: {
        fontSize: 12,
      },
      indicatorStyle: {
        backgroundColor: appColors.yellow,
      },
      style: {
        backgroundColor: appColors.blackish,
      },
    }
  })


// const App = StackNavigator({
//   TabView: {
//     screen: TabView,
//     headerTintColor: appColors.blackish
//   },
//   TakePhoto: {
//     screen: TakePhoto,
//     navigationOptions: {
//       title: 'Take a photo',
//       headerTintColor: appColors.yellow,
//       headerStyle: { backgroundColor: appColors.blackish },
//     },
//   }
// }, {
//     cardStyle: {
//       backgroundColor: appColors.blackish,
//     }
//   })

// AppRegistry.registerComponent('KissingBug', () => App);
AppRegistry.registerComponent('KissingBug', () => TabView);
