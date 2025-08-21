import { useThemeColor } from '@/hooks/useThemeColor';
import { useTasks } from '@/providers/TaskProvider';
import * as Haptics from 'expo-haptics';
import { CircleCheck } from 'lucide-react-native';
import { GestureResponderEvent, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedText } from './ThemedText';

export function CompleteFAB({ taskId }: { taskId: number }) {
    const { markTaskCompleted } = useTasks()
    const insets = useSafeAreaInsets();
    const iconColor = useThemeColor({}, 'background')
    const green = useThemeColor({ light: '#879A39', dark: '#66800B' }, 'tint')

    const complete = (ev: GestureResponderEvent) => {
        if (process.env.EXPO_OS === 'ios') {
            // Add a soft haptic feedback when pressing down on the tabs.
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
        }
        markTaskCompleted(taskId)
    }

    return (
        <TouchableOpacity
            onPressIn={complete}
            style={[styles.container, { bottom: insets.bottom, backgroundColor: green }]}
        >
            <ThemedText colorName='background' style={{ fontWeight: 'bold' }}>Complete</ThemedText>
            <CircleCheck size={24} color={iconColor} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 28,
        lineHeight: 28,
        color: 'white',
    },
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: 'gray',
        gap: 8,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopEndRadius: 32,
        borderBottomEndRadius: 32,
        padding: 16,
        paddingRight: 32,
    },
});
