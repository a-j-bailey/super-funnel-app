import { ThemedSafeView } from '@/components/ThemedSafeView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

export default function Create() {
  return (
    <ThemedSafeView style={styles.page}>
      <View style={styles.page}>
        <ThemedView lightColor='#F2F0E5' darkColor='#1C1B1A' style={styles.container}>
          <TextInput placeholder='Title' style={[styles.text, { fontWeight: 'bold' }]} autoFocus />
          <TextInput placeholder='Description' multiline style={[styles.text, { minHeight: 120 }]}></TextInput>
        </ThemedView>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={[styles.button]} onPress={() => console.log('breakdown')}>
            <ThemedText>Breakdown Task</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.primaryButton]} onPress={() => console.log('save')}>
            <ThemedText>Save Task</ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </ThemedSafeView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: 16,
    gap: 8
  },
  container: {
    padding: 16,
    borderRadius: 8,
  },
  text: {
    fontSize: 16,
    color: '#CECDC3'
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16
  },
  primaryButton: {
    backgroundColor: '#3AA99F',
  },
  buttonRow: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
});
