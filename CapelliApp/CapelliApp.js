import React, { useState, useEffect } from 'react';
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
  ActivityIndicator,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

var banner = 'https://i.imgur.com/Ysr5EP8.jpg';
var lines = 'https://i.imgur.com/vz7qACB.png'; // Lines image
var capelliLogo = 'https://i.imgur.com/iKZYLTP.png'; // Capelli logo
var { height, width } = Dimensions.get('window'); // Device dimensions

async function getProducts(loadingChanger, productsChanger) {
  // Function to call to get product data (takes setState functions as parameters)
  try {
    const response = await fetch('https://adrielcapelli.pythonanywhere.com/');
    const json = await response.json();
    productsChanger(json.products); // Changes state variable to hold requested products
  } finally {
    loadingChanger(false); // Changes loading state to false
  }
}

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
  //If navigation list is closed
  if (!navigationView) {
    return (
      <>
        {/*View for all components on home page*/}
        <View style={styles.allViewsClosed}>
          {/*Container for Product page*/}
          <View style={styles.homePage}>
            {/*View for title flexbox*/}
            <View style={styles.productTitleContainer}>
              <Pressable
                onPress={() => {
                  navigationChange(!navigationView); // Changes state variable of if the three-lined button is pressed or not
                }}
                style={styles.openNavigationButton}>
                <Image
                  source={{ uri: lines }}
                  style={styles.openNavigationButtonImage}
                />
              </Pressable>
              {/*Title text for Product page */}
            </View>
            {/*View for body flexbox*/}
            <View style={styles.body}>
              {/* Image of the product */}
              <Image
                style={styles.productPageImage}
                source={{ uri: route.params.image }}
              />
              <Text style={styles.productTitleText}>{route.params.title}</Text>
            </View>
          </View>
        </View>
      </>
    );
  }
  //If navigation list is open
  if (navigationView) {
    return (
      <>
        {/*View for pop-up button list*/}
        <View style={styles.navigationListContainer}>
          <FlatList // FlatList for list of buttons to select from
            data={[
              { label: 'Home' },
              { label: 'Clippers' },
              { label: 'Trimmers' },
              { label: 'Shavers' },
            ]}
            renderItem={navigationButtonRender}
          />
        </View>
        {/*View for all components on home page*/}
        <View opacity={0.25} style={styles.allViewsOpen}>
          {/*Pressable that acts as a "canceler" to go back to non-navigation-list home page */}
          <Pressable
            onPress={() => {
              navigationChange(!navigationView);
            }}
            style={{ width: width, height: height }}>
            {/*Container for Product page*/}
            <View style={styles.homePage}>
              {/*View for title flexbox*/}
              <View style={styles.productTitleContainer}>
                <Pressable
                  onPress={() => {
                    navigationChange(!navigationView); // Changes state variable of if the three-lined button is pressed or not
                  }}
                  style={styles.openNavigationButton}>
                  <Image
                    source={{ uri: lines }}
                    style={styles.openNavigationButtonImage}
                  />
                </Pressable>
                {/*Title text for Product page */}
              </View>
              {/*View for body flexbox*/}
              <View style={styles.body}>
                {/* Image of the product */}
                <Image
                  style={styles.productPageImage}
                  source={{ uri: route.params.image }}
                />
                <Text style={styles.productTitleText}>
                  {route.params.title}
                </Text>
              </View>
            </View>
          </Pressable>
        </View>
      </>
    );
  }
}

function Categories({ navigation, route }) {
  //Categories page
  const [navigationView, navigationChange] = useState(false); // State for checking if navigation-opening button (three lined) is pressed
  const [loading, loadingChange] = useState(true); // State for checking if products have loaded into products State variable
  const [productsReturn, productsReturnChange] = useState([]); // State for retrieving the fetched/called database values
  const [productsArray, productsArraychange] = useState([]); // State that actually holds product data from database, using the fetched array (productsReturn)

  useEffect(() => {
    // useEffect used to only call getProducts function once: when page is rendered
    getProducts(loadingChange, productsReturnChange); // Called to get products from database, and saves it to products State variable
  }, []);
  if (!loading) {
    // Method for putting database products into an array of dictionaries (if statement makes sure it loads only after get request is complete)
    for (var i = 0; i < productsReturn.length; i++) {
      var productRow = {};
      productRow['type'] = productsReturn[i][0];
      productRow['title'] = productsReturn[i][1];
      productRow['image'] = productsReturn[i][2];
      productRow['category'] = productsReturn[i][3];
      productsArray.push(productRow);
    }

    loadingChange(true);
  }

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
                style={styles.productListingImage}
                source={{ uri: image }}
              />
              {/*View for text of listing based on if list of buttons is opened or closed*/}
              <View style={styles.productText}>
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
  //If navigation list is closed
  if (!navigationView) {
    return (
      <>
        {/*View for all components on home page*/}
        <View style={styles.allViewsClosed}>
          {/*Container for Categories page*/}
          <View style={styles.homePage}>
            {/*View for title flexbox*/}
            <View style={styles.categoriesTitleContainer}>
              <Pressable
                onPress={() => {
                  navigationChange(!navigationView); // Changes state variable of if the three-lined button is pressed or not
                }}
                style={styles.openNavigationButton}>
                <Image
                  source={{ uri: lines }}
                  style={styles.openNavigationButtonImage}
                />
              </Pressable>
              {/*Title text for Categories page */}
              <Text style={styles.categoriesTitleTextClosed}>
                {route.params.title}
              </Text>
            </View>
            {/*View for body flexbox*/}
            <View style={styles.body}>
              {/*FlatList of product listings*/}
              <FlatList data={productsArray} renderItem={listingsRender} />
            </View>
          </View>
        </View>
      </>
    );
  }
  //if navigation list is closed
  if (navigationView) {
    return (
      <>
        {/*View for pop-up button list*/}
        <View style={styles.navigationListContainer}>
          <FlatList // FlatList for list of buttons to select from
            data={[
              { label: 'Home' },
              { label: 'Clippers' },
              { label: 'Trimmers' },
              { label: 'Shavers' },
            ]}
            renderItem={navigationButtonRender}
          />
        </View>
        {/*View for all components on home page*/}
        <View opacity={0.25} style={styles.allViewsOpen}>
          {/*Pressable that acts as a "canceler" to go back to non-navigation-list home page */}
          <Pressable
            onPress={() => {
              navigationChange(!navigationView);
            }}
            style={{ width: width, height: height }}>
            {/*Container for Categories page*/}
            <View style={styles.homePage}>
              {/*View for title flexbox*/}
              <View style={styles.categoriesTitleContainer}>
                <Pressable
                  onPress={() => {
                    navigationChange(!navigationView); // Changes state variable of if the three-lined button is pressed or not
                  }}
                  style={styles.openNavigationButton}>
                  <Image
                    source={{ uri: lines }}
                    style={styles.openNavigationButtonImage}
                  />
                </Pressable>
                {/*Title text for Categories page */}
                <Text style={styles.categoriesTitleTextClosed}>
                  {route.params.title}
                </Text>
              </View>
              {/*View for body flexbox*/}
              <View style={styles.body} pointerEvents="none">
                {/*FlatList of product listings*/}
                <FlatList data={productsArray} renderItem={listingsRender} />
              </View>
            </View>
          </Pressable>
        </View>
      </>
    );
  }
}

// Home Page Function for App
function HomePage({ navigation }) {
  const [navigationView, navigationChange] = useState(false); // State for checking if navigation-opening button (three lined) is pressed
  const [loading, loadingChange] = useState(true); // State for checking if products have loaded into products State variable
  const [productsReturn, productsReturnChange] = useState([]); // State for retrieving the fetched/called database values
  const [productsArray, productsArraychange] = useState([]); // State that actually holds product data from database, using the fetched array (productsReturn)

  useEffect(() => {
    // useEffect used to only call getProducts function once: when page is rendered
    getProducts(loadingChange, productsReturnChange); // Called to get products from database, and saves it to products State variable
  }, []);
  if (!loading) {
    // Method for putting database products into an array of dictionaries (if statement makes sure it loads only after get request is complete)
    for (var i = 0; i < productsReturn.length; i++) {
      var productRow = {};
      productRow['type'] = productsReturn[i][0];
      productRow['title'] = productsReturn[i][1];
      productRow['image'] = productsReturn[i][2];
      productRow['category'] = productsReturn[i][3];
      productsArray.push(productRow);
    }
    productsArray.splice(0, 0, {
      // Banner addition to productsArray
      type: 'banner',
      title: 'banner1',
      image: 'https://i.imgur.com/Ysr5EP8.jpg',
    });
    loadingChange(true);
  }

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
          <Image style={styles.banners} source={{ uri: image }} />
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
                style={styles.productListingImage}
                source={{ uri: image }}
              />
              {/*View for text of listing based on if list of buttons is opened or closed*/}
              <View style={styles.productText}>
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
  //If navigation list is closed
  if (!navigationView) {
    return (
      <>
        {/*View for all components on home page*/}
        <View style={styles.allViewsClosed}>
          {/*Container for main home page*/}
          <View style={styles.homePage}>
            {/*View for title flexbox*/}
            <View style={styles.titleContainer}>
              <Pressable
                onPress={() => {
                  navigationChange(!navigationView); // Changes state variable of if the three-lined button is pressed or not
                }}
                style={styles.openNavigationButton}>
                <Image
                  source={{ uri: lines }}
                  style={styles.openNavigationButtonImage}
                />
              </Pressable>
              <Image
                source={{ uri: capelliLogo }}
                style={styles.capelliLogoImage}
              />
            </View>
            {/*View for body flexbox*/}
            <View style={styles.body}>
              {/*FlatList of banner and product listings*/}
              <FlatList data={productsArray} renderItem={bodyPageRender} />
            </View>
          </View>
        </View>
      </>
    );
  }
  //If navigation list is open
  if (navigationView) {
    return (
      <>
        {/*View for pop-up button list*/}
        <View style={styles.navigationListContainer}>
          <FlatList // FlatList for list of buttons to select from
            data={[
              { label: 'Clippers' },
              { label: 'Trimmers' },
              { label: 'Shavers' },
            ]}
            renderItem={navigationButtonRender}
          />
        </View>
        {/*View for all components on home page*/}
        <View opacity={0.25} style={styles.allViewsOpen}>
          {/*Pressable that acts as a "canceler" to go back to non-navigation-list home page */}
          <Pressable
            onPress={() => {
              navigationChange(!navigationView);
            }}
            style={{ width: width, height: height }}>
            {/*Container for main home page*/}
            <View style={styles.homePage}>
              {/*View for title flexbox*/}
              <View style={styles.titleContainer}>
                <Pressable
                  onPress={() => {
                    navigationChange(!navigationView); // Changes state variable of if the three-lined button is pressed or not
                  }}
                  style={styles.openNavigationButton}>
                  <Image
                    source={{ uri: lines }}
                    style={styles.openNavigationButtonImage}
                  />
                </Pressable>
                <Image
                  source={{ uri: capelliLogo }}
                  style={styles.capelliLogoImage}
                />
              </View>
              {/*View for body flexbox*/}
              <View style={styles.body} pointerEvents="none">
                {/*FlatList of banner and product listings*/}
                <FlatList data={productsArray} renderItem={bodyPageRender} />
              </View>
            </View>
          </Pressable>
        </View>
      </>
    );
  }
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
  allViewsClosed: {
    flexDirection: 'row',
    height: height,
    width: width,
  },
  allViewsOpen: {
    flexDirection: 'row',
    height: height,
    width: width,
    position: 'absolute',
  },
  // Style for List of Navigation Buttons
  navigationListContainer: {
    flexDirection: 'column',
    width: width * 0.4,
    marginTop: height * 0.05,
    borderWidth: 2,
    position: 'absolute',
    zIndex: 1,
    backgroundColor: 'white',
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
    flex: 1,
  },
  // Title flexbox container (Logo and button for list)
  titleContainer: {
    flexDirection: 'row',
    flex: 0.75,
    width: '100%',
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
  // Style for banners
  banners: {
    flex: 1,
    width: '100%',
    height: height * 0.4,
    resizeMode: 'stretch',
  },
  // Container for a product listing
  listing: {
    flexDirection: 'row',
    width: width,
    height: height * 0.21,
    borderWidth: 2,
    borderRadius: 12.5,
  },
  // Style for the image of the product listing
  productListingImage: {
    flex: 0.75,
    height: '100%',
    resizeMode: 'stretch',
    borderRadius: 25,
  },
  // Style for the text of the product listing
  productText: {
    flex: 1,
    padding: 6,
  },
  // Product title text style for listing
  productTextTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  //Container for Title for Categories page
  categoriesTitleContainer: {
    flexDirection: 'column',
    flex: 0.5,
    textAlign: 'center',
  },
  //Title text style for Categories page
  categoriesTitleTextClosed: {
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: height * -0.055,
  },
  //Container for Title for Product page
  productTitleContainer: {
    flexDirection: 'row',
    flex: 0.5,
    alignContent: 'left',
  },
  // Style for the image of the product page
  productPageImage: {
    width: width,
    height: '60%',
    resizeMode: 'stretch',
    borderRadius: 20,
  },
  //Title text style for Product page
  productTitleText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: width * 0.03,
    paddingTop: 5,
  },
});
