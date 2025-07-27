/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StyleSheet } from 'react-native';

import RootStack from './src/navigation/RootStack';

export default function App() {
  return <RootStack />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
