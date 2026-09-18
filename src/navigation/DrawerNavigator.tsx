import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import CaptureMemoryScreen from '../screens/CaptureMemoryScreen';
import MemoriesScreen from '../screens/MemoriesScreen';

import HomeScreen from '../screens/HomeScreen';
import TabNavigator from './TabNavigator';
import AboutScreen from '../screens/AboutScreen';
import WeatherScreen from '../screens/WeatherScreen';
import { colors } from '../theme/colors';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerActiveTintColor: colors.primary,
        drawerInactiveTintColor: colors.textSecondary,
        drawerLabelStyle: {
          fontSize: 15,
          fontWeight: '600',
        },
        headerTitleAlign: 'center',
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Travel Explorer',
          drawerIcon: ({ color, size }) => (
            <Ionicons
              name="home-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Explore"
        component={TabNavigator}
        options={{
          headerShown: false,
          drawerIcon: ({ color, size }) => (
            <Ionicons
              name="compass-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
        <Drawer.Screen
  name="CaptureMemory"
  component={CaptureMemoryScreen}
  options={{
    title: 'Capture Memory',
    drawerIcon: ({ color, size }) => (
      <Ionicons
        name="camera-outline"
        size={size}
        color={color}
      />
    ),
  }}
/>

<Drawer.Screen
  name="Memories"
  component={MemoriesScreen}
  options={{
    title: 'My Memories',
    drawerIcon: ({ color, size }) => (
      <Ionicons
        name="images-outline"
        size={size}
        color={color}
      />
    ),
  }}
/>
      <Drawer.Screen
        name="About"
        component={AboutScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons
              name="information-circle-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Drawer.Screen
  name="Weather"
  component={WeatherScreen}
  options={{
    title: 'Weather',
    drawerIcon: ({ color, size }) => (
      <Ionicons
        name="partly-sunny-outline"
        size={size}
        color={color}
      />
    ),
  }}
  />
    </Drawer.Navigator>
  );
}