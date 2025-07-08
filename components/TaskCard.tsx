import { StyleSheet, TouchableOpacity } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Task } from '@/utils/types';

export function TaskCard({ task }: { task: Task }) {
    const theme = useColorScheme() ?? 'light';

    return (
        <ThemedView style={styles.cardOuter}>
            <TouchableOpacity
                style={styles.heading}
                onPress={() => {}}>
                <ThemedText type="defaultSemiBold">{task.title}</ThemedText>
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
    content: {
        marginTop: 6,
        marginLeft: 24,
    },
    cardOuter: {
        padding: 8,
        borderColor: 'silver',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 8,
    }
});
