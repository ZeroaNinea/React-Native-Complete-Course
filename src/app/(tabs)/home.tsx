import { ThemedText } from '@/components/themed-text';
import { useRouter } from 'expo-router';
import { Button, StyleSheet, View } from 'react-native';

export default function Home() {
  const router = useRouter();

  return (
    <View style={style.container}>
      <ThemedText type="title">Home</ThemedText>
      <Button
        title="Go to the about."
        onPress={() => {
          router.push('/about');
        }}
      ></Button>
      <Button
        title="Go to the profile."
        onPress={() => {
          router.push('/profile');
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
