import React, { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: '#F5FCFF'
  },
  horizontal: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: '#F5FCFF'
  },
  header: {
    fontSize: 22,
    fontStyle: "normal",
    fontWeight: "bold",
    paddingTop: 8,
    paddingBottom: 4
  },
  iosHeader: {
    fontSize: 22,
    fontStyle: "normal",
    fontWeight: "bold",
    backgroundColor: '#F5FCFF',
    paddingTop: 20,
    paddingBottom: 4
  },
  body: {
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "normal",
    marginBottom: 8,
  },
  contactTextInput: {
    marginBottom: 8
  },
  button: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 24,
  },
  image: {
    alignContent: 'center',
    width: 300,
    height: 150,
    alignSelf: 'center'
  },
  tamuLogo: {
    width: 280,
    height: 75,
    alignSelf: 'center'
  },
  iosTamuLogo: {
    width: 280,
    height: 75,
    marginTop: 20,
    alignSelf: 'center'
  },
  subtitle: {
    fontSize: 11,
    textAlign: 'center',
    fontStyle: "normal",
    fontWeight: "100",
    color: '#000000',
    marginBottom: 8,
  },
});

