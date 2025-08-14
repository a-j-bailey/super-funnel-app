import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useTasks } from '@/providers/TaskProvider';
import { Task } from '@/utils/types';
import { router } from 'expo-router';
import { Circle } from 'lucide-react-native';
import React from 'react';

export function TaskCard({ task, index }: { task: Task, index: number }) {
    const { fetchTaskById, getMinMaxPriority } = useTasks()
    const { minPriority, maxPriority } = getMinMaxPriority()
    const borderColor = useThemeColor({ light: '#F2F0E5', dark: '#1C1B1A' }, 'background')
    const highlightColor = useThemeColor({ light: '#8B7EC8', dark: '#5E409D' }, 'tint')
    const iconColor = useThemeColor({}, 'icon')
    const red = useThemeColor({ light: '#AF3029', dark: '#D14D41' }, 'tint')
    const yellow = useThemeColor({ light: '#AD8301', dark: '#D0A215' }, 'tint')
    let highlight = borderColor
    let border = borderColor

    function toHexOpacity(num: number) {
        if (num < 0) num = 0;
        if (num > 10) num = 10;
        const alpha = Math.round((num / 10) * 255); // scale 0–10 to 0–255
        return alpha.toString(16).padStart(2, '0').toUpperCase(); // two-digit hex
    }

    function toDescendingRange(num: number) {
        if (num < 0) num = 0;
        if (num > 10) num = 10;
        const maxVal = 0.8;
        const minVal = 0.2;

        const range = maxVal - minVal;
        return maxVal - (num / 10) * range;
    }

    if (index < 10) {
        highlight = highlightColor + toHexOpacity(10 - index)
        border = borderColor + toHexOpacity(10 - index)
    }

    const PriorityPip = () => {
        // Calculate the range and third thresholds
        const range = maxPriority - minPriority;
        const third = range / 3;
        const lowerThird = minPriority + third;
        const middleThird = minPriority + 2 * third;


        // Determine which third the priority falls into
        if (task.priority < lowerThird) {
            return <View style={{ width: 8, height: 8, borderRadius: 8, backgroundColor: red }} />
        } else if (task.priority < middleThird) {
            return <View style={{ width: 8, height: 8, borderRadius: 8, backgroundColor: yellow }} />
        } else {
            return <></>
        }
    }

    return (
        <TouchableOpacity
            onPress={() => { router.navigate(`/${task.id}`) }}>
            <LinearGradient
                colors={[highlight, border]}
                start={{ x: 0, y: 0 }}
                end={{ x: toDescendingRange(index), y: 0.8 }}
                style={[styles.highlight, { backgroundColor: borderColor }]}
            >
                <ThemedView lightColor='#F2F0E5' darkColor='#1C1B1A' style={styles.cardOuter}>
                    <View style={styles.taskBody}>
                        <Circle color={iconColor} />
                        {/* <CircleCheck /> */}
                        <ThemedText type="defaultSemiBold" style={{ flex: 1 }}>{task.title}</ThemedText>
                        <View style={{ flexDirection: 'row', gap: 4 }}>
                            {/* <View style={{ width: 8, height: 8, borderRadius: 8, backgroundColor: yellow }} /> */}
                            <PriorityPip />
                        </View>
                    </View>
                </ThemedView>
            </LinearGradient>
        </TouchableOpacity>
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
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center'
    },
    cardOuter: {
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderRadius: 6,
    },
    highlight: {
        padding: 2,
        borderRadius: 8
    }
});
