import { ThemedText } from '@/components/themed-text';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  return (
    <SafeAreaView edges={['top', 'bottom']}>
      <View style={styles.container}>
        <ThemedText type="title" style={styles.title}>
          Welcome Back
        </ThemedText>
        <Text style={styles.subtitle}>Sign In to Continue</Text>
        <View style={styles.separator}></View>
        <View>
          <TextInput
            placeholder="Email..."
            placeholderTextColor={'#999'}
            keyboardType="email-address"
            autoComplete="email"
            autoCapitalize="none"
            style={styles.textInput}
          />
          <TextInput
            placeholder="Password..."
            placeholderTextColor={'#999'}
            secureTextEntry
            autoComplete="password"
            autoCapitalize="none"
            style={styles.textInput}
          />

          <TouchableOpacity style={styles.button}>
            <Text>Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.linkButton}>
            <Text>
              Don't you have an account <Text>Sign Up</Text>
            </Text>
          </TouchableOpacity>
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
  title: {
    marginTop: 20,
  },
  subtitle: {
    color: '#999',
    fontSize: 20,
    marginTop: 10,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  textInput: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#21bde4',
    padding: 10,
    borderRadius: 5,
    color: '#fff',
    alignItems: 'center',
  },
  linkButton: {
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#999',
  },
});
