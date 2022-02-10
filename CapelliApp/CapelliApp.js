import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  Pressable,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Constants from 'expo-constants';
import lines from './assets/lines.png';
import capelliLogo from './assets/capellibeauty.png';
import banner from './assets/Banners.png';
import product1 from './assets/product1.png';
import product2 from './assets/product2.png';
import product3 from './assets/product3.png';

var { height, width } = Dimensions.get('window');

function TestScreen({ route, navigation }) {
  // Testing new screen navigation
  const [navigationView, navigationChange] = useState(false); // State for checking if navigation-opening button (three lined) is pressed

  function navigationButton(label) {
    // Function for rendering buttons for navigation list
    return (
      <Pressable
        onPress={() => navigation.replace('Home')}
        style={styles.navigationButton}>
        <Text style={styles.navigationButtonText}> {label} </Text>
      </Pressable>
    );
  }

  const navigationButtonRender = (
    { item } // Actual rendering of navigation buttons by calling function
  ) => navigationButton(item.label);

  return (
    //Full Testing Page Container
    <View style={styles.testPageFullStyle}>
      {/*Navigation List*/}
      <View style={navigationView ? styles.navigationListContainer : null}>
        {navigationView ? (
          <FlatList
            data={[{ label: 'Home' }]}
            renderItem={navigationButtonRender}
          />
        ) : null}
      </View>
      {/*Main Home Testing Page*/}
      <View style={styles.testPageMainPage}>
        {/*Navigation Opener*/}
        <Pressable
          onPress={() => {
            navigationChange(!navigationView); // Changes state variable of if the three-lined button is pressed or not
          }}
          style={styles.openNavigationButton}>
          <Image source={lines} style={styles.openNavigationButtonImage} />
        </Pressable>
        {/*Testing Text*/}
        <Text style={{ fontSize: 20, alignSelf: 'center' }}>{route.params.title}</Text>
      </View>
    </View>
  );
}

// Home Page Function for App
function HomePage({ navigation }) {
  const [navigationView, navigationChange] = useState(false); // State for checking if navigation-opening button (three lined) is pressed
  function navigationButton(label) {
    // Function for rendering buttons for navigation list
    return (
      <Pressable
        onPress={() => navigation.replace('TestScreen', { title: label })}
        style={styles.navigationButton}>
        <Text style={styles.navigationButtonText}> {label} </Text>
      </Pressable>
    );
  }

  const navigationButtonRender = (
    { item } // Actual rendering of navigation buttons by calling function
  ) => navigationButton(item.label);

  function bodyPage(type, title, image) {
    // Function for rendering home page
    if (type == 'banner') {
      // Banner rendering
      return (
        <Image
          style={navigationView ? styles.bannersOpen : styles.bannersClosed}
          source={banner}
        />
      );
    }
    if (type == 'product') {
      // Products render
      return (
        <>
          {/*View for creating a space between components of body page */}
          <View style={{ height: height * 0.01, width: '100%' }}></View>
          {/*Full Container of product listing*/}
          <View style={styles.listing}>
            {/*Image for listing*/}
            <Image
              style={
                navigationView
                  ? styles.productImageOpen
                  : styles.productImageClosed
              }
              source={image}
            />
            {/*View for text of listing based on if list of buttons is opened or closed*/}
            <View
              style={
                navigationView
                  ? styles.productTextOpen
                  : styles.productTextClosed
              }>
              {/*Actual text*/}
              <Text style={styles.productTextTitle}>{title}</Text>
            </View>
          </View>
        </>
      );
    }
  }
  {
    /*Actual rendering of home page by calling on function*/
  }
  const bodyPageRender = ({ item }) =>
    bodyPage(item.type, item.title, item.image);

  return (
    <>
      {/*View for all components on home page*/}
      <View style={styles.allViews}>
        {/*View for pop-up button list*/}
        <View style={navigationView ? styles.navigationListContainer : null}>
          {navigationView ? (
            <FlatList // FlatList for list of buttons to select from
              data={[
                { label: 'Clippers' },
                { label: 'Trimmers' },
                { label: 'Shavers' },
              ]}
              renderItem={navigationButtonRender}
            />
          ) : null}
        </View>
        {/*Container for main home page*/}
        <View style={styles.homePage}>
          {/*View for title flexbox*/}
          <View style={styles.title}>
            <Pressable
              onPress={() => {
                navigationChange(!navigationView); // Changes state variable of if the three-lined button is pressed or not
              }}
              style={styles.openNavigationButton}>
              <Image source={lines} style={styles.openNavigationButtonImage} />
            </Pressable>
            <Image source={capelliLogo} style={styles.capelliLogoImage} />
          </View>
          {/*View for body flexbox*/}
          <View style={styles.body}>
            {/*FlatList of banner and product listings*/}
            <FlatList
              style={styles.homePageFlatList}
              data={[
                { type: 'banner' },
                {
                  type: 'product',
                  title: 'BaBylissPRO GoldFX Clipper',
                  image: product1,
                },
                {
                  type: 'product',
                  title: 'BaBylissPRO SilverFX Clipper',
                  image: product2,
                },
                {
                  type: 'product',
                  title:
                    'BaBylissPRO BlackFX Combo: Clipper, Trimmer, and Shaver',
                  image: product3,
                },
              ]}
              renderItem={bodyPageRender}
            />
          </View>
        </View>
      </View>
    </>
  );
}

//Complete app that calls on different pages to render (React Navigation)
export default function App() {
  const Stack = createNativeStackNavigator(); // Navigator Stack
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="TestScreen" component={TestScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  // Styles for all components
  // Test Page Container
  testPageFullStyle: {
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: 'yellow',
    height: height,
    width: width,
  },
  //Main Test Page Container (With navigation list closed)
  testPageMainPage: {
    flexDirection: 'column',
    flex: 3,
    borderWidth: 1,
    borderColor: 'blue',
  },
  // All View FlexBox
  allViews: {
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: 'yellow',
    height: height,
    width: width,
  },
  // Style for List of Navigation Buttons
  navigationListContainer: {
    flexDirection: 'column',
    flex: 2,
    borderWidth: 2,
    borderColor: 'black',
    marginTop: height * 0.04,
  },
  // Style for each of the navigation buttons
  navigationButton: {
    borderWidth: 1,
    width: '100%',
    height: height * 0.075,
    justifyContent: 'center',
  },
  // Style for the text of the navigation button
  navigationButtonText: {
    textAlign: 'center',
    fontSize: 15,
  },
  // Main home page style for top logo, banner, and featured listings
  homePage: {
    flexDirection: 'column',
    flex: 3,
    borderWidth: 1,
    borderColor: 'blue',
  },
  // Title flexbox container (Logo and button for list)
  title: {
    flexDirection: 'row',
    flex: 0.75,
    borderWidth: 1,
    borderColor: 'green',
  },
  // Controls location and size of the navigation-opening button (the pressable)
  openNavigationButton: {
    borderWidth: 1,
    width: width * 0.08,
    height: height * 0.05,
    marginTop: height * 0.04,
    marginLeft: width * 0.05,
  },
  // Style for Image of button to show the list of navigation buttons
  openNavigationButtonImage: {
    resizeMode: 'stretch',
    width: '100%',
    height: '100%',
  },
  // Style of capelli logo
  capelliLogoImage: {
    resizeMode: 'stretch',
    marginLeft: width * 0.18,
    marginTop: height * 0.035,
    width: width * 0.37,
    height: height * 0.135,
  },
  // Body flexbox container (Banner and featured listings)
  body: {
    flexDirection: 'column',
    flex: 3,
    borderWidth: 1,
    borderColor: 'red',
  },
  // Style for the complete body page flatList
  homePageFlatList: {
    width: '100%',
    height: '100%',
  },
  // Style for banners when list button is pressed (Will cover image to appear pushed)
  bannersOpen: {
    flex: 1,
    width: '100%',
    height: height * 0.4,
    resizeMode: 'cover',
  },
  // Style for banners when list of buttons is closed
  bannersClosed: {
    width: '100%',
    height: height * 0.4,
    resizeMode: 'stretch',
  },
  // Container for a product listing
  listing: {
    flexDirection: 'row',
    width: '100%',
    height: height * 0.21,
    borderWidth: 1,
  },
  // Style for the image of the product listing when navigation list is opened (changes image to be nonflex)
  productImageOpen: {
    width: width * 0.42,
    height: '100%',
    resizeMode: 'stretch',
  },
  // Style for the image of the product listing when navigation list is closed
  productImageClosed: {
    flex: 0.75,
    height: '100%',
    resizeMode: 'stretch',
  },
  // Style for the text of the product listing when navigation list is open (changes text to be nonflex)
  productTextOpen: {
    padding: 6,
  },
  // Style for the text of the product listing when navigation list is closed
  productTextClosed: {
    flex: 1,
    padding: 6,
  },
  // Product title text style
  productTextTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
