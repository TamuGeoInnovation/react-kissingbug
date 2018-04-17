import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  PermissionsAndroid,
  ActivityIndicator,
  KeyboardAvoidingView,
  StyleSheet,
  Button,
  Image,
  Text,
  TextInput,
  SectionList,
  StatusBar,
  View,
  TouchableOpacity,
  Picker
} from 'react-native';
import { Provider } from 'react-native'
import { StackNavigator, TabNavigator } from 'react-navigation';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
var ImagePicker = require('react-native-image-picker');
import styles from './styles.js'
import AppActions from '../../components/appActions.js';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button'
var appColors = require('../../components/appStyles.js')

var options = {
  title: 'Provide your photo',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

export class AHRadioButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelected: this.props.selected ? this.props.selected : false,
    }
  }

  _onPress(buttonId) {
    let currentState = this.state.isSelected;
    this.setState({
      isSelected: !currentState
    })
    debugger
    this.props.onTouch(!currentState, buttonId)
  }

  render() {
    return (
      // <TouchableOpacity onPress={this._onPress.bind(this)}>
      <TouchableOpacity onPress={this._onPress.bind(this, this.props.buttonId)}>
        <View style={styles.horizontalRadioLabel}>
          <View style={[styles.radioButton, this.props.style, { borderColor: this.props.color }]}>
            {
              this.state.isSelected ?
                <View style={{
                  height: 12,
                  width: 12,
                  borderRadius: 6,
                  backgroundColor: this.props.color,
                }} />
                : null
            }
          </View>
          {
            this.props.label ?
              <Text style={{ paddingLeft: 8 }}>{this.props.label}</Text>
              : null
          }
        </View>
      </TouchableOpacity>
    )
  }

}

export class AHRadioLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: -1,
    }
  }

  onToggle() {
    debugger
  }

  render() {
    return (
      <View style={[styles.verticalRadioLayout, this.props.style]}>
        {this.props.children}
      </View>)
  }

}

export class AHRadioCheatingLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonId1: false,
      buttonId2: false,
    }
  }

  onToggle(isSelected, buttonId) {
    debugger
    if (buttonId === 1) {
      this.setState({
        buttonId1: isSelected,
        buttonId2: !isSelected
      })
    } else {
      this.setState({
        buttonId1: !isSelected,
        buttonId2: isSelected,
      })
    }

  }

  render() {
    return (
      <View style={[styles.verticalRadioLayout, this.props.style]}>
        <AHRadioButton selected={this.state.buttonId1} styles={{ padding: 8 }} label={'Yes'} color={appColors.submitButtonGreen} buttonId={1} onTouch={this.onToggle.bind(this)} />
        <AHRadioButton selected={this.state.buttonId2} styles={{ padding: 8 }} label={'No'} color={appColors.submitButtonGreen} buttonId={2} onTouch={this.onToggle.bind(this)} />
      </View>)
  }

}

export default class ContactFormWithAttachment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitting: false,
      firstName: '',
      lastName: '',
      email: '',
      verifyEmail: '',
      message: '',
      isDatePickerVisible: false,
      isTimePickerVisible: false,
      time: 'Time of encounter',
      date: 'Date of encounter',
      location: '',
      county: '',
      state: '',
      biteAssociated: '',
      behavior: '',
      lat: '',
      lon: '',
      hasAphoto: false,
      photoA: {
        uri: null,
        type: 'image/jpeg',
        name: 'fileA.jpg',
      },
      photoB: {
        uri: null,
        type: 'image/jpeg',
        name: 'fileB.jpg',
      },
      fileAresize: 'contain',
      fileBresize: 'contain',
    }

  }

  checkEmailIsValid() {
    
    if (this.state.verifyEmail === this.state.email) {
      return true;
    }
    return false;
  }

  _showDatePicker = () => {
    this.setState({
      isDatePickerVisible: true
    })
  }
  _hideDatePicker = () => this.setState({
    isDatePickerVisible: false
  })

  _showTimePicker = () => this.setState({
    isTimePickerVisible: true
  })
  _hideTimePicker = () => this.setState({
    isTimePickerVisible: false
  })

  _handleDatePicked = (date) => {
    this.setState({
      datePickerValue: date.toDateString(),
      date: date.toDateString()
    })
    this._hideDatePicker();
  };
  _handleTimePicked = (time) => {
    this.setState({
      timePickerValue: time.toTimeString(),
      time: time.toTimeString()
    })
    this._hideTimePicker();
  };

  _getMinDate() {
    var rightNow = new Date();
    var currentYear = rightNow.getFullYear();
    var currentMonth = rightNow.getMonth();
    return new Date(2017, 0, 1, null, null, null, null);
  }

  _getMaxDate() {
    var rightNow = new Date();
    var currentYear = rightNow.getFullYear();
    var currentMonth = rightNow.getMonth();
    var numDays = new Date(currentYear, currentMonth + 1, 0).getDate(); // month + 1 == 31;  month == 30; month +2 == 31? how?
    return new Date(currentYear, currentMonth, numDays, null, null, null, null);
  }

  _onButtonPress() {

    if (this.state.email !== '' && this.state.message !== '') {

      // Alert.alert('Submitting...', 'Uploading your message now');

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

  uriCallback(uri, file) {
    switch (file) {
      case 'fileA':
        this.setState({
          fileA: { uri: uri },
          photoA: {
            uri: uri,
            type: 'image/jpeg',
            name: 'photoA.jpg',
          },
          fileAresize: 'cover',
          hasAphoto: true,
        })
        break;
      case 'fileB':
        this.setState({
          fileB: { uri: uri },
          photoB: {
            uri: uri,
            type: 'image/jpeg',
            name: 'photoB.jpg',
          },
          fileBresize: 'cover',
          hasAphoto: true,
        })
        break;
      default:
        break;
    }

  }

  positionCallback(position) {
    this.setState({
      lat: position.latitude,
      lon: position.longitude,
    })
  }

  sendXHRrequest() {
    // let contactUrl = 'http://165.91.120.42/kissingbugd.tamu.edu/Rest/ContactWithAttachment/ReactPush/';
    let contactUrl = 'https://kissingbug.tamu.edu/Rest/ContactWithAttachment/ReactPush/';
    var request = new XMLHttpRequest();
    request.onreadystatechange = (e) => {
      if (request.readyState !== 4) {
        // debugger
        return;
      }
      if (request.status === 200) {
        console.log("Success");
        this.setState({
          submitting: false,
        })
        Alert.alert('Message received', 'We appreciate your comments!');
      } else {
        this.setState({
          submitting: false,
        })
        Alert.alert('Error', 'Something didn\'t go as planned, please try again later');
        console.log("Error on XHR request");
      }
    }

    var formData = new FormData();
    if (this.state.photoA.uri !== null) {
      formData.append('photoA', this.state.photoA);
    }
    if (this.state.photoB.uri !== null) {
      formData.append('photoB', this.state.photoB);
    }
    debugger
    formData.append('firstName', this.state.firstName);
    formData.append('lastName', this.state.lastName);
    formData.append('email', this.state.email);
    formData.append('message', this.state.message);
    formData.append('date', this.state.date);
    formData.append('time', this.state.time);
    formData.append('location', this.state.location);
    formData.append('state', this.state.state);
    formData.append('county', this.state.county);
    formData.append('biteAssociated', this.state.biteAssociated);
    formData.append('behavior', this.state.behavior);
    formData.append('lat', this.state.lat);
    formData.append('lon', this.state.lon);


    request.open('POST', contactUrl, true);
    request.send(formData);


  }

  render() {
    debugger
    var emailsUnderLineColor = appColors.placeholderGrey
    if (this.state.email !== this.state.verifyEmail) {
      emailsUnderLineColor = appColors.errorRed
    } else {
      emailsUnderLineColor = appColors.placeholderGrey
    }
    let returnKeyType = 'default'

    let textInputStyle = styles.contactTextInput2;

    // var navi = this.props.navigation
    if (this.state.submitting) {
      return (<ActivityIndicator
        animating={this.state.submitting}
        style={styles.centering}
        size="large"
      />)
    } else {
      return (

        <KeyboardAwareScrollView>
          <View style={styles.container} >
            <Text style={{
              marginTop: 16,
              marginBottom: 8,
            }}>
              In order to better provide you with assistance, please fill out the following information as accurately as possible.
          </Text>

            <TextInput style={textInputStyle}
              placeholder="First name"
              autoCapitalize='sentences'
              keyboardType='default'
              returnKeyType={returnKeyType}
              blurOnSubmit={true}
              placeholderTextColor={appColors.placeholderGrey}
              underlineColorAndroid={appColors.placeholderGrey}
              onChangeText={(text) => this.setState({ firstName: text })}
            />
            <TextInput style={textInputStyle}
              placeholder="Last name"
              autoCapitalize='sentences'
              keyboardType='default'
              returnKeyType={returnKeyType}
              blurOnSubmit={true}
              placeholderTextColor={appColors.placeholderGrey}
              underlineColorAndroid={appColors.placeholderGrey}
              onChangeText={(text) => this.setState({ lastName: text })}
            />
            <TextInput style={textInputStyle}
              placeholder="Email address" 
              placeholderTextColor={appColors.placeholderGrey}
              underlineColorAndroid={appColors.placeholderGrey}
              keyboardType='email-address'
              returnKeyType={returnKeyType}
              blurOnSubmit={true}
              onChangeText={(text) => this.setState({ email: text })}
            />
            <TextInput style={textInputStyle}
              placeholder="Verify email" 
              placeholderTextColor={appColors.placeholderGrey}
              underlineColorAndroid={appColors.placeholderGrey}
              keyboardType='email-address'
              returnKeyType={returnKeyType}
              blurOnSubmit={true}
              onChangeText={(text) => this.setState({ verifyEmail: text })}
            />
            <TextInput style={textInputStyle}
              placeholder="Message"
              autoCapitalize='sentences'
              keyboardType='default'
              returnKeyType={returnKeyType}
              blurOnSubmit={true}
              placeholderTextColor={appColors.placeholderGrey}
              underlineColorAndroid={appColors.placeholderGrey}
              onChangeText={(text) => this.setState({ message: text })}
            />

            <TouchableOpacity style={{ borderBottomWidth: 1, borderBottomColor: '#000000' }} onPress={this._showDatePicker}>
              {/* <TextInput style={textInputStyle}
                placeholder="Date of encounter"
                editable={false}
                value={this.state.date}
                autoCapitalize='sentences'
                keyboardType='default'
                returnKeyType={returnKeyType}
                placeholderTextColor={appColors.placeholderGrey}
                underlineColorAndroid={appColors.placeholderGrey}
                onFocus={this._showDatePicker}
              />  */}
              <Text style={styles.contactTextInput3}
                autoCapitalize='sentences'
              >{this.state.date}</Text>
            </TouchableOpacity>

            <DateTimePicker //date
              style={styles.contactTextInput}
              isVisible={this.state.isDatePickerVisible}
              onConfirm={this._handleDatePicked}
              onCancel={this._hideDatePicker}
              minimumDate={this._getMinDate()}
              maximumDate={this._getMaxDate()}
              mode={'date'}
            />

            <TouchableOpacity style={{ borderBottomWidth: 1, borderBottomColor: '#000000' }} onPress={this._showTimePicker}>
              <Text style={styles.contactTextInput3}
                autoCapitalize='sentences'
              >{this.state.time}</Text>
            </TouchableOpacity>

            <DateTimePicker //Time
              style={styles.contactTextInput}
              isVisible={this.state.isTimePickerVisible}
              onConfirm={this._handleTimePicked}
              onCancel={this._hideTimePicker}
              minimumDate={this._getMinDate()}
              maximumDate={this._getMaxDate()}
              mode={'time'}
            />

            <TextInput style={styles.contactTextInput}
              style={textInputStyle}
              placeholder="Location of bug (home, porch, deck, etc)"
              autoCapitalize='sentences'
              keyboardType='default'
              returnKeyType={returnKeyType}
              blurOnSubmit={true}
              placeholderTextColor={appColors.placeholderGrey}
              underlineColorAndroid={appColors.placeholderGrey}
              onChangeText={(text) => this.setState({
                location: text
              })}
            />

            <TextInput style={textInputStyle}
              placeholder="State of encounter"
              autoCapitalize='sentences'
              keyboardType='default'
              returnKeyType={returnKeyType}
              blurOnSubmit={true}
              placeholderTextColor={appColors.placeholderGrey}
              underlineColorAndroid={appColors.placeholderGrey}
              onChangeText={(text) => this.setState({
                state: text
              })}
            />

            <TextInput style={textInputStyle}
              placeholder="County of encounter"
              autoCapitalize='sentences'
              keyboardType='default'
              returnKeyType={returnKeyType}
              blurOnSubmit={true}
              placeholderTextColor={appColors.placeholderGrey}
              underlineColorAndroid={appColors.placeholderGrey}
              onChangeText={(text) => this.setState({
                county: text
              })}
            />

            <TextInput style={textInputStyle}
              placeholder="Behaviour of bug (crawling, feeding, dead, etc)"
              autoCapitalize='sentences'
              keyboardType='default'
              returnKeyType={returnKeyType}
              blurOnSubmit={true}
              placeholderTextColor={appColors.placeholderGrey}
              underlineColorAndroid={appColors.placeholderGrey}
              onChangeText={(text) => this.setState({ behavior: text })}
            />
            <Text style={styles.contactTextInput}>Was this bug found in a bedroom or is known to be associated with a human bite?</Text>
            <RadioGroup
              style={styles.horizontalContainer}
              onSelect={(index, value) => this.setState({
                biteAssociated: value
              })}>
              <RadioButton style={styles.radioButtons} value={'Yes'}>
                <Text style={styles.radioQuestionText}>Yes</Text>
              </RadioButton>
              <RadioButton style={styles.radioButtons} value={'No'}>
                <Text style={styles.radioQuestionText}>No</Text>
              </RadioButton>
              <RadioButton style={styles.radioButtons} value={'Maybe'}>
                <Text style={styles.radioQuestionText}>Maybe</Text>
              </RadioButton>
            </RadioGroup>

            <View style={{ height: 16 }} />

            <Text style={styles.contactTextInput}>
              You may submit up to two images:
          </Text>
          <View style={styles.horizontalButton}>
            <Button
              color={appColors.placeholderGrey}
              title={"Choose file A"}
              onPress={() => {
                ImagePicker.showImagePicker(options, (response) => {
                  console.log("response", response);
                  if (response.didCancel) {
                    console.log("User cancelled image picker");
                  } else if (response.error) {
                    console.log("Error", response.error);
                  } else if (response.customButton) {
                    console.log("User tapped custom button", response.customButton);
                  } else {
                    let source = { uri: response.uri };
                    this.uriCallback(response.uri, "fileA");
                  }
                } 
              )}} />  
            <Button
              color={appColors.placeholderGrey}
              title={"Choose file B"}
              onPress={() => {
                ImagePicker.showImagePicker(options, (response) => {
                  console.log("response", response);
                  if (response.didCancel) {
                    console.log("User cancelled image picker");
                  } else if (response.error) {
                    console.log("Error", response.error);
                  } else if (response.customButton) {
                    console.log("User tapped custom button", response.customButton);
                  } else {
                    let source = { uri: response.uri };
                    this.uriCallback(response.uri, "fileB");
                  }
                } 
              )}} />
          </View>
          <View style={this.state.hasAphoto ? styles.horizontal : styles.horizontalContainerNoImage}>
            <Image
              style={{ flex: 1 }}
              resizeMode={this.state.fileAresize}
              source={this.state.fileA}
            />
            <Image
              style={{ flex: 1 }}
              resizeMode={this.state.fileBresize}
              source={this.state.fileB}
            />
          </View>
            

            <View style={{ height: 16 }} />
            <Button style={styles.button}
              color={appColors.submitButtonGreen}
              onPress={this._onButtonPress.bind(this)}
              title="Submit!" />
            <View style={{ height: 16 }} />
          </View>
        </KeyboardAwareScrollView>

      );
    }
  }
}


