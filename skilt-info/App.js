import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


import TabNavigator from "./navigation/AppNavigator";

export default function App() {
  return (
    <View>
      <TabNavigator></TabNavigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
