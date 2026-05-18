// src/screens/LoginScreen.js
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import LoginForm from '../components/LoginForm';

export default function LoginScreen({ navigation }) {
  function handleLoginSuccess(user) {
    navigation.navigate('Home', { user });
  }

  return (
    <SafeAreaView style={styles.screen}>
      <LoginForm onLoginSuccess={handleLoginSuccess} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, justifyContent: 'center', backgroundColor: '#F9FAFB' },
});
