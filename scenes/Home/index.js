import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Platform,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  Image,
  SectionList,
  StatusBar,
  View,
  PermissionsAndroid,
} from 'react-native';
import styles from './styles.js'
import AppActions from '../../components/appActions.js';
var appColors = require('../../components/appStyles.js')

const home = {
  welcome: {
    header: "WELCOME",
    body: "We are a multidisciplinary research team based at Texas A&M University. While we work on many different aspects of the Chagas disease system, the purpose of this website is to feature our public health education and citizen science efforts focused on kissing bug collections. Please explore this website for more information about Chagas disease, kissing bugs, and how you can help research efforts in Texas and beyond. See some of the citizen science results from bugs collected in 2013-2014."
  },
  overview: {
    header: "OVERVIEW",
    body: "Many diseases have their origins in nature. Eco-epidemiology examines the relationship between health and ecology: how animal and human health are affected by ecological factors in the environment. Studying the eco-epidemiology of Chagas disease in the United States allows us to take a broad approach to better understand the relationships among many different parts of the system, Chagas disease emerges at the intersection of wildlife, domestic animals, humans, and vector populations."
  },
  vector: {
    images: ["path/to/image", "path/to/other/image"],
    subtitles: ["Three species of kissing bugs that can be found in Texas. Left to right: Triatoma sanguisuga, Triatoma gerstaeckeri, Triatoma protracta", "Size comparison of a kissing bug with a U.S. penny."],
    header: "THE VECTOR",
    body: "Kissing bugs are nocturnal, blood-feeding insects that are members of the Reduviidae family. Other reduviids that are similar in appearance feed on plants and other insects and can inflict a painful bite when disturbed, however only kissing bugs are known to transmit the Chagas parasite. Kissing bugs are found throughout the Americas. In the US, kissing bugs are established in 28 states. A total of 11 different species of kissing bugs have been documented in the US, with the highest diversity and density in Texas, New Mexico, and Arizona. Previous studies have found that, on average, 50% of kissing bugs are infected with the Chagas parasite. Kissing bugs develop into adults after a series of five immature life stages called nymphs, and both nymphs and adults engage in bloodfeeding behavior. Bugs can feed on diverse wild and domestic animals including wild rodents, other wild mammals, domestic dogs, and humans."
  },
  parasite: {
    header: "THE PARASITE",
    body: "Infection with Trypanosoma cruzi can cause Chagas disease in humans, dogs, and other mammals. Kissing bugs can transmit the parasite to hosts by biting and subsequently defecating near the site of the bite. The parasites live in the digestive tract of the bugs and are shed in the bug feces. When infectious bug fecal material contaminates the mucous membranes or the site of a bug bite on a mammal, transmission of the parasite can occur. Alternately, dogs can also become infected through the consumption of infected bugs. The parasite can be transmitted congenitally, through blood transfusion, and through transplantation of infected organs. Chagas disease is endemic throughout central and South America, and is increasingly recognized as both a human and veterinary health concern in the southern United States. Chagas disease became a reportable disease in Texas in 2013."
  },
  health: {
    header: "HUMAN HEALTH",
    body: "The public health burden of Chagas disease in the US is largely unknown, because most states are not required to keep track of the number of confirmed human cases. Estimates of human cases of Chagas disease in the US range from 300,000 to over 1 million, with particular concern for those living in the US/Mexico border regions. In addition to documented cases in immigrants who were infected in central and South America, there are increasing reports of human cases of Chagas disease acquired in the US. In humans, Chagas disease manifests in two phases: acute phase and chronic phase. After becoming infected with the parasite, the acute phase can last for a few weeks or months. Some people may never develop acute disease. Acute phase Chagas disease may be difficult to diagnose because the symptoms are common for many types of sicknesses, including fever, fatigue, body aches, headache, rash, loss of appetite, diarrhea, and vomiting. Of those who are infected with the parasite, approximately 30% are at risk of developing chronic Chagas disease. Chronic Chagas disease includes cardiac complications and/or intestinal complications, and these signs may not be apparent until decades after the initial infection. Cardiac signs include enlarged heart, heart failure, altered heart rate, and/or cardiac arrest. Intestinal signs include an enlarged esophagus or colon, which can cause difficulties with digestion. Concerned individuals should discuss testing options with their physicians. Treatment of Chagas disease can be difficult, and drugs are available only through the CDC after consultation with a physician."
  },
  animals: {
    header: "WILDLIFE AND DOMESTIC ANIMALS",
    body: "Wildlife and Domestic Animals-Many different wildlife species are infected with the T. cruzi parasite in nature, and can serve as a source of parasite infection to kissing bugs. Infected animals in the US include domestic dogs, non-human primates, opossums, woodrats, armadillos, coyotes, mice, raccoons, skunks, and foxes. Studies have not been conducted to determine if all these species actually suffer from disease when infected, or if they can be silent, unaffected carriers of the parasite."
  },
  canine: {
    header: "CANINE HEALTH",
    body: "In dogs, infection with the Chagas parasite can cause severe heart disease, however many infected dogs may remain asymptomatic. There is variation in the degree of complications from Chagas disease that likely relate to the age of the dog, the activity level of the dog, and the genetic strain of the parasite. Cardiac rhythm abnormalities and sudden death may occur, as well as bloat due to reduced cardiac function and inability to properly pump fluids throughout the body. The most common test for canine infection with the Chagas parasite is a blood test called the indirect fluorescent antibody (IFA) test. IFA does not test for infection with the parasite, but rather tests for antibodies to the T. cruzi parasite. A positive result indicates that the dog has been exposed at some time in past. Testing for canine infection with the Chagas parasite is available through the Texas Veterinary Medical Diagnostic Laboratory. Unfortunately, treatment options are not readily available, although some research teams are developing new treatment approaches that are promising. There is currently no vaccination that protects against Chagas disease for either dogs or humans. Researchers at Texas A&M University documented Chagas disease in domestic dogs throughout many counties in Texas."
  },
  environment: {
    header: "ENVIRONMENT",
    body: "The local environment is important to the Chagas disease system. In order for the parasite to be maintained in nature, the environment must support the reservoir, vector, and parasite, and allow interactions among them. Dog kennels are environments that may be particularly suitable for the establishment of Chagas disease transmission cycles. High densities of dogs in confined areas are associated with heat and carbon dioxide that attract kissing bugs that seek bloodmeals. Furthermore, dogs may easily consume kissing bugs in kennels. Kissing bug control can be difficult in kennels, particularly in areas where human development is relatively recent and kennels are surrounded by natural habitats where wildlife occur. Adult kissing bugs engage in nocturnal flights to search for mates and mammals for blood-feeding. Because adult bugs fly towards lights, we recommend that lights be turned off at night around kennels. Some insecticides are effective against kissing bugs when sprayed around the kennel area. However, because kissing bugs can fly in from many yards away or from nearby wildlife habitats, new colonization of treated areas can easily occur."
  }
}

export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  async requestPermissions() {
    const neededPermissions = ['android.permission.CAMERA', 'android.permission.WRITE_EXTERNAL_STORAGE', 'android.permission.ACCESS_FINE_LOCATION'];
    try {
      var granted = await PermissionsAndroid.requestMultiple(neededPermissions, {
        title: "Attention:",
        message: "App needs permission to both storage and camera in order to submit bug photos"
      }).then((result) => {
        neededPermissions.map((value, index) => {
          AppActions.setItemInStorage(value, result[value])
          if (result[value] === PermissionsAndroid.RESULTS.GRANTED) {
            console.log(`Yippee! ${value} was granted!`)
          } else if (result[value] === PermissionsAndroid.RESULTS.DENIED) {
            console.log(`Boooooo! ${value} was denied.`)
          } else {
            console.log(`Ask later about ${value}.`)
          }
        })
        console.log(result);
      });
    } catch (err) {
      console.log(err);
    }
  }

  renderItem = ({ item }) => {
    return <Text style={styles.body}>{item.body}</Text>
  }
  renderSectionHeader = ({ section }) => {
    if (section.title !== '') {
      return <Text style={styles.header}>{section.title}</Text>
    } else {
      return <View />
    }
    
  }
  renderBlankHeader = ({ section }) => {
    return <View />
  }

  renderItemWithPhoto = ({ item }) => {
    return (<View>
      <Image style={styles.image} key={item.key} source={item.imagePath} resizeMode={'contain'} resizeMethod={'scale'}></Image>
      <Text style={styles.subtitle}>{item.subtitleText}</Text>
    </View>)
  }
  renderImage = ({ item }) => {
    return (<View>
      <Image style={styles.tamuLogo} key={item.key} source={item.imagePath} resizeMode={'contain'} resizeMethod={'scale'}></Image>
    </View>)
  }


  keyExtractor = (item) => {
    return item.header
  }

  render() {
    if (Platform.OS === 'android') {
      this.requestPermissions();
    }
    

    const images = {
      threeBugs: require('../../react-native-assets/ThreeBugs.jpg'),
      penny: require('../../react-native-assets/penny_comparison.png'),
      usmap: require('../../react-native-assets/bugstatesmapNov2016.jpg'),
      vetMed: require('../../react-native-assets/tamu-vetmed-logo.png'),
      agLife: require('../../react-native-assets/tamu-aglife-logo.png'),
    }


    const dataSource = [
      { data: [{ body: home.vector.body, key: home.vector.header, imagePath: images.vetMed }], title:'', renderItem: this.renderImage },
      { data: [{ body: home.welcome.body, key: home.welcome.header }], title: home.welcome.header, renderItem: this.renderItem },
      { data: [{ body: home.overview.body, key: home.overview.header }], title: home.overview.header, renderItem: this.renderItem },
      { data: [{ body: home.vector.body, key: home.vector.header }], title: home.vector.header, renderItem: this.renderItem },
      { data: [{ body: home.vector.body, key: home.vector.header, subtitleText: 'Three species of kissing bugs that can be found in Texas. Left to right: Triatoma sanguisuga, Triatoma gerstaeckeri, Triatoma protracta', imagePath: images.threeBugs }], title: '', renderItem: this.renderItemWithPhoto },
      { data: [{ body: home.vector.body, key: home.vector.header, subtitleText: 'Size comparison of a kissing bug with a U.S. penny.', imagePath: images.penny }], title: '', renderItem: this.renderItemWithPhoto },
      { data: [{ body: home.vector.body, key: home.vector.header, subtitleText: 'All shaded states have at least one historical record of kissing bugs. Striped states are those from which we have received submissions to our Citizen Science Program. Please note that there are several states where kissing bugs have been found only once or twice and are likely rare.', imagePath: images.usmap }], title: '', renderItem: this.renderItemWithPhoto },
      { data: [{ body: home.parasite.body, key: home.parasite.header }], title: home.parasite.header, renderItem: this.renderItem },
      { data: [{ body: home.health.body, key: home.health.header }], title: home.health.header, renderItem: this.renderItem },
      { data: [{ body: home.animals.body, key: home.animals.header }], title: home.animals.header, renderItem: this.renderItem},
      { data: [{ body: home.canine.body, key: home.canine.header }], title: home.canine.header, renderItem: this.renderItem },
      { data: [{ body: home.environment.body, key: home.environment.header }], title: home.environment.header, renderItem: this.renderItem },
    ]

    return (
      
      <View style={styles.container}>
        <StatusBar
          backgroundColor="#232323"
          barStyle="light-content"
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
