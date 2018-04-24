import React, { Component } from 'react';
import {
  AppRegistry,
  View,
} from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
var appColors = require('./components/appStyles.js')

import ContactForm from './scenes/ContactForm'
import ContactFormWithAttachment from './scenes/ContactFormWithAttachment'
import Home from './scenes/Home'
import Identify from './scenes/Identify'

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
  SubmitaBug: {
    screen: ContactFormWithAttachment,
    navigationOptions: () => ({
      tabBarLabel: 'Submit a bug',
      title: 'Kissing Bugs',
      headerTintColor: appColors.yellow,
      headerStyle: { backgroundColor: appColors.blackish },
    }),
  },

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

AppRegistry.registerComponent('KissingBug', () => TabView);
