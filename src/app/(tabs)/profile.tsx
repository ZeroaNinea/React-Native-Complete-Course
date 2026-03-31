import { ThemedText } from '@/components/themed-text';
import { useRouter } from 'expo-router';
import { Button, StyleSheet, View } from 'react-native';

export default function Profile() {
  const router = useRouter();

  return (
    <View style={style.container}>
      <ThemedText type="title">Profile</ThemedText>
      <Button
        title="Back to the index."
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
