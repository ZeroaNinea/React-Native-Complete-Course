import { ThemedText } from '@/components/themed-text';
import { useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function Onboarding() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleComplete = () => {};

  return (
    <View style={styles.container}>
      <ThemedText type="title">Onboarding</ThemedText>
      <Text style={styles.subtitle}>Add Your Information to Get Started</Text>
      <View style={styles.separator}></View>
      <View style={styles.form}>
        <TouchableOpacity style={styles.imageContainer}>
          <View style={styles.placeholderImage}>
            <Text style={styles.placeholderText}>+</Text>
          </View>
          <View style={styles.editBadge}>
            <Text style={styles.editText}>Edit</Text>
          </View>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.textInput}
        placeholder="Full Name"
        placeholderTextColor="#999"
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
      />

      <TextInput
        style={styles.textInput}
        placeholder="Username"
        placeholderTextColor="#999"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        autoComplete="username"
      />

      <TouchableOpacity style={styles.button} onPress={handleComplete}>
        {isLoading ? (
          <ActivityIndicator size={24} color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Complete Setup</Text>
        )}
      </TouchableOpacity>
    </View>
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
    fontSize: 16,
    marginTop: 10,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  form: {
    width: '100%',
    alignItems: 'center',
  },
  imageContainer: {
    marginBottom: 32,
    position: 'relative',
  },
  placeholderImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderStyle: 'dashed',
  },
  placeholderText: {
    position: 'absolute',
    fontSize: 48,
    color: '#999',
    top: '46%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#21bde4',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  editText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
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
});
