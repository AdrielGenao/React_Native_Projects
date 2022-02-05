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
} from 'react-native';
import Constants from 'expo-constants';
import lines from './assets/lines.png';
import capelliLogo from './assets/capellibeauty.png';

export default function App() {
  const [buttonView, buttonChange] = useState(false); // Checking if three-lined button is pressed
  const [textSay, textChange] = useState(''); // Text state variable

  const renderItem = (
    { item } // Buttons for FlatList rendering
  ) => (
    <Pressable
      onPress={() => {
        {
          if (textSay != item.label) {
            // Changes the textSay variable based on which button is pressed
            textChange(item.label);
          } else {
            textChange('');
          }
        }
      }}
      style={styles.listButton}>
      <Text style={styles.listButtonText}> {item.label} </Text>
    </Pressable>
  );

  return (
    <>
      {/*View for all components on home page*/}
      <View style={styles.allViews}>
        {/*View for pop-up button list*/}
        <View style={buttonView ? styles.buttonListOpen : styles.buttonListClosed}>
          {buttonView ? (
              <FlatList // FlatList for list of buttons to select from
                data={[
                  { label: 'Featured Products' },
                  { label: 'New Additions' },
                  { label: 'Brands' },
                ]}
                renderItem={renderItem}
              />
          ) : null}
        </View>
        {/*View for main home page without button-list: just the title and body of homepage*/}
        <View style={styles.titleBody}>
          {/*View for title flexbox*/}
          <View style={styles.title}>
            <Pressable
              onPress={() => {
                buttonChange(!buttonView); // Changes state variable of if the three-lined button is pressed or not
              }}
              style={styles.openListButton}>
              <Image source={lines} style={styles.openListButtonImage} />
            </Pressable>
            <Image source={capelliLogo} style={styles.capelliLogoImage} />
          </View>
          {/*View for body flexbox*/}
          <View style={styles.body}></View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  // Styles for all components
  allViews: {
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: "yellow",
    height:"100%",
    width:"100%"
  },
  buttonListClosed: {
    flexDirection: 'column',
    flex: 0,
  },
  buttonListOpen: {
    flexDirection: 'column',
    flex: 2,
    borderWidth: 2,
    borderColor: "black",
    marginTop: '10%',
  },
  titleBody: {
    flexDirection: 'column',
    flex: 3,
    borderWidth: 1,
    borderColor: "blue"
  },
  title: {
    flexDirection: 'row',
    flex: 1,
    borderWidth: 1,
    borderColor: "green"
  },
  body: {
    flexDirection: 'row',
    flex: 3,
    borderWidth: 1,
    borderColor: "red"
  },
  listButton: {
    borderWidth: 1,
    width: "100%",
    height: "100%",
    justifyContent: 'center',
  },
  listButtonText: {
    textAlign: 'center',
    fontSize: 15,
  },
  openListButton: {
    borderWidth: 1,
    width: 30,
    height: 35,
    marginTop: 25,
    marginLeft: 17,
  },
  openListButtonImage: {
    resizeMode: 'stretch',
    width: '100%',
    height: '100%',
  },
  capelliLogoImage: {
    resizeMode: 'stretch',
    marginTop: '9%',
    marginLeft: '20%',
    width: 120,
    height: 100,
  },
});
