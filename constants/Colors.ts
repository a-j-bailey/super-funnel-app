/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#24837B';
const tintColorDark = '#3AA99F';

export const Colors = {
  light: {
    text: '#100F0F',
    background: '#FFFCF0',
    tint: tintColorLight,
    icon: '#6F6E69',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#CECDC3',
    background: '#100F0F',
    tint: tintColorDark,
    icon: '#878580',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};
