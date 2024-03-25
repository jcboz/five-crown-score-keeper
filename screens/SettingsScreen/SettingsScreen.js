import { StrokeText } from '@charmy.tech/react-native-stroke-text';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import {
  Appearance,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { OutlinedTextView } from 'react-native-outlined-text';

import NavButtons from '../../components/NavButtons/NavButtons';
import PlayerScores from '../../components/PlayerScores/PlayerScores';
import styles from './styles';

function SettingsScreen() {
  const colorScheme = useColorScheme();
  const themeTextStyle = colorScheme === 'light' ? styles.lightThemeText : styles.darkThemeText;
  const themeContainerStyle =
    colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;

  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={['#5b1190', '#6c24aa', '#905fc3']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ flex: 1 }}>
      <NavButtons leftNav={'Start'} leftText={'Menu'} />
      <View style={[styles.container, themeContainerStyle]} />
    </LinearGradient>
  );
}

export default SettingsScreen;
