import { ThemedText } from '@/components/themed-text';
import { StyleSheet, View } from 'react-native';

export default function Signup() {
  return (
    <View style={styles.container}>
      <ThemedText type="title">Signup</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
