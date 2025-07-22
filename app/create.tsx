import { ThemedSafeView } from '@/components/ThemedSafeView';
import { Stack } from 'expo-router';
import { Button, StyleSheet, TextInput, View } from 'react-native';

export default function Create() {

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => <Button onPress={() => console.log('save')} title='Save' />
        }}
      />
      <ThemedSafeView style={styles.page}>
        <View style={styles.page}>
          <View style={styles.container}>
            <TextInput placeholder='Title' style={[styles.text, { fontWeight: 'bold' }]} autoFocus />
            <TextInput placeholder='Description' multiline style={[styles.text, { minHeight: 120 }]}></TextInput>
          </View>
        </View>
      </ThemedSafeView>
    </>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: 16,
  },
  container: {
    backgroundColor: '#1C1B1A',
    padding: 16,
    borderRadius: 8,
  },
  text: {
    fontSize: 16,
    color: '#CECDC3'
  }
});
