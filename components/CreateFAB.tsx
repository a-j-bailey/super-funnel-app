import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { Plus } from 'lucide-react-native';
import { GestureResponderEvent, StyleSheet, TouchableOpacity, View } from 'react-native';

export function CreateFAB() {
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
        >
            <View style={styles.container}>
                <Plus />
            </View>
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
        bottom: 24,
        right: 16,
        width: 48,
        height: 48,
        padding: 8,
        backgroundColor: 'gray',
        gap: 8,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
});
