import { SafeAreaView, View, type ViewProps } from 'react-native';

import { Colors } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  colorName?: keyof typeof Colors.light & keyof typeof Colors.dark
};

export function ThemedView({ style, lightColor, darkColor, colorName = 'background', ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, colorName);

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function ThemedSafeView({ style, lightColor, darkColor, colorName = 'background', ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, colorName);

  return <SafeAreaView style={[{ backgroundColor }, style]} {...otherProps} />;
}