import { useRoute } from '@react-navigation/native';
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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import PlayerScores from '../../components/PlayerScores/PlayerScores';
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
  // eslint-disable-next-line react-native/no-unused-styles
  text: {
    fontFamily: 'Inter_300Light',
  },
});

function HomeScreen() {
  const colorScheme = useColorScheme();
  const themeTextStyle = colorScheme === 'light' ? styles.lightThemeText : styles.darkThemeText;
  const themeContainerStyle =
    colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;

  const route = useRoute();
  const names = route.params?.names;
  return (
    <LinearGradient
      colors={['#5b1190', '#6c24aa', '#905fc3']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ flex: 1 }}>
      <KeyboardAwareScrollView>
        <View style={[styles.container, themeContainerStyle]}>
          <PlayerScores playersArr={names} />
          {/* {names.map((name) => {
            return <Text key={name.index}>{name.name}</Text>;
          })} */}
        </View>
      </KeyboardAwareScrollView>
    </LinearGradient>
  );
}

export default HomeScreen;
