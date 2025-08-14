import { CreateFAB } from '@/components/CreateFAB';
import { TaskCard } from '@/components/TaskCard';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useTasks } from '@/providers/TaskProvider';
import { FlatList, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const iconColor = useThemeColor({}, 'icon')
  const { tasks } = useTasks();

  return (
    <ThemedView style={[styles.page, { paddingTop: insets.top }]}>
      <FlatList
        data={tasks}
        keyExtractor={item => String(item.id)}
        renderItem={({ item, index }) => <TaskCard key={item.id} task={item} index={index} />}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        ListHeaderComponent={() => (
          <View style={{ paddingBottom: 8 }}>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <ThemedText type="title" style={{ paddingVertical: 8, flex: 1 }}>Have a Minute?</ThemedText>
              {/* <TouchableOpacity style={{ paddingVertical: 8, paddingLeft: 8 }} onPress={() => router.navigate('/profile')}>
                <Search color={iconColor} />
              </TouchableOpacity>
              <TouchableOpacity style={{ paddingVertical: 8, paddingLeft: 8 }} onPress={() => router.navigate('/profile')}>
                <UserCircle color={iconColor} />
              </TouchableOpacity> */}
            </View>
            <ThemedText type="subtitle" style={{ fontWeight: '200' }}>Log a quick win by completing one of these tasks.</ThemedText>
          </View>
        )}
        contentContainerStyle={{ padding: 16, paddingBottom: insets.bottom }}
      />
      <CreateFAB />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  containerOuter: {
    padding: 24,
  },
  taskContainer: {
    gap: 16,
    marginBottom: 8,
  },
  page: {
    flex: 1,
    // paddingHorizontal: 16,
  }
});
