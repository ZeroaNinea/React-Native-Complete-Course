import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';
import { useRouter } from 'expo-router';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const theme = useTheme();
  const router = useRouter();

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
            style={[styles.textInput, { color: theme.text }]}
          />
          <TextInput
            placeholder="Password..."
            placeholderTextColor={'#999'}
            secureTextEntry
            autoComplete="password"
            autoCapitalize="none"
            style={[styles.textInput, { color: theme.text }]}
          />

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => router.push('/signup')}
          >
            <Text style={styles.linkButtonText}>
              Don't you have an account?{' '}
              <Text style={styles.linkButtonTextBold}>Sign Up</Text>
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
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
  },
  linkButton: {
    marginTop: 20,
  },
  linkButtonText: {
    color: '#666',
  },
  linkButtonTextBold: {
    color: '#666',
    fontWeight: 'bold',
  },
});
