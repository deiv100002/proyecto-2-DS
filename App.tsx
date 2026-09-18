import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import DrawerNavigator from './src/navigation/DrawerNavigator';
import { MemoriesProvider } from './src/context/MemoriesContext';

export default function App() {
  return (
    <MemoriesProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <DrawerNavigator />
      </NavigationContainer>
    </MemoriesProvider>
  );
}