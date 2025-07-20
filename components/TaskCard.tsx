import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Task } from '@/utils/types';
import { router } from 'expo-router';

export function TaskCard({ task }: { task: Task }) {
    const theme = useColorScheme() ?? 'light';

    return (
        <ThemedView style={styles.cardOuter}>
            <TouchableOpacity
                style={styles.heading}
                onPress={() => { router.navigate(`/tasks/${task.id}`) }}>
                <View style={styles.taskBody}>
                    <ThemedText type="defaultSemiBold">{task.title}</ThemedText>
                    {task.parentTask && <ThemedText type='small'>Part of {task.parentTask.title}</ThemedText>}
                </View>
            </TouchableOpacity>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    heading: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    taskBody: {
        display: 'flex',
        flexDirection: 'column'
    },
    cardOuter: {
        backgroundColor: '#1C1B1A',
        padding: 8,
        borderRadius: 8,
    }
});
