import { ThemedText } from '@/components/themed-text';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Onboarding() {
  return (
    <View style={styles.container}>
      <ThemedText type="title">Onboarding</ThemedText>
      <Text style={styles.subtitle}>Sign Up to Get Started</Text>

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
    fontSize: 20,
    marginTop: 10,
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
    fontSize: 48,
    color: '#999',
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#0274DF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  editText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
