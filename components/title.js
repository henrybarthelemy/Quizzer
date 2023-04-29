import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

const Title = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quizzler</Text>
    </View>
  );
}
export default Title

const styles = StyleSheet.create({
  container: {
      marginVertical: 20,
      paddingVertical: 16,
      alignItems: 'center'
  },
  title: {
      fontSize: 24,
      fontWeight: 'bold'
  }
});
