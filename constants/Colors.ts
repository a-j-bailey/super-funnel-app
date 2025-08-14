/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#5E409D';
const tintColorDark = '#8B7EC8';

export const Colors = {
  light: {
    text: '#100F0F',
    textSecondary: '#6F6E69',
    background: '#FFFCF0',
    backgroundSecondary: '#F2F0E5',
    tint: tintColorLight,
    icon: '#6F6E69',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#CECDC3',
    textSecondary: '#878580',
    background: '#100F0F',
    backgroundSecondary: '#1C1B1A',
    tint: tintColorDark,
    icon: '#878580',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};
