import { useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import { Alert, Platform, Pressable, Text, TextInput, ToastAndroid, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import styles from './styles';

function PlayerSelector() {
  const [name, setName] = useState(null);

  const nameIndex = useRef(0);
  const nameRef = useRef('');

  const [nameList, setNameList] = useState([]);

  const navigation = useNavigation();

  const isWhitespaceString = (str) => {
    return !str.replace(/\s/g, '').length;
  };

  const handleNameInput = (name) => {
    nameRef.current = name;
    setName(name);
  };

  const handlePlayerAdd = (name) => {
    if (isWhitespaceString(nameRef.current)) {
      return;
    }
    nameIndex.current += 1;
    setNameList([
      ...nameList,
      { name: nameRef.current, index: nameIndex.current, isFinished: false },
    ]);
    setName('');
    nameRef.current = '';
  };

  const handleDelete = (names) => {
    console.log(names.index);
    const copy = nameList.filter((nameEach) => nameEach.index !== names);
    console.log('copy: ', copy);
    setNameList(copy);
  };

  const handleClearPlayers = () => {
    setNameList([]);
  };

  function handleNavigation() {
    // Gonn have to map all the names in nameList useState to a regular array and then pass that into the navigate function
    const nameArr = [];
    // eslint-disable-next-line array-callback-return
    nameList.map((names) => {
      nameArr.push(names);
    });
    console.log('nameArr: ', nameArr);
    if (nameArr.length >= 2) navigation.navigate('Home', { names: nameArr });
    else Alert.alert('You must enter at least 2 players!');
  }

  return (
    <View>
      {nameList.map((names) => {
        return (
          <View key={names.index} style={styles.name_entry}>
            <Text style={styles.nameList}>{names.name}</Text>
            <Pressable key={names.index} onPress={() => handleDelete(names.index)}>
              <Text style={styles.delete_button}>x</Text>
            </Pressable>
          </View>
        );
      })}
      <TextInput
        style={styles.input}
        onChangeText={(name) => handleNameInput(name)}
        value={name}
        placeholder="name"
        returnKeyType="done"
        onSubmitEditing={() => handlePlayerAdd()}
      />
      <Pressable onPress={() => handlePlayerAdd()}>
        <Text style={styles.text}>Add Player</Text>
      </Pressable>
      <Pressable onPress={() => handleNavigation()}>
        <Text style={styles.text}>Start!</Text>
      </Pressable>
      <Pressable onPress={() => handleClearPlayers()}>
        <Text style={styles.text}>Clear Players!</Text>
      </Pressable>
    </View>
  );
}

export default PlayerSelector;
