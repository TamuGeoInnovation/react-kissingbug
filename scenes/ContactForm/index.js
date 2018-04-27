import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  StyleSheet,
  Button,
  Text,
  Image,
  TextInput,
  SectionList,
  StatusBar,
  View,
  TouchableOpacity,
  Platform
} from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import styles from './styles.js'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import AppActions from '../../components/appActions.js';
var appColors = require('../../components/appStyles.js')

export default class ContactForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitting: false,
      firstName: '',
      lastName: '',
      email: '',
      verifyEmail: '',
      message: '',
    }

  }

  resetState() {
    this.setState({
      submitting: false,
      firstName: '',
      lastName: '',
      email: '',
      verifyEmail: '',
      message: '',
    })
  }

  _onButtonPress() {

    if (this.state.email !== '' && this.state.message !== '') {

      if (this.checkEmailIsValid()) {
        this.setState({
          submitting: true,
        })
        this.sendXHRrequest();
      } else {
        Alert.alert("Attention", "Please make sure your email is correct");
      }
      
    } else {
      Alert.alert("Attention", "Please leave us your email and a message");
    }

  }

  checkEmailIsValid() {
    
    if (this.state.verifyEmail === this.state.email) {
      return true;
    }
    return false;
  }

  sendXHRrequest() {
    let contactUrl = 'http://165.91.120.42/kissingbug.tamu.edu/Rest/Contact/ReactPush/';
    // let contactUrl = 'https://kissingbug.tamu.edu/Rest/Contact/ReactPush/';
    var request = new XMLHttpRequest();
    request.onreadystatechange = (e) => {
      if (request.readyState !== 4) {
        return;
      }
      if (request.status === 200) {
        // this.setState({
        //   submitting: false,
        // })
        debugger
        Alert.alert('Message received', 'We appreciate your comments!');
        console.log('Success');
        this.resetState();
      } else {
        console.log("Error on sendXHRrequest()");
        debugger
        // this.setState({
        //   submitting: false,
        // })
        Alert.alert('Error', 'Something didn\'t go as planned, please try again later');
        this.resetState();
      }
    }
    var formData = new FormData();
    formData.append('firstName', this.state.firstName);
    formData.append('lastName', this.state.lastName);
    formData.append('email', this.state.email);
    formData.append('message', this.state.message);
    request.open('POST', contactUrl, true);
    request.timeout = 10000;
    request.send(formData);


  }

  render() {
    var emailsUnderLineColor = appColors.placeholderGrey
    if (this.state.email !== this.state.verifyEmail) {
      emailsUnderLineColor = appColors.errorRed
    } else {
      emailsUnderLineColor = appColors.placeholderGrey
    }
    let returnKeyType = 'next';
    if (this.state.submitting) {
      return (<ActivityIndicator
        animating={this.state.submitting}
        style={styles.centering}
        size="large"
      />)
    } else {
      return (
        <View style={styles.container}>
          <KeyboardAwareScrollView 
            showsVerticalScrollIndicator={false}
            extraHeight={12} >
            <Text style={styles.label}>
              Please use this form to submit any general questions that you may have. If you have had an encounter with a potential kissing bug and or want to submit a bug for review, you may also use this form to upload images. We do our best to reply promptly, but response time varies given our obligations in the field and laboratory; please be patient!
            </Text>
            <TextInput style={styles.contactTextInput}
              placeholder="First name"
              autoCapitalize='sentences'
              keyboardType='default'
              returnKeyType={returnKeyType}
              blurOnSubmit={true}
              placeholderTextColor={appColors.placeholderGrey}
              underlineColorAndroid={appColors.placeholderGrey}
              onChangeText={(text) => this.setState({ firstName: text })}
            />
            <TextInput style={styles.contactTextInput}
              placeholder="Last name"
              autoCapitalize='sentences'
              keyboardType='default'
              returnKeyType={returnKeyType}
              blurOnSubmit={true}
              placeholderTextColor={appColors.placeholderGrey}
              underlineColorAndroid={appColors.placeholderGrey}
              onChangeText={(text) => this.setState({ lastName: text })}
            />
            <TextInput style={styles.contactTextInput}
              placeholder="Email address"
              placeholderTextColor={appColors.placeholderGrey}
              underlineColorAndroid={appColors.placeholderGrey}
              keyboardType='email-address'
              blurOnSubmit={true}
              returnKeyType={returnKeyType}
              onChangeText={(text) => this.setState({ email: text })}
            />
            <TextInput style={styles.contactTextInput}
              placeholder="Verify email"
              keyboardType='email-address'
              returnKeyType={returnKeyType}
              placeholderTextColor={appColors.placeholderGrey}
              underlineColorAndroid={emailsUnderLineColor}
              onChangeText={(text) => this.setState({ verifyEmail: text })}
            />
            <TextInput style={styles.contactTextInput}
              placeholder="Message"
              autoCapitalize='sentences'
              keyboardType='default'
              returnKeyType={returnKeyType}
              blurOnSubmit={true}
              placeholderTextColor={appColors.placeholderGrey}
              underlineColorAndroid={appColors.placeholderGrey}
              onChangeText={(text) => this.setState({ message: text })}
            />
            <Button style={styles.button}
              color={appColors.submitButtonGreen}
              onPress={this._onButtonPress.bind(this)}
              title="Submit!" />
            <View style={{ height: 16 }} />
          </KeyboardAwareScrollView>
        </View>


      );
    }
  }
}

