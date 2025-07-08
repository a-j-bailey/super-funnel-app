import { ScrollView, StyleSheet } from 'react-native';

import { TaskCard } from '@/components/TaskCard';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import { ThemedSafeView } from '@/components/ThemedSafeView';
import { Task } from '@/utils/types';

export default function HomeScreen() {

  const featuredTasks: Task[] = [
    {
      id: 1,
      title: 'Book flights',
      parentTask: {
        id: 1,
        title: 'England Trip'
      },
      dueDate: new Date('2025-08-01')
    },
    {
      id: 2,
      title: 'Just do it',
    },
    {
      id: 3,
      title: 'Make dinner',
    },
    {
      id: 4,
      title: 'Order new tires',
      parentTask: {
        id: 2,
        title: 'Bike Maintenance'
      },
      dueDate: new Date('2025-08-01')
    }
  ];

  return (
    <ThemedSafeView>
      <ScrollView style={styles.containerOuter}>
        <ThemedView style={{ marginBottom: 32 }}>
          <ThemedText type="title">Have a Few Minutes?</ThemedText>
          <ThemedText type="subtitle">Knock these tasks out to stay productive.</ThemedText>
        </ThemedView>
        <ThemedView style={styles.taskContainer}>
          {featuredTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </ThemedView>
      </ScrollView>
    </ThemedSafeView>
  );
}

const styles = StyleSheet.create({
  containerOuter: {
    padding: 24,
    minHeight: '100%'
  },
  taskContainer: {
    gap: 16,
    marginBottom: 8,
  },
});
