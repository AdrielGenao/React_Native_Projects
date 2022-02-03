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

export default function App() {
  const [buttonView, buttonChange] = useState(false);
  const [textSay, textChange] = useState('');

  const renderItem = ({ item }) => (
    <Pressable
      onPress={() => {
        {
          if (textSay != item.label) {
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
    <View style={styles.container}>
      {buttonView ? (
        <View style={styles.listView}>
          <FlatList
            data={[
              { label: 'Featured Products' },
              { label: 'New Additions' },
              { label: 'Brands' },
            ]}
            renderItem={renderItem}
          />
        </View>
      ) : null}
      <Pressable
        onPress={() => {
          buttonChange(!buttonView);
        }}
        style={styles.openListButton}>
        <Image source={lines} style={styles.openListButtonImage} />
      </Pressable>
      <Text style={styles.text}>{textSay}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  listView: {
    marginTop: 23,
    width: 150,
  },
  listButton: {
    borderWidth: 1,
    width: 150,
    height: 50,
    justifyContent: 'center',
  },
  listButtonText: {
    textAlign: 'center',
    fontSize: 15,
  },
  openListButton: {
    borderWidth: 1,
    width: 40,
    height: 40,
    marginTop: 23,
    marginLeft: 7,
  },
  openListButtonImage: {
    resizeMode: 'stretch',
    width: 40,
    height: 40,
  },
  text: {
    marginTop: 23,
    marginLeft: 20,
    fontSize: 25,
  },
});
