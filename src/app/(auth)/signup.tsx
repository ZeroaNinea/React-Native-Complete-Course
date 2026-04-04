import { ThemedText } from '@/components/themed-text';
import { useAuth } from '@/context/AuthContext';
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

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { signUp } = useAuth();

  const router = useRouter();

  const handleSignUp = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    if (password.length < 3) {
      Alert.alert('Error', 'Password must be at least 3 characters.');
      return;
    }

    setIsLoading(true);
    try {
      await signUp(email, password);
      router.push('/(auth)/onboarding');
    } catch (error) {
      Alert.alert('Error', 'Failed to sign up. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   router.push('/(auth)/onboarding');
  // }, []);

  return (
    <SafeAreaView edges={['top', 'bottom']}>
      <View style={styles.container}>
        <ThemedText type="title" style={styles.title}>
          Create Account
        </ThemedText>
        <Text style={styles.subtitle}>Sign Up to Get Started</Text>
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
            style={styles.textInput}
          />
          <TextInput
            placeholder="Password..."
            placeholderTextColor={'#999'}
            secureTextEntry
            autoComplete="password"
            autoCapitalize="none"
            value={password}
            onChangeText={setPassword}
            style={styles.textInput}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={handleSignUp}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => router.push('/login')}
          >
            <Text style={styles.linkButtonText}>
              Already have an account?{' '}
              {isLoading ? (
                <ActivityIndicator size={24} color="#fff" />
              ) : (
                <Text style={styles.linkButtonTextBold}>Sign In</Text>
              )}
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
