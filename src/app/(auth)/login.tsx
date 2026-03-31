import { ThemedText } from '@/components/themed-text';
import { StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  return (
    <SafeAreaView edges={['top', 'bottom']}>
      <View style={styles.container}>
        <ThemedText type="title">Welcome Back</ThemedText>
        <ThemedText type="subtitle">Sign In to Continue</ThemedText>
        <View>
          <TextInput
            placeholder="Email..."
            placeholderTextColor={'#999'}
            keyboardType="email-address"
            autoComplete="email"
          />
          <TextInput
            placeholder="Password..."
            placeholderTextColor={'#999'}
            secureTextEntry
            autoComplete="password"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
