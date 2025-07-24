import { CreateFAB } from '@/components/CreateFAB';
import { TaskCard } from '@/components/TaskCard';
import { ThemedSafeView } from '@/components/ThemedSafeView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Task } from '@/utils/types';
import { router } from 'expo-router';
import { ChevronDown, UserCircle } from 'lucide-react-native';
import { Dimensions, FlatList, SectionList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { height } = Dimensions.get('window');

export const tasks: {
  title: string,
  description: string,
  data: Task[]
}[] = [
    {
      title: 'Wednesday, July 23rd',
      description: 'Kick off the week with momentum—tackle something new or challenging.',
      data: [
        {
          id: 1,
          title: 'Plan weekend ride',
          parentTask: {
            id: 2,
            title: 'Bike Maintenance'
          },
          dueDate: new Date('2025-07-25')
        },
        {
          id: 2,
          title: 'Organize desk'
        },
        {
          id: 3,
          title: 'Cook a new recipe'
        },
        {
          id: 4,
          title: 'Reply to emails'
        }
      ]
    },
    {
      title: 'Thursday, July 24th',
      description: 'Midweek focus—review ongoing projects and set up for the weekend.',
      data: [
        {
          id: 1,
          title: 'Review England Trip notes',
          parentTask: {
            id: 1,
            title: 'England Trip'
          },
          dueDate: new Date('2025-08-01')
        },
        {
          id: 2,
          title: 'Backup laptop'
        },
        {
          id: 3,
          title: 'Read a chapter of a book'
        }
      ]
    },
    {
      title: 'Friday, July 25th',
      description: 'Keep these on the radar or complete them early to stay ahead.',
      data: [
        {
          id: 1,
          title: 'Write memoir',
          parentTask: {
            id: 1,
            title: 'England Trip'
          },
          dueDate: new Date('2025-08-01')
        },
        {
          id: 2,
          title: 'Just do it'
        },
        {
          id: 3,
          title: 'Make dinner'
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
      ]
    },
    {
      title: 'Saturday, July 26th',
      description: 'Keep these on the radar or complete them early to stay ahead.',
      data: [
        {
          id: 1,
          title: 'Write memoir',
          parentTask: {
            id: 1,
            title: 'England Trip'
          },
          dueDate: new Date('2025-08-01')
        },
        {
          id: 2,
          title: 'Just do it'
        },
        {
          id: 3,
          title: 'Make dinner'
        }
      ]
    },
    {
      title: 'Sunday, July 27th',
      description: 'Reflection and planning—wrap up the week and lay plans for next.',
      data: [
        {
          id: 1,
          title: 'Reflect on weekly progress'
        },
        {
          id: 2,
          title: 'Organize photos',
          parentTask: {
            id: 1,
            title: 'England Trip'
          }
        },
        {
          id: 3,
          title: 'Meal prep for Monday'
        }
      ]
    },
    {
      title: 'Monday, July 28th',
      description: 'Kickstart the new week—set intentions and revisit priorities.',
      data: [
        {
          id: 1,
          title: 'Set weekly goals'
        },
        {
          id: 2,
          title: 'Schedule bike tune-up',
          parentTask: {
            id: 2,
            title: 'Bike Maintenance'
          }
        },
        {
          id: 3,
          title: 'Check Strava statistics'
        }
      ]
    },
    {
      title: 'Tuesday, July 29th',
      description: 'Stay proactive—finish up loose ends and focus on personal growth.',
      data: [
        {
          id: 1,
          title: 'Read up on React Native'
        },
        {
          id: 2,
          title: 'Explore new Lucide icons'
        },
        {
          id: 3,
          title: 'Practice meditation'
        }
      ]
    }
  ]
  ;

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const usableHeight = height - insets.top - insets.bottom;
  const iconColor = useThemeColor({}, 'icon')
  const featuredTasks = [
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
  ]

  return (
    <ThemedSafeView style={styles.page}>
      <SectionList
        sections={tasks}
        keyExtractor={(task) => String(task.id)}
        ListHeaderComponentStyle={{ height: usableHeight }}
        ListHeaderComponent={() => (
          <ThemedView style={{ paddingBottom: 24, gap: 12, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <FlatList
              data={featuredTasks}
              keyExtractor={item => String(item.id)}
              renderItem={({ item }) => <TaskCard key={item.id} task={item} />}
              ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
              ListHeaderComponent={() => (
                <View style={{ paddingBottom: 8 }}>
                  <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <ThemedText type="title" style={{ paddingVertical: 8 }}>Have a Minute?</ThemedText>
                    <TouchableOpacity style={{ paddingVertical: 8, paddingLeft: 8 }} onPress={() => router.navigate('/profile')}>
                      <UserCircle color={iconColor} />
                    </TouchableOpacity>
                  </View>
                  <ThemedText type="subtitle" style={{ fontWeight: '200' }}>Log a quick win by completing one of these tasks.</ThemedText>
                </View>
              )}
              ListFooterComponentStyle={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', padding: 8 }}
              // ListFooterComponent={() => (
              //   <TouchableOpacity>
              //     <ThemedText lightColor='#6F6E69' darkColor='#878580'>
              //       <RefreshCcw size={12} color={iconColor} /> Refresh
              //     </ThemedText>
              //   </TouchableOpacity>
              // )}
              contentContainerStyle={{ padding: 16 }}
            />
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
              <ChevronDown color={iconColor} />
            </View>
          </ThemedView>
        )}
        renderSectionHeader={({ section: { title, description } }) => (
          <ThemedView>
            <ThemedText>{title}:</ThemedText>
          </ThemedView>
        )}
        renderItem={({ item }) => (
          <TaskCard key={item.id} task={item} />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        SectionSeparatorComponent={({ }) => (
          <View style={{ height: 12 }} />
        )}
        contentContainerStyle={styles.containerOuter}
      />
      <CreateFAB />
    </ThemedSafeView>
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
    padding: 24,
  }
});
