import React, { useRef, useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
  FlatList,
  Dimensions,
  Animated,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import capelliLogo from './staticImages/CapelliLogo.png'; // Capelli logo png
import lines from './staticImages/ThreeLines.png'; // Three lines png for navigation opener
import backArrow from './staticImages/BackArrow.png'; // Back Arrow image for product and account/cart pages
import cart from './staticImages/CartImage.png'; // Cart image for items in cart page
import account from './staticImages/AccountImage.png'; // Account image for account page
import cartSelected from './staticImages/CartImageSelected.png'; // Image to show the current page - Cart page
import accountSelected from './staticImages/AccountImageSelected.png'; // Image to show the current page - Account page

var { height, width } = Dimensions.get('window'); // Device dimensions

var navData = [
  // Navigation button labels
  { label: 'Home' },
  { label: 'Clippers' },
  { label: 'Trimmers' },
  { label: 'Shavers' },
];

// Function to call to get product data (takes setState functions as parameters)
async function getProducts(loadingChanger, productsChanger) {
  try {
    const response = await fetch(
      'https://adrielcapelli.pythonanywhere.com/Products'
    );
    const json = await response.json();
    productsChanger(json.products); // Changes state variable to hold requested products
  } finally {
    loadingChanger(true); // Changes loading state to true
  }
}

async function sendData(email, username, password) {
    const response = await fetch(
      'https://adrielcapelli.pythonanywhere.com/Accounts',
      {
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'email': email, 'username': username, 'password': password }),
      }
    );
    const json = await response.json();
    console.log(json);
}

// Product Page
function ProductPage({ navigation, route }) {
  return (
    <>
      {/*View for all components on home page*/}
      <View style={styles.allViews}>
        {/*Container for Product page*/}
        <View style={styles.mainPage}>
          {/*View for title flexbox*/}
          <View style={styles.titleContainer}>
            <Pressable // Pressable for back button
              onPress={() => {
                navigation.goBack();
              }}
              style={styles.backButton}>
              <Image source={backArrow} style={styles.backButtonImage} />
            </Pressable>
            <Image source={capelliLogo} style={styles.capelliLogoImage} />
            <Pressable // Pressable for shopping cart image
              onPress={() => {
                navigation.navigate('CartPage');
              }}
              style={[styles.cartPressable, { marginTop: height * -0.14 }]}>
              <Image source={cart} style={styles.cartImage} />
            </Pressable>
            <Pressable // Pressable for account image
              onPress={() => {
                navigation.navigate('AccountPage');
              }}
              style={[styles.accountPressable, { marginTop: height * -0.06 }]}>
              <Image source={account} style={styles.accountImage} />
            </Pressable>
          </View>
          {/*View for body flexbox*/}
          <View style={styles.body}>
            {/* Image of the product */}
            <Image
              style={styles.productPageImage}
              source={{ uri: route.params.image }}
            />
            {/*Title text for Product page */}
            <Text style={styles.productTitleText}>{route.params.title}</Text>
            <Text style={styles.productTitleText}>${route.params.price}</Text>
          </View>
        </View>
      </View>
    </>
  );
}

// Cart Page
function CartPage({ navigation }) {
  return (
    <>
      {/*View for all components on home page*/}
      <View style={styles.allViews}>
        {/*Container for Cart page*/}
        <View style={styles.mainPage}>
          {/*View for title flexbox*/}
          <View style={styles.titleContainer}>
            <Pressable // Pressable for back button
              onPress={() => {
                navigation.goBack();
              }}
              style={styles.backButton}>
              <Image source={backArrow} style={styles.backButtonImage} />
            </Pressable>
            <Image source={capelliLogo} style={styles.capelliLogoImage} />
            <Pressable // Pressable for shopping cart image - image is different color to show that user is currently on cart page
              onPress={() => {
                navigation.navigate('CartPage');
              }}
              style={[styles.cartPressable, { marginTop: height * -0.14 }]}>
              <Image source={cartSelected} style={styles.cartImage} />
            </Pressable>
            <Pressable // Pressable for account image
              onPress={() => {
                navigation.navigate('AccountPage');
              }}
              style={[styles.accountPressable, { marginTop: height * -0.06 }]}>
              <Image source={account} style={styles.accountImage} />
            </Pressable>
          </View>
          <View style={styles.body}>
            <Text style={styles.cartAccountTitle}>Cart</Text>
          </View>
        </View>
      </View>
    </>
  );
}

// Account Page
function AccountPage({ navigation }) {
  const [email, emailChange] = useState(''); // State for email
  const [confEmail, confEmailChange] = useState(''); // State for confirm email
  const [username, usernameChange] = useState(''); // State for username
  const [password, passwordChange] = useState(''); // State for password
  const [confPassword, confPasswordChange] = useState(''); // State for confirm password
  const [submitPressed, submitChange] = useState(false); // State for checking if submit pressable was activated

  // Function for rendering an input bar
  function inputBarRender(name, confirmation, placeholder, onChange) {
    // If the input bar is not a confirmation input (either an email or password)
    if (!confirmation) {
      return (
        <>
          {/*View for creating a space between input components of account sign-up page */}
          <View style={{ height: height * 0.02, width: '100%' }}></View>
          {/* Input Bar + Label*/}
          <Text style={styles.inputLabel}>{name}: </Text>
          <TextInput
            style={styles.inputBar}
            onChangeText={onChange}
            placeholder={placeholder}
            clearButtonMode="while-editing"
          />
        </>
      );
    }
    // Else if the input bar is of confirmatoin input
    else if (confirmation) {
      return (
        <>
          {/*View for creating a space between input components of account sign-up page */}
          <View style={{ height: height * 0.02, width: '100%' }}></View>
          {/* Email Input Bar + Label*/}
          <Text style={styles.inputLabel}>Confirm {name}: </Text>
          <TextInput
            style={styles.inputBar}
            onChangeText={onChange}
            placeholder={placeholder}
            clearButtonMode="while-editing"
          />
        </>
      );
    }
  }

  function inputCheck() {
    if (submitPressed) {
      if (email.length == 0) {
        return 'No email provided!';
      } else if (confEmail.length == 0) {
        return 'No confirmation email provided!';
      } else if (username.length == 0) {
        return 'No username provided!';
      } else if (password.length == 0) {
        return 'No password provided!';
      } else if (confPassword.length == 0) {
        return 'No confirmation password provided!';
      }
      sendData(email,username,password);
      submitChange(false);
    }
    if (confEmail.length > 0 && confEmail != email) {
      return 'Emails do not match!';
    } else if (confPassword.length > 0 && confPassword != password) {
      return 'Password do not match!';
    }
  }

  return (
    <>
      {/*View for all components on home page*/}
      <View style={styles.allViews}>
        {/*Container for Account page*/}
        <View style={styles.mainPage}>
          {/*View for title flexbox*/}
          <View style={styles.titleContainer}>
            <Pressable // Pressable for back button
              onPress={() => {
                navigation.goBack();
              }}
              style={styles.backButton}>
              <Image source={backArrow} style={styles.backButtonImage} />
            </Pressable>
            <Image source={capelliLogo} style={styles.capelliLogoImage} />
            <Pressable // Pressable for shopping cart image
              onPress={() => {
                navigation.navigate('CartPage');
              }}
              style={[styles.cartPressable, { marginTop: height * -0.14 }]}>
              <Image source={cart} style={styles.cartImage} />
            </Pressable>
            <Pressable // Pressable for account image - image is different color to show that user is currently on account page
              onPress={() => {
                navigation.navigate('AccountPage');
              }}
              style={[styles.accountPressable, { marginTop: height * -0.06 }]}>
              <Image source={accountSelected} style={styles.accountImage} />
            </Pressable>
          </View>
          <View style={styles.body}>
            <Text style={styles.cartAccountTitle}>Account{'\n'}</Text>
            <Text style={{ fontSize: 18, fontWeight: 'bold', paddingLeft: 2 }}>
              Sign up to see and track your orders!{'\n'}
            </Text>
            {inputBarRender(
              'Email',
              false,
              'Enter your email here',
              emailChange
            )}
            {inputBarRender(
              'Email',
              true,
              'Confirm your email here',
              confEmailChange
            )}
            {inputBarRender(
              'Username',
              false,
              'Enter your username here',
              usernameChange
            )}
            {inputBarRender(
              'Password',
              false,
              'Enter your password here',
              passwordChange
            )}
            {inputBarRender(
              'Password',
              true,
              'Confirm your password here',
              confPasswordChange
            )}
            <Text style={{ fontSize: 18, fontWeight: 'bold', paddingLeft: 2 }}>
              {'\n'}
              {inputCheck()}
            </Text>
            {/*View for creating a space between input components of account sign-up page */}
            <View style={{ height: height * 0.02, width: '100%' }}></View>
            <Pressable // Submit button
              style={styles.submitButton}
              onPress={() => submitChange(true)}>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>SUBMIT</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </>
  );
}

// Search Response and Categories Page
function SearchAndCategories({ navigation, route }) {
  const [navigationView, navigationChange] = useState(false); // State for checking if navigation-opening button (three lined) is pressed
  const [loading, loadingChange] = useState(false); // State for checking if products have loaded into products State variable
  const [productsReturn, productsReturnChange] = useState([]); // State for retrieving the fetched/called database values
  const [productsArray, productsArraychange] = useState([]); // State that actually holds product data from database, using the fetched array (productsReturn)
  const [search, searchChange] = useState(route.params.title); // State for search query

  useEffect(() => {
    // useEffect used to only call getProducts function once: when page is rendered
    getProducts(loadingChange, productsReturnChange); // Called to get products from database, and saves it to products State variable
  }, []);
  if (loading) {
    // Method for putting database products into an array of dictionaries (if statement makes sure it loads only after get request is complete)
    for (var i = 0; i < productsReturn.length; i++) {
      var productRow = {};
      productRow['type'] = productsReturn[i][0];
      productRow['title'] = productsReturn[i][1];
      productRow['image'] = productsReturn[i][2];
      productRow['category'] = productsReturn[i][3];
      productRow['price'] = productsReturn[i][4];
      productsArray.push(productRow);
    }
    loadingChange(false);
  }

  function navigationButton(label) {
    // Function for rendering buttons for navigation list
    if (label == 'Home') {
      // Button for going to home page
      return (
        <>
          <Pressable
            onPress={() => navigation.replace('Home')}
            style={styles.navigationButton}>
            <Text style={styles.navigationButtonText}> {label} </Text>
          </Pressable>
          {/* View that acts as a space separator - similar to that on the listings */}
          <View style={{ height: height * 0.01 }}></View>
        </>
      );
    } else if (label != 'Home') {
      // Button for Going to other Category page
      if (route.params.title == label) {
        // If on current page - will just close the navigation list
        return (
          <>
            <Pressable
              onPress={() => {
                exit();
                navigationChange(!navigationView);
              }}
              style={[styles.navigationButton, { backgroundColor: '#05acbe' }]}>
              <Text
                style={[styles.navigationButtonText, { fontWeight: 'bold' }]}>
                {' '}
                {label}{' '}
              </Text>
            </Pressable>
            {/* View that acts as a space separator - similar to that on the listings */}
            <View style={{ height: height * 0.01 }}></View>
          </>
        );
      }
      if (route.params.title != label) {
        // If not on current page - will go to selected category page
        return (
          <>
            <Pressable
              onPress={() =>
                navigation.replace('SearchAndCategories', { title: label })
              }
              style={styles.navigationButton}>
              <Text style={styles.navigationButtonText}> {label} </Text>
            </Pressable>
            {/* View that acts as a space separator - similar to that on the listings */}
            <View style={{ height: height * 0.01 }}></View>
          </>
        );
      }
    }
  }

  const navigationButtonRender = (
    { item } // Actual rendering of navigation buttons by calling function
  ) => navigationButton(item.label);

  // Function for rendering listings based on the search query to look for matches in categories or title of products
  function listings(type, title, image, category, price) {
    let searchQuery = route.params.title.toLowerCase(); // Search query turned into lower case
    let searchArray = searchQuery.split(' '); // Array of strings from search query split by spaces
    let searchQueryIncludes = false; // Boolean used to check if product titles or categories include words of the search query
    let titleCheck = title.toLowerCase(); // Converting title to lower case to look for matches
    let categoryCheck = category.toLowerCase(); // Converting categories to lower case to look for matches

    for (let x = 0; x < searchArray.length; x++) {
      // For loop to check if any of the search query words are included in the title or category of each listing
      if (
        titleCheck.includes(searchArray[x]) ||
        categoryCheck.includes(searchArray[x]) // If search query word is in title or category
      ) {
        searchQueryIncludes = true; // Set bool to true
      }
    }
    if (type == 'product' && searchQueryIncludes) {
      // Listing rendering based on categories/search query
      return (
        <>
          {/*Pressable Container to make the listing a pressable to go to its product page*/}
          <Pressable
            onPress={() =>
              navigation.navigate('ProductPage', {
                title: title,
                image: image,
                price: price,
              })
            }>
            {/*Full Container of product listing*/}
            <View style={styles.listing}>
              {/*Image for listing*/}
              <Image
                style={styles.productListingImage}
                source={{ uri: image }}
              />
              {/*View for text of listing*/}
              <View style={styles.productText}>
                {/*Actual text*/}
                <Text style={styles.productTextTitle}>{title}</Text>
                <Text style={styles.productTextTitle}>${price}</Text>
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
    listings(item.type, item.title, item.image, item.category, item.price);

  const navAnimation = useRef(new Animated.Value(-190)).current; // Animation for navigation list (uses its margin left value for appearance)

  const enter = () => {
    // Entering animation
    Animated.timing(navAnimation, {
      toValue: 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };

  const exit = () => {
    // Exiting animation
    Animated.timing(navAnimation, {
      toValue: -190,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };

  return (
    <>
      {/*Animated View for pop-up button list*/}
      <Animated.View
        style={[styles.navigationListContainer, { marginLeft: navAnimation }]}>
        {/* Space between top of phone and actual navigation list */}
        <View style={{ height: height * 0.05 }}></View>
        <FlatList // FlatList for list of buttons to select from
          data={navData}
          renderItem={navigationButtonRender}
        />
      </Animated.View>
      {/*View for all components on Search/Categories page*/}
      <View
        opacity={navigationView ? 0.25 : null} // Changes opacity based on if navigation list is open
        style={styles.allViews}>
        {navigationView ? (
          <Pressable // Creates pressable when navigation list is open that acts as an opaque "canceler" to close navigation list, and starts the exit animation for the nav list
            onPress={() => {
              exit();
              navigationChange(!navigationView);
            }}
            style={styles.allViewsPressable}
            opacity={1}></Pressable>
        ) : null}
        {/*Container for Search/Category page*/}
        <View style={styles.mainPage}>
          {/*View for title flexbox*/}
          <View style={styles.titleContainer}>
            <Pressable // Pressable for navigation opener
              onPress={() => {
                enter(); // Start animation for nav list appearance
                navigationChange(!navigationView); // Changes state variable of if the three-lined button is pressed or not
              }}
              style={styles.openNavigationButton}>
              <Image source={lines} style={styles.openNavigationButtonImage} />
            </Pressable>
            <Image source={capelliLogo} style={styles.capelliLogoImage} />
            <Pressable // Pressable for shopping cart image
              onPress={() => {
                navigation.navigate('CartPage');
              }}
              style={[styles.cartPressable, { marginTop: height * -0.14 }]}>
              <Image source={cart} style={styles.cartImage} />
            </Pressable>
            <Pressable // Pressable for account image
              onPress={() => {
                navigation.navigate('AccountPage');
              }}
              style={[styles.accountPressable, { marginTop: height * -0.06 }]}>
              <Image source={account} style={styles.accountImage} />
            </Pressable>
          </View>
          {/* View/Container for Search Bar */}
          <View style={{ height: 50, paddingBottom: 5 }}>
            {/* Search Bar */}
            <TextInput
              style={styles.searchBar}
              onChangeText={searchChange}
              placeholder="Search for a product here!"
              value={search}
              onSubmitEditing={() =>
                navigation.replace('SearchAndCategories', { title: search })
              }
              clearButtonMode="while-editing"
            />
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

// Home Page
function Home({ navigation }) {
  const [navigationView, navigationChange] = useState(false); // State for checking if navigation-opening button (three lined) is pressed
  const [loading, loadingChange] = useState(false); // State for checking if products have loaded into products State variable
  const [productsReturn, productsReturnChange] = useState([]); // State for retrieving the fetched/called database values
  const [productsArray, productsArraychange] = useState([]); // State that actually holds product data from database, using the fetched array (productsReturn)
  const [search, searchChange] = useState(); // State for search query

  useEffect(() => {
    // useEffect used to only call getProducts function once: when page is rendered
    getProducts(loadingChange, productsReturnChange); // Called to get products from database, and saves it to products State variable
  }, []);
  if (loading) {
    // Method for putting database products into an array of dictionaries (if statement makes sure it loads only after get request is complete)
    for (var i = 0; i < productsReturn.length; i++) {
      var productRow = {};
      productRow['type'] = productsReturn[i][0];
      productRow['title'] = productsReturn[i][1];
      productRow['image'] = productsReturn[i][2];
      productRow['category'] = productsReturn[i][3];
      productRow['price'] = productsReturn[i][4];
      productsArray.push(productRow);
    }
    productsArray.splice(0, 0, {
      // Banner addition to productsArray
      type: 'banner',
      title: 'banner1',
      image: 'https://i.imgur.com/Ysr5EP8.jpg',
    });
    loadingChange(false); // Changes loading state back to false
  }

  function navigationButton(label) {
    // Function for rendering buttons for navigation list
    if (label == 'Home') {
      // Button for going to home page (is highlighted to show that user is currently on home page)
      return (
        <>
          <Pressable
            onPress={() => (exit(), navigationChange(!navigationView))}
            style={[styles.navigationButton, { backgroundColor: '#05acbe' }]}>
            <Text style={[styles.navigationButtonText, { fontWeight: 'bold' }]}>
              {' '}
              {label}{' '}
            </Text>
          </Pressable>
          {/* View that acts as a space separator - similar to that on the listings */}
          <View style={{ height: height * 0.01 }}></View>
        </>
      );
    } else if (label != 'Home') {
      // Button for going to other page
      return (
        <>
          <Pressable
            onPress={() =>
              navigation.replace('SearchAndCategories', { title: label })
            }
            style={styles.navigationButton}>
            <Text style={styles.navigationButtonText}> {label} </Text>
          </Pressable>
          <View style={{ height: height * 0.005 }}></View>
        </>
      );
    }
  }

  const navigationButtonRender = (
    { item } // Actual rendering of navigation buttons by calling function
  ) => navigationButton(item.label);

  function bodyPage(type, title, image, price) {
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
              navigation.navigate('ProductPage', {
                title: title,
                image: image,
                price: price,
              })
            }>
            {/*Full Container of product listing*/}
            <View style={styles.listing}>
              {/*Image for listing*/}
              <Image
                style={styles.productListingImage}
                source={{ uri: image }}
              />
              {/*View for text of listing*/}
              <View style={styles.productText}>
                {/*Actual text*/}
                <Text style={styles.productTextTitle}>{title}</Text>
                <Text style={styles.productTextTitle}>${price}</Text>
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
    bodyPage(item.type, item.title, item.image, item.price);

  const navAnimation = useRef(new Animated.Value(-190)).current; // Animation for navigation list (uses its margin left value for appearance)

  const enter = () => {
    // Entering animation
    Animated.timing(navAnimation, {
      toValue: 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };

  const exit = () => {
    // Exiting animation
    Animated.timing(navAnimation, {
      toValue: -190,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };

  return (
    <>
      {/*Animated View for pop-up button list*/}
      <Animated.View
        style={[styles.navigationListContainer, { marginLeft: navAnimation }]}>
        {/* Space between top of phone and actual navigation list */}
        <View style={{ height: height * 0.05 }}></View>
        <FlatList // FlatList for list of buttons to select from
          data={navData}
          renderItem={navigationButtonRender}
        />
      </Animated.View>
      {/*View for all components on home page*/}
      <View
        opacity={navigationView ? 0.25 : null} // Changes opacity based on if navigation list is open
        style={styles.allViews}>
        {navigationView ? (
          <Pressable // Creates pressable when navigation list is open that acts as an opaque "canceler" to close navigation list, and starts the exit animation for the nav list
            onPress={() => {
              exit();
              navigationChange(!navigationView);
            }}
            style={styles.allViewsPressable}
            opacity={1}></Pressable>
        ) : null}
        {/*Container for main home page*/}
        <View style={styles.mainPage}>
          {/*View for title flexbox*/}
          <View style={styles.titleContainer}>
            <Pressable // Pressable for navigation opener
              onPress={() => {
                enter(); // Start animation for nav list appearance
                navigationChange(!navigationView); // Changes state variable of if the three-lined button is pressed or not
              }}
              style={styles.openNavigationButton}>
              <Image source={lines} style={styles.openNavigationButtonImage} />
            </Pressable>
            <Image source={capelliLogo} style={styles.capelliLogoImage} />
            <Pressable // Pressable for shopping cart image
              onPress={() => {
                navigation.navigate('CartPage');
              }}
              style={[styles.cartPressable, { marginTop: height * -0.14 }]}>
              <Image source={cart} style={styles.cartImage} />
            </Pressable>
            <Pressable // Pressable for account image
              onPress={() => {
                navigation.navigate('AccountPage');
              }}
              style={[styles.accountPressable, { marginTop: height * -0.06 }]}>
              <Image source={account} style={styles.accountImage} />
            </Pressable>
          </View>
          {/* View/Container for Search Bar */}
          <View style={{ height: 50, paddingBottom: 5 }}>
            {/* Search Bar */}
            <TextInput
              style={styles.searchBar}
              onChangeText={searchChange}
              placeholder="Search for a product here!"
              onSubmitEditing={() =>
                navigation.replace('SearchAndCategories', { title: search })
              }
              clearButtonMode="while-editing"
            />
          </View>
          {/* View for body flexbox */}
          <View style={styles.body}>
            {/*FlatList of banner and product listings*/}
            <FlatList data={productsArray} renderItem={bodyPageRender} />
          </View>
        </View>
      </View>
    </>
  );
}

// Complete app that calls on different pages to render (React Navigation)
export default function App() {
  const Stack = createNativeStackNavigator(); // Navigator Stack
  return (
    // Container to hold all navigators/stacks
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false, animation: 'fade' }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="SearchAndCategories"
          component={SearchAndCategories}
        />
        <Stack.Screen name="ProductPage" component={ProductPage} />
        <Stack.Screen name="CartPage" component={CartPage} />
        <Stack.Screen name="AccountPage" component={AccountPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Styles for all components
const styles = StyleSheet.create({
  // All View FlexBox/Container
  allViews: {
    flexDirection: 'row',
    height: height,
    width: width,
  },
  // Style for creating the allView into a opaque pressable
  allViewsPressable: {
    width: width,
    height: height,
    position: 'absolute',
    zIndex: 1,
  },
  // Style for List of Navigation Buttons
  navigationListContainer: {
    flexDirection: 'column',
    width: width * 0.45,
    height: height,
    position: 'absolute',
    zIndex: 2,
    backgroundColor: 'white',
  },
  // Style for each of the navigation buttons
  navigationButton: {
    width: '92.5%',
    height: height * 0.075,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 5,
  },
  // Style for the text of the navigation button
  navigationButtonText: {
    textAlign: 'center',
    fontSize: 15,
  },
  // Main home page style for top logo, banner, and featured listings
  mainPage: {
    flexDirection: 'column',
    flex: 1,
  },
  // Title flexbox container (Logo and button for list)
  titleContainer: {
    flexDirection: 'column',
    flex: 0.75,
    width: '100%',
    paddingBottom: 10,
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
  // Style for back button in product pages
  backButton: {
    width: width * 0.095,
    height: height * 0.05,
    marginTop: height * 0.05,
    marginLeft: width * 0.03,
  },
  // Style for image of back button in product pages
  backButtonImage: {
    resizeMode: 'stretch',
    width: '100%',
    height: '100%',
  },
  // Style of capelli logo
  capelliLogoImage: {
    resizeMode: 'stretch',
    marginTop: height * -0.055,
    width: width * 0.37,
    height: height * 0.135,
    alignSelf: 'center',
  },
  // Style of cart pressable
  cartPressable: {
    resizeMode: 'stretch',
    width: width * 0.115,
    height: height * 0.065,
    alignSelf: 'flex-end',
    marginRight: width * 0.02,
  },
  // Style for image cart
  cartImage: {
    resizeMode: 'stretch',
    width: '100%',
    height: '100%',
  },
  // Style of cart pressable
  accountPressable: {
    resizeMode: 'stretch',
    width: width * 0.1,
    height: height * 0.055,
    alignSelf: 'flex-end',
    marginRight: width * 0.19,
  },
  // Style for image cart
  accountImage: {
    resizeMode: 'stretch',
    width: '100%',
    height: '100%',
  },
  // TextInput/SearchBar Style
  searchBar: {
    alignSelf: 'center',
    width: '99%',
    height: '100%',
    borderWidth: 2,
    fontSize: 21,
    borderRadius: 5,
    paddingLeft: 5,
  },
  // Body flexbox container (container for everything below title container)
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
  // Style for the image of the product page
  productPageImage: {
    width: width,
    height: '60%',
    resizeMode: 'stretch',
    borderRadius: 20,
  },
  // Title text style for Product page
  productTitleText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: width * 0.03,
    padding: 5,
  },
  // Title text style for cart + account page
  cartAccountTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: height * -0.03,
  },
  // Account Input Lable for text input box
  inputLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 2,
  },
  // Input Bar below input label
  inputBar: {
    width: '99%',
    height: 40,
    borderWidth: 2,
    fontSize: 21,
    borderRadius: 5,
    padding: 2,
    alignSelf: 'center',
  },
  // Submit button for account sign-up
  submitButton: {
    width: '45%',
    height: height * 0.06,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#05acbe',
  },
});
