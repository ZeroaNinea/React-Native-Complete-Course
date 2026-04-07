import { ThemedText } from '@/components/themed-text';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/hooks/use-theme';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
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

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();

  const handleLogin = async () => {
    console.log('handle signup called');
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    setIsLoading(true);
    try {
      await signIn(email, password);
      router.push('/(tabs)/home');
    } catch (error) {
      Alert.alert('Error', 'Failed to sign in. Please try again.');
      console.error('Error signing up:', error);
    } finally {
      setIsLoading(false);
    }
  };

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
            value={email}
            onChangeText={setEmail}
            style={[styles.textInput, { color: theme.text }]}
          />
          <TextInput
            placeholder="Password..."
            placeholderTextColor={'#999'}
            secureTextEntry
            autoComplete="password"
            autoCapitalize="none"
            value={password}
            onChangeText={setPassword}
            style={[styles.textInput, { color: theme.text }]}
          />

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            {isLoading ? (
              <ActivityIndicator size={24} color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Sign In</Text>
            )}
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
