import { ThemedSafeView } from '@/components/ThemedSafeView';
import { ThemedText } from '@/components/ThemedText';
import { StyleSheet, View } from 'react-native';

export default function Profile() {

  return (
    <ThemedSafeView style={styles.page}>
      <View style={styles.page}>
        <ThemedText>Profile</ThemedText>
      </View>
    </ThemedSafeView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: 16,
  },
  container: {
    backgroundColor: '#1C1B1A',
    padding: 8,
    borderRadius: 8,
  },
  text: {
    fontSize: 16,
    color: '#CECDC3'
  }
});
