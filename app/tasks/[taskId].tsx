import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { Task } from '@/utils/types';
import { Stack, useLocalSearchParams } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { featuredTasks } from '../index';

export default function HomeScreen() {
  const { taskId } = useLocalSearchParams<{ taskId: string }>();
  const thisTask: Task = featuredTasks.filter((task) => { return task.id == Number(taskId) })[0]

  const Header = () => {
    return <View style={{ flex: 1 }}>
      <ThemedText type='title'>{thisTask.title}</ThemedText>
    </View>
  }

  return (
    <ParallaxScrollView
      header={<Header />}
      headerBackgroundColor={{ dark: '#1C1B1A', light: '#F2F0E5' }}
    >
      <Stack.Screen
        options={{
          title: thisTask.title,
        }}
      />
      {
        Object.keys(thisTask).map((key) => {
          const k: keyof Task = key as keyof Task
          const v = thisTask[k]
          return <ThemedText key={key}>{k}: {String(v)}</ThemedText>
        })
      }
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  }
});
