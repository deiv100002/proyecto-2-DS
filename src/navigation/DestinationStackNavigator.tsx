import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DestinationsScreen from '../screens/DestinationsScreen';
import DestinationDetailScreen from '../screens/DestinationDetailScreen';

const Stack = createNativeStackNavigator();

export default function DestinationStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Destinations"
        component={DestinationsScreen}
        options={{
          title: 'Explore Destinations',
        }}
      />

      <Stack.Screen
        name="DestinationDetail"
        component={DestinationDetailScreen}
        options={{
          title: 'Destination Details',
        }}
      />
    </Stack.Navigator>
  );
}