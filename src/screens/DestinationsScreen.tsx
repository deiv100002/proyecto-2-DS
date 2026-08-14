import { colors } from '../theme/colors';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { destinations } from '../data/destinations';

export default function DestinationsScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Destinations</Text>

      <FlatList
        data={destinations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate('DestinationDetail', {
                destination: item,
              })
            }
          >
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.country}>{item.country}</Text>

            <Text
              style={styles.description}
              numberOfLines={2}
            >
              {item.description}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    backgroundColor: colors.surface,
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 21,
    fontWeight: 'bold',
  },
  country: {
    fontSize: 16,
    marginTop: 4,
  },
  description: {
    fontSize: 14,
    marginTop: 10,
    lineHeight: 20,
  },
});