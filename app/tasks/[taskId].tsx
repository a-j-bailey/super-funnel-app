import { ThemedSafeView } from '@/components/ThemedSafeView';
import { ThemedText } from '@/components/ThemedText';
import { useLocalSearchParams } from 'expo-router';
import { StyleSheet } from 'react-native';


export default function HomeScreen() {
  const { taskId } = useLocalSearchParams<{ taskId: string }>();

  return (
    <ThemedSafeView style={styles.page}>
      <ThemedText>{taskId}</ThemedText>
    </ThemedSafeView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  }
});
