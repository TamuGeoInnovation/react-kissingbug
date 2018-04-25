import React, { StyleSheet } from 'react-native';
var { Platform } = React;

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: '#F5FCFF'
  },
  label: {
    marginTop: 24,
    marginBottom: 8,
  },
  contactTextInput: {
    marginBottom: 5,
    marginTop: 14,
    borderBottomWidth: (Platform.OS === 'ios') ? 1 : 0,
    height: 48,
    borderColor: '#ccc',
  },
  button: {
    flex: 1,
    fontSize: 20,
    textAlign: 'center',
    marginTop: 48,
    paddingBottom: 24
  },
  centering: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gray: {
    backgroundColor: '#cccccc',
  },
  iosHeader: {
    fontSize: 22,
    fontStyle: "normal",
    fontWeight: "bold",
    backgroundColor: '#F5FCFF',
    paddingTop: 20,
    paddingBottom: 4
  },

});

