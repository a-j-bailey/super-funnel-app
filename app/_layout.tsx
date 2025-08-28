import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { AuthProvider } from '@/providers/AuthProvider';
import { TaskProvider } from '@/providers/TaskProvider';

import { vexo } from 'vexo-analytics';

if (!__DEV__) {
  vexo('32ff6046-e477-41d2-a957-83f75b3e2bd4');
}

export default function RootLayout() {
  const tintColorLight = '#5E409D';
  const tintColorDark = '#8B7EC8';

  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <AuthProvider>
      <TaskProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack screenOptions={{ headerTintColor: colorScheme === 'dark' ? tintColorDark : tintColorLight }}>
            <Stack.Screen name="index" options={{ title: 'Home', headerShown: false }} />
            <Stack.Screen name="create" options={{ title: 'New Task', presentation: 'modal', headerShown: false }} />
            <Stack.Screen name="profile" options={{ title: 'Profile' }} />
            <Stack.Screen name="[taskId]" options={{ presentation: 'modal', headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </TaskProvider>
    </AuthProvider>
  );
}
