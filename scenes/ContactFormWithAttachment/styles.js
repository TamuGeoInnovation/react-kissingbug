import React, { StyleSheet } from 'react-native';
var { Platform } = React;
var colors = require('../../components/appStyles.js')

export default StyleSheet.create({
  container: {
    // flexDirection: 'column',
    justifyContent: 'flex-start',
    // alignItems: 'flex-start',
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: '#F5FCFF',
  },
  /*horizontal: {
    // flexDirection: 'column',
    justifyContent: 'flex-start',
    // alignItems: 'flex-start',
    minHeight: 120,
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: '#F5FCFF'
  },*/

  horizontal: {
    // flexDirection: 'column',
    justifyContent: 'space-between',
    // alignItems: 'flex-start',
    minHeight: 120,
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: '#F5FCFF'
  },
  horizontalButton: {
    justifyContent: 'space-between',
    paddingLeft: 36,
    paddingRight: 36,
    marginTop: 12,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F5FCFF'
  },

  horizontalRadioLabel: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: '#F5FCFF'
  },

  horizontalRadioLayout: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: '#F5FCFF'
  },
  verticalRadioLayout: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: '#F5FCFF'
  },
  header: {
    fontSize: 22,
    fontStyle: "normal",
    fontWeight: "bold",
    marginTop: 8,
    marginBottom: 4
  },
  body: {
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "normal",
    marginBottom: 16,
  },
  contactTextInput: {
    marginBottom: 8
  },
  contactTextInput2: {
    marginBottom: 5,
    marginTop: 14,
    borderBottomWidth: (Platform.OS === 'ios') ? 1 : 0,
    height: 48,
  },
  contactTextInput3: {
    marginTop: 26,
    marginBottom: 12,
    fontSize: 18,
    // color: '#c6c6c6',
  },
  button: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 24,
  },
  photoLabel: {
    marginLeft: 14,
    // alignItems: 'center',
    justifyContent: 'center',
  },
  preview: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 16
  },
  capture: {
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 12,
  },
  radioButton: {
    height: 96,
    width: 96,
    borderRadius: 12,
    borderWidth: 2,
    // borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centering: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gray: {
    backgroundColor: '#cccccc',
  },
  horizontalContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 32,
  },
  horizontalContainerNoImage: {

  },
  radioButtons: {
    flex: 1,
    flexDirection: 'row'
  },
  radioQuestionText: {
    color: colors.blackish,
    borderBottomColor: colors.blackish,
    flex: 1,
  },
  fileText: {
    color: colors.blackish,
    fontSize: 14
  }
});

