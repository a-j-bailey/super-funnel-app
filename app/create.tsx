import { ThemedSafeView } from '@/components/ThemedSafeView';
import { ThemedText } from '@/components/ThemedText';
import { StyleSheet } from 'react-native';


export default function HomeScreen() {
  return (
    <ThemedSafeView style={styles.page}>
      <ThemedText type="title">Create...</ThemedText>
      </ThemedSafeView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  }
});
