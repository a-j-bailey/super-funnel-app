import { CreateFAB } from '@/components/CreateFAB';
import { TaskCard } from '@/components/TaskCard';
import { ThemedSafeView } from '@/components/ThemedSafeView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Task } from '@/utils/types';
import { router } from 'expo-router';
import { UserCircle } from 'lucide-react-native';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';

export const featuredTasks: Task[] = [
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

export default function HomeScreen() {
  return (
    <ThemedSafeView style={styles.page}>
      <FlatList
        data={featuredTasks}
        keyExtractor={(task) => String(task.id)}
        ListHeaderComponent={
          <ThemedView style={{ paddingBottom: 24 }}>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <ThemedText type="title" style={{ paddingVertical: 8 }}>Have a Few Minutes?</ThemedText>
              <TouchableOpacity style={{ paddingVertical: 8, paddingLeft: 8 }} onPress={() => router.navigate('/profile')}>
                <UserCircle color={'white'} />
              </TouchableOpacity>
            </View>
            <ThemedText type="subtitle" style={{ fontWeight: '200' }}>Log a quick win by completing one of these tasks.</ThemedText>
          </ThemedView>
        }
        renderItem={({ item }) => (
          <TaskCard key={item.id} task={item} />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        contentContainerStyle={styles.containerOuter}
      />
      <CreateFAB />
    </ThemedSafeView>
  );
}

const styles = StyleSheet.create({
  containerOuter: {
    padding: 24,
    flex: 1
  },
  taskContainer: {
    gap: 16,
    marginBottom: 8,
  },
  page: {
    flex: 1,
  }
});
