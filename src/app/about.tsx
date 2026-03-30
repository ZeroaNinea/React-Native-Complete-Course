import { StyleSheet, Text, View } from 'react-native';

export default function About() {
  return (
    <View style={style.container}>
      <Text>about</Text>
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
