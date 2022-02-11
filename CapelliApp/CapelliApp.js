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
import product4 from './assets/product4.png';
import product5 from './assets/product5.png';

var { height, width } = Dimensions.get('window'); // Device dimensions

//All Product data for the app
var DATA = [
  { type: 'banner', image: banner },
  {
    type: 'product', //Differentiate between product and banner
    title: 'BaBylissPRO GoldFX Clipper', // Title for listings
    image: product1, // Image
    category: ['Clippers'], // Category the product is in
  },
  {
    type: 'product',
    title: 'BaBylissPRO SilverFX Clipper',
    image: product2,
    category: ['Clippers'],
  },
  {
    type: 'product',
    title: 'BaBylissPRO BlackFX Combo: Clipper, Trimmer, and Shaver',
    image: product3,
    category: ['Clippers', 'Trimmers', 'Shavers'],
  },
  {
    type: 'product',
    title: 'BaBylissPRO FX3 Shaver',
    image: product4,
    category: ['Shavers'],
  },
  {
    type: 'product',
    title: 'BaBylissPRO RoseGoldFX Trimmer',
    image: product5,
    category: ['Trimmers'],
  },
];

function ProductPage({ navigation, route }) {
  //Product page
  const [navigationView, navigationChange] = useState(false); // State for checking if navigation-opening button (three lined) is pressed
  function navigationButton(label) {
    // Function for rendering buttons for navigation list
    if (label == 'Home') {
      // Button for going to home page
      return (
        <Pressable
          onPress={() => navigation.replace('Home')}
          style={styles.navigationButton}>
          <Text style={styles.navigationButtonText}> {label} </Text>
        </Pressable>
      );
    } else if (label != 'Home' && route.params.title != label) {
      // Button for Going to other Category page (Doesn't include the current page)
      return (
        <Pressable
          onPress={() => navigation.replace('Categories', { title: label })}
          style={styles.navigationButton}>
          <Text style={styles.navigationButtonText}> {label} </Text>
        </Pressable>
      );
    }
  }

  const navigationButtonRender = (
    { item } // Actual rendering of navigation buttons by calling function
  ) => navigationButton(item.label);

  return (
    <>
      {/*View for all components on home page*/}
      <View style={styles.allViews}>
        {/*View for pop-up button list*/}
        <View style={navigationView ? styles.navigationListContainer : null}>
          {navigationView ? (
            <FlatList // FlatList for list of buttons to select from
              data={[
                { label: 'Home' },
                { label: 'Clippers' },
                { label: 'Trimmers' },
                { label: 'Shavers' },
              ]}
              renderItem={navigationButtonRender}
            />
          ) : null}
        </View>
        {/*Container for Categories page*/}
        <View style={styles.homePage}>
          {/*View for title flexbox*/}
          <View style={styles.productTitleContainer}>
            <Pressable
              onPress={() => {
                navigationChange(!navigationView); // Changes state variable of if the three-lined button is pressed or not
              }}
              style={styles.openNavigationButton}>
              <Image source={lines} style={styles.openNavigationButtonImage} />
            </Pressable>
            {/*Title text for Categirues page */}
            <Text style={styles.productTitleText}>{route.params.title}</Text>
          </View>
          {/*View for body flexbox*/}
          <View style={styles.body}>
            {/* Image of the product */}
            <Image
              style={
                navigationView
                  ? styles.productPageImageOpen
                  : styles.productPageImageClosed
              }
              source={route.params.image}
            />
          </View>
        </View>
      </View>
    </>
  );
}

function Categories({ navigation, route }) {
  //Categories page
  const [navigationView, navigationChange] = useState(false); // State for checking if navigation-opening button (three lined) is pressed
  function navigationButton(label) {
    // Function for rendering buttons for navigation list
    if (label == 'Home') {
      // Button for going to home page
      return (
        <Pressable
          onPress={() => navigation.replace('Home')}
          style={styles.navigationButton}>
          <Text style={styles.navigationButtonText}> {label} </Text>
        </Pressable>
      );
    } else if (label != 'Home' && route.params.title != label) {
      // Button for Going to other Category page (Doesn't include the current page)
      return (
        <Pressable
          onPress={() => navigation.replace('Categories', { title: label })}
          style={styles.navigationButton}>
          <Text style={styles.navigationButtonText}> {label} </Text>
        </Pressable>
      );
    }
  }

  const navigationButtonRender = (
    { item } // Actual rendering of navigation buttons by calling function
  ) => navigationButton(item.label);

  function listings(type, title, image, category) {
    // Function for rendering listings based on their category to match current
    if (type == 'product' && category.includes(route.params.title)) {
      // Listings rendering based on categories
      return (
        <>
          {/*Pressable Container to make the listing a pressable to go to its product page*/}
          <Pressable
            onPress={() =>
              navigation.replace('ProductPage', { title: title, image: image })
            }>
            {/*Full Container of product listing*/}
            <View style={styles.listing}>
              {/*Image for listing*/}
              <Image
                style={
                  navigationView
                    ? styles.productListingImageOpen
                    : styles.productListingImageClosed
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
          </Pressable>
          {/*View for creating a space between components of body page */}
          <View style={{ height: height * 0.01, width: '100%' }}></View>
        </>
      );
    }
  }
  {
    /*Actual rendering of home page listings by calling on function*/
  }
  const listingsRender = ({ item }) =>
    listings(item.type, item.title, item.image, item.category);

  return (
    <>
      {/*View for all components on home page*/}
      <View style={styles.allViews}>
        {/*View for pop-up button list*/}
        <View style={navigationView ? styles.navigationListContainer : null}>
          {navigationView ? (
            <FlatList // FlatList for list of buttons to select from
              data={[
                { label: 'Home' },
                { label: 'Clippers' },
                { label: 'Trimmers' },
                { label: 'Shavers' },
              ]}
              renderItem={navigationButtonRender}
            />
          ) : null}
        </View>
        {/*Container for Categories page*/}
        <View style={styles.homePage}>
          {/*View for title flexbox*/}
          <View style={styles.categoriesTitleContainer}>
            <Pressable
              onPress={() => {
                navigationChange(!navigationView); // Changes state variable of if the three-lined button is pressed or not
              }}
              style={styles.openNavigationButton}>
              <Image source={lines} style={styles.openNavigationButtonImage} />
            </Pressable>
            {/*Title text for Categirues page */}
            <Text style={styles.categoriesTitleText}>{route.params.title}</Text>
          </View>
          {/*View for body flexbox*/}
          <View style={styles.body}>
            {/*FlatList of product listings*/}
            <FlatList data={DATA} renderItem={listingsRender} />
          </View>
        </View>
      </View>
    </>
  );
}

// Home Page Function for App
function HomePage({ navigation }) {
  const [navigationView, navigationChange] = useState(false); // State for checking if navigation-opening button (three lined) is pressed

  function navigationButton(label) {
    // Function for rendering buttons for navigation list
    return (
      <Pressable
        onPress={() => navigation.replace('Categories', { title: label })}
        style={styles.navigationButton}>
        <Text style={styles.navigationButtonText}> {label} </Text>
      </Pressable>
    );
  }

  const navigationButtonRender = (
    { item } // Actual rendering of navigation buttons by calling function
  ) => navigationButton(item.label);

  function bodyPage(type, title, image) {
    // Function for rendering body of home page
    if (type == 'banner') {
      // Banner rendering
      return (
        <>
          <Image
            style={navigationView ? styles.bannersOpen : styles.bannersClosed}
            source={image}
          />
          {/*View for creating a space between components of body page */}
          <View style={{ height: height * 0.01, width: '100%' }}></View>
        </>
      );
    }
    if (type == 'product') {
      // Products render
      return (
        <>
          {/*Pressable Container to make the listing a pressable to go to its product page*/}
          <Pressable
            onPress={() =>
              navigation.replace('ProductPage', { title: title, image: image })
            }>
            {/*Full Container of product listing*/}
            <View style={styles.listing}>
              {/*Image for listing*/}
              <Image
                style={
                  navigationView
                    ? styles.productListingImageOpen
                    : styles.productListingImageClosed
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
          </Pressable>
          {/*View for creating a space between components of body page */}
          <View style={{ height: height * 0.01, width: '100%' }}></View>
        </>
      );
    }
  }
  {
    /*Actual rendering of home page listings by calling on function*/
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
          <View style={styles.titleContainer}>
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
            <FlatList data={DATA} renderItem={bodyPageRender} />
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
        <Stack.Screen name="Categories" component={Categories} />
        <Stack.Screen name="ProductPage" component={ProductPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  // Styles for all components
  // All View FlexBox
  allViews: {
    flexDirection: 'row',
    height: height,
    width: width,
  },
  // Style for List of Navigation Buttons
  navigationListContainer: {
    flexDirection: 'column',
    flex: 2,
    marginTop: height * 0.05,
    borderWidth: 2,
  },
  // Style for each of the navigation buttons
  navigationButton: {
    width: '100%',
    height: height * 0.075,
    justifyContent: 'center',
    borderWidth: 2,
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
  },
  // Title flexbox container (Logo and button for list)
  titleContainer: {
    flexDirection: 'row',
    flex: 0.75,
  },
  // Controls location and size of the navigation-opening button (the pressable)
  openNavigationButton: {
    width: width * 0.095,
    height: height * 0.05,
    marginTop: height * 0.05,
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
    marginTop: height * 0.04,
    width: width * 0.37,
    height: height * 0.135,
  },
  // Body flexbox container (Banner and featured listings)
  body: {
    flexDirection: 'column',
    flex: 3,
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
    borderWidth: 2,
    borderRadius: 12.5,
  },
  // Style for the image of the product listing when navigation list is opened (changes image to be nonflex)
  productListingImageOpen: {
    width: width * 0.42,
    height: '100%',
    resizeMode: 'stretch',
    borderRadius: 25,
  },
  // Style for the image of the product listing when navigation list is closed
  productListingImageClosed: {
    flex: 0.75,
    height: '100%',
    resizeMode: 'stretch',
    borderRadius: 25,
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
  //Container for Title for Categories page
  categoriesTitleContainer: {
    flexDirection: 'row',
    flex: 0.5,
  },
  //Title text style for Categories page
  categoriesTitleText: {
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginLeft: width * 0.195,
  },
  //Container for Title for Product page
  productTitleContainer: {
    flexDirection: 'row',
    flex: 0.5,
  },
  //Title text style for Product page
  productTitleText: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginLeft: width * 0.06,
    maxWidth: width * 0.85,
    textAlign: 'center',
  },
  // Style for the image of the product page when navigation list is opened (changes image to be nonflex)
  productPageImageOpen: {
    width: width,
    height: '60%',
    resizeMode: 'cover',
    borderRadius: 20,
  },
  // Style for the image of the product page when navigation list is closed
  productPageImageClosed: {
    width: width,
    height: '60%',
    resizeMode: 'stretch',
    borderRadius: 20,
  },
});
