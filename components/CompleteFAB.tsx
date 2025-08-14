import { useThemeColor } from '@/hooks/useThemeColor';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { CircleCheck } from 'lucide-react-native';
import { GestureResponderEvent, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedText } from './ThemedText';

export function CompleteFAB() {
    const insets = useSafeAreaInsets();
    const bgColor = useThemeColor({}, 'tint')
    const iconColor = useThemeColor({}, 'background')
    const green = useThemeColor({ light: '#879A39', dark: '#66800B' }, 'tint')
    // const green2 = useThemeColor({ light: '#66800B', dark: '#66800B' }, 'tint')

    const navigate = (ev: GestureResponderEvent) => {
        if (process.env.EXPO_OS === 'ios') {
            // Add a soft haptic feedback when pressing down on the tabs.
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
        }

        router.navigate('/create')
    }

    return (
        <TouchableOpacity
            onPressIn={navigate}
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
