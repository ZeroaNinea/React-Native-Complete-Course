import { ThemedText } from '@/components/themed-text';
import { StyleSheet, View } from 'react-native';

export default function Onboarding() {
  return (
    <View style={style.container}>
      <ThemedText type="title">Onboarding</ThemedText>
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
