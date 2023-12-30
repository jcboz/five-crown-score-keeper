import React from 'react';
import {
  Appearance,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

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
    color: '#000',
  },
  text: {
    fontFamily: 'Inter_300Light',
  },
});

function ProfileScreen() {
  const colorScheme = useColorScheme();
  const themeTextStyle = colorScheme === 'light' ? styles.lightThemeText : styles.darkThemeText;
  const themeContainerStyle =
    colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
  return (
    <View style={[styles.container, themeContainerStyle]}>
      <Text style={[styles.text, themeTextStyle]}>Profile!</Text>
    </View>
  );
}

export default ProfileScreen;
