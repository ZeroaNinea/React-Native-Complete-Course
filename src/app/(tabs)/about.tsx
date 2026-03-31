import { ThemedText } from '@/components/themed-text';
import { useRouter } from 'expo-router';
import { Button, StyleSheet, View } from 'react-native';

export default function About() {
  const router = useRouter();

  return (
    <View style={style.container}>
      <ThemedText type="title">About</ThemedText>
      <Button
        title="Go to the home."
        onPress={() => {
          router.push('/');
        }}
      ></Button>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
