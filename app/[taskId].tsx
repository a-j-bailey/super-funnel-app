import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';

import { CompleteFAB } from '@/components/CompleteFAB';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useTasks } from '@/providers/TaskProvider';
import { Task } from '@/utils/types';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';


const HEADER_HEIGHT = 128;

export default function TaskScreen() {
  const highlightColor = useThemeColor({ light: '#8B7EC8', dark: '#5E409D' }, 'tint')
  const tint2 = useThemeColor({ light: '#8B7EC8', dark: '#8B7EC8' }, 'tint')
  const bgSecondary = useThemeColor({}, 'backgroundSecondary')
  const { fetchTaskById, getMinMaxPriority } = useTasks()
  const { minPriority, maxPriority } = getMinMaxPriority()
  const { taskId } = useLocalSearchParams<{ taskId: string }>();
  const [thisTask, setThisTask] = useState<Task | undefined>(undefined)
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const bottom = 0;
  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(scrollOffset.value, [-HEADER_HEIGHT, 0, HEADER_HEIGHT], [2, 1, 1]),
        },
      ],
    };
  });


  async function getTask() {
    const task = await fetchTaskById(taskId)
    setThisTask(task)
  }

  useEffect(() => {
    getTask()
  })

  const Flag = ({ text, priority }: { text: string, priority: number }) => {
    const red = useThemeColor({ light: '#D14D41', dark: '#D14D41' }, 'tint')
    const red2 = useThemeColor({ light: '#AF3029', dark: '#AF3029' }, 'tint')
    const yellow = useThemeColor({ light: '#D0A215', dark: '#D0A215' }, 'tint')
    const yellow2 = useThemeColor({ light: '#AD8301', dark: '#AD8301' }, 'tint')
    const green = useThemeColor({ light: '#879A39', dark: '#879A39' }, 'tint')
    const green2 = useThemeColor({ light: '#66800B', dark: '#66800B' }, 'tint')

    let c1 = green
    let c2 = green2

    if (priority == 1) {
      c1 = red
      c2 = red2
    } else if (priority == 2) {
      c1 = yellow
      c2 = yellow2
    }

    return <View>
      <LinearGradient
        colors={[c1, c2]}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={{
          paddingHorizontal: 8,
          paddingVertical: 2,
          borderRadius: 16,
        }}
      >

        <ThemedText
          style={{
            fontWeight: 'bold',
            fontSize: 12,
          }}
          lightColor='white'
          darkColor='white'
        >{text}</ThemedText>
      </LinearGradient>
    </View>
  }

  const PriorityFlag = () => {
    // If importance in bottom third "Low Importance"
    // If importance in middle "Moderate Importance"
    // If importance in top third "High Priority"
    let text = ''

    if (!thisTask?.priority) {
      return <></>
    }

    // Calculate the range and third thresholds
    const range = maxPriority - minPriority;
    const third = range / 3;
    const lowerThird = minPriority + third;
    const middleThird = minPriority + 2 * third;


    // Determine which third the priority falls into
    if (thisTask?.priority < lowerThird) {
      return <Flag text={'Highest Priority'} priority={1} />
    } else if (thisTask?.priority < middleThird) {
      return <Flag text={'Priority'} priority={2} />
    } else {
      return <Flag text={'Lowest Priority'} priority={3} />
    }
  }

  const DueDateFlag = () => {
    // If no dueDate, return null
    if (!thisTask?.dueDate) {
      return null;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to start of day for comparison

    const dueDate = new Date(thisTask.dueDate);
    dueDate.setHours(0, 0, 0, 0); // Normalize dueDate for comparison

    // Calculate the difference in days
    const timeDiff = dueDate.getTime() - today.getTime();
    const daysDiff = timeDiff / (1000 * 3600 * 24);

    // If dueDate is in the past (before today)
    if (daysDiff < 0) {
      return <Flag text="Overdue" priority={1} />;
    }

    // If dueDate is within 7 days (including today)
    if (daysDiff <= 7) {
      return <Flag text="Due Soon" priority={2} />;
    }

    // Otherwise, return nothing
    return null;
  };

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen
        options={{
          title: thisTask?.title || '',
        }}
      />
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        scrollIndicatorInsets={{ bottom }}
        contentContainerStyle={{ paddingBottom: bottom }}>
        <Animated.View
          style={[
            styles.header,
            { backgroundColor: bgSecondary },
            headerAnimatedStyle,
          ]}>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 8 }}>
            <DueDateFlag />
            <PriorityFlag />
          </View>
          <ThemedText type='title'>{thisTask?.title}</ThemedText>
        </Animated.View>
        <ThemedView style={styles.content}>
          <ThemedText>
            {thisTask?.description}
          </ThemedText>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ gap: 4 }}>
              <ThemedText colorName='textSecondary' type='small'>Due:</ThemedText>
              <ThemedText>
                {thisTask?.dueDate?.toLocaleDateString()}
              </ThemedText>
            </View>
            <View style={{ gap: 4 }}>
              <ThemedText colorName='textSecondary' type='small' style={{ textAlign: 'right' }}>Created:</ThemedText>
              <ThemedText>
                {thisTask?.dueDate?.toLocaleDateString()}
              </ThemedText>
            </View>
          </View>
        </ThemedView>
      </Animated.ScrollView>
      <CompleteFAB />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: HEADER_HEIGHT,
    overflow: 'hidden',
    padding: 8,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 32,
    gap: 16,
    overflow: 'hidden',
  },
  page: {
    flex: 1,
  }
});
