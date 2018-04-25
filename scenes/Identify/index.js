import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  Image,
  FlatList,
  SectionList,
  StatusBar,
  View,
  TouchableOpacity,
} from 'react-native';
import styles from './styles.js'
var appColors = require('../../components/appStyles.js')

const identify = {
  foundabug: {
    header: "PRECAUTIONS AND PROCEDURE",
    body: "Citizen science offers the opportunity for non-scientists and scientists to work together to collect large amounts of data. This project is currently seeking the help of citizen scientists (like you!) to submit carefully collected kissing bugs from Texas and throughout the U.S. We are interested in learning more about the distribution of different species of kissing bugs, their infection prevalence over time, and their interactions with host species. If you have come across a suspected kissing bug in or around your home, kennel, yard, or other area, we are interested in hearing about it!"
  },
  handling: {
    header: "HANDLING",
    body: "Please do not ever touch a kissing bug with your bare hands! The T. cruzi parasite occurs in the feces of kissing bugs, and their bodies may be contaminated. A glove or small plastic bag may be used to catch the bug to avoid direct contact with the bug. The bug may be stored in a sealed plastic bag, in a vial, or other small container. All surfaces with which the bug came into contact should be thoroughly cleaned with a bleach solution."
  },
  kissingbugs: {
    header: "IDENTIFY",
    body: "Kissing bugs can be recognized by their 'cone-shaped' head, thin antennae, and thin legs. All of the U.S. species are mainly black or very dark brown, with red, orange or yellow 'stripes' around the edge. Their bites are generally not painful (since their goal is to bite and feed without being detected), and they are mainly active at dusk or night. Some of the most common species in Texas are shown here:"
  },
  nonkissingbugs: {
    header: "NON-KISSING BUGS",
    body: "There are many bugs that look quite similar to kissing bugs. Many of these non-kissing bugs feed on plants or insects. They can have strong mouthparts that allow them to inflict a painful bite if disturbed or threatened. No insects other than kissing bugs are known to be natural vectors of the parasite that causes Chagas disease. We've assembled pictures of some of the most common non-kissing bugs here. Please take a look and see if your bug resembles these bugs, if so, it might not be a kissing bug. If you have any questions, please feel free to send a picture and a message. The bug can be put in a freezer for a few hours to kill it. This will also preserve the DNA for our testing."
  },
  nonkissingbugsscrolltext: {
    header: "",
    body: "Scroll right to see some examples of commonly confused insects."
  },
}

class BugGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onPressFunction: this.props.onPressFunction,
      dataSource: [
        {
          name: "Brochymena", // 1
          image: require('../../react-native-assets/non-kissingbugs/thumb1.jpg')
        },
        {
          name: "Eye Click beetle", // 2
          image: require('../../react-native-assets/non-kissingbugs/thumb2.jpg')
        },
        {
          name: "Leaf-footed bugs", // 3
          image: require('../../react-native-assets/non-kissingbugs/thumb3.jpg')
        },
        {
          name: "Milkweed Bug", // 4
          image: require('../../react-native-assets/non-kissingbugs/thumb4.jpg')
        },
        {
          name: "Leptogrossus brevirostris", // 5
          image: require('../../react-native-assets/non-kissingbugs/thumb5.jpg')
        },
        {
          name: "Leptoglossus brevirostris", // 6
          image: require('../../react-native-assets/non-kissingbugs/thumb6.jpg')
        },
        {
          name: "Leptoglossus clypealis", // 7
          image: require('../../react-native-assets/non-kissingbugs/thumb7.jpg')
        },
        {
          name: "Leptoglossus phyllopus", // 8
          image: require('../../react-native-assets/non-kissingbugs/thumb8.jpg')
        },
        {
          name: "Microtomus", // 9
          image: require('../../react-native-assets/non-kissingbugs/thumb9.jpg')
        },
        {
          name: "Mozena obtussa", // 10
          image: require('../../react-native-assets/non-kissingbugs/thumb10.jpg')
        },
        {
          name: "Paranaiacaba tricincta", // 11
          image: require('../../react-native-assets/non-kissingbugs/thumb11.jpg')
        },
        {
          name: "Squash bug", // 12
          image: require('../../react-native-assets/non-kissingbugs/thumb12.jpg')
        },
        {
          name: "Squash bug", // 13
          image: require('../../react-native-assets/non-kissingbugs/thumb13.jpg')
        },
        {
          name: "Weevil", // 14
          image: require('../../react-native-assets/non-kissingbugs/thumb14.jpg')
        },
        {
          name: "Weevil", // 15
          image: require('../../react-native-assets/non-kissingbugs/thumb15.jpg')
        },
        {
          name: "Zelus longipes", // 16
          image: require('../../react-native-assets/non-kissingbugs/thumb16.jpg')
        }
  
      ]
  
    }
  }

  onBugTouch(index) {
    this.props.onPressFunction(index);
  }

  renderItem = ({ item, index }) => {
    return (
      <View>
        <Image
          style={styles.image}
          source={item.image}
        />
        <Text style={styles.picturesSubtitle}>{item.name}</Text>
      </View>

    );

  }
  keyExtractor = (item, index) => {

    return "" + index;
  }

  render() {
    return (
      <FlatList
        initialNumToRender={5}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={this.state.dataSource}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
      />
    )
  }
}



export default class Identify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      shown: false
    }

  }

  renderItem = ({ item }) => {
    return <Text style={styles.body}>{item.body}</Text>
  }
  renderScrollText = ({ item }) => {
    return <Text style={styles.scrollText}>{item.body}</Text>
  }
  renderSectionHeader = ({ section }) => {
    return <Text style={styles.iosHeader}>{section.title}</Text>
  }
  renderItemWithImages = ({ item }) => {
    return <BugGallery />
  }
  keyExtractor = (item) => {
    return item.header
  }

  closeViewer() {
    this.setState({
      shown: false,
      index: 0
    })
  }

  onOpenImageViewer(index) {
    this.setState({
      index: index,
      shown: true
    })

  }

  render() {
    const dataSource = [
      { data: [{ body: identify.foundabug.body, key: identify.foundabug.header }], title: identify.foundabug.header, renderItem: this.renderItem },
      { data: [{ body: identify.handling.body, key: identify.handling.header }], title: identify.handling.header, renderItem: this.renderItem },
      { data: [{ body: identify.kissingbugs.body, key: identify.handling.header }], title: identify.kissingbugs.header, renderItem: this.renderItem },
      { data: [{ body: identify.nonkissingbugs.body, key: identify.nonkissingbugs.header }], title: identify.nonkissingbugs.header, renderItem: this.renderItem },
      { data: [{ body: identify.nonkissingbugsscrolltext.body, key: identify.nonkissingbugsscrolltext.header }], title: identify.nonkissingbugsscrolltext.header, renderItem: this.renderScrollText },
      { data: [{ body: identify.nonkissingbugs.body, key: identify.nonkissingbugs.header }], title: '', renderItem: this.renderItemWithImages },
    ]

    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="#F5FCFF"
          barStyle="dark-content"
        />
        <SectionList
          style={styles.section}
          renderSectionHeader={this.renderSectionHeader}
          showsVerticalScrollIndicator={false}
          sections={dataSource}
        />
      </View>
    );
  }

}

