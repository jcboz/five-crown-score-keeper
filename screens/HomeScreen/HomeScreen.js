import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
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

import Scorecard from '../../components/Scorecard/Scorecard';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 2,
    justifyContent: 'center',
  },
  darkContainer: {
    backgroundColor: '#000',
  },
  darkThemeText: {
    color: '#fff',
  },
  lightContainer: {
    color: '#000',
  },
  lightThemeText: {
    color: '#fff',
  },
  text: {
    fontFamily: 'Inter_300Light',
  },
});

function HomeScreen() {
  const colorScheme = useColorScheme();
  const themeTextStyle = colorScheme === 'light' ? styles.lightThemeText : styles.darkThemeText;
  const themeContainerStyle =
    colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
  return (
    <LinearGradient
      colors={['#5b1190', '#6c24aa', '#905fc3']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ flex: 1 }}>
      <ScrollView>
        <View style={[styles.container, themeContainerStyle]}>
          <Text style={[styles.text, themeTextStyle]}>Five Crown!</Text>
          <Scorecard />
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

export default HomeScreen;
