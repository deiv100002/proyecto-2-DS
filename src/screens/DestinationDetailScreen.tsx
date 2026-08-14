import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

export default function DestinationDetailScreen({ route }: any) {
  const { destination } = route.params;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <View style={styles.iconContainer}>
        <Ionicons
          name="location"
          size={42}
          color={colors.primary}
        />
      </View>

      <Text style={styles.title}>{destination.name}</Text>

      <View style={styles.locationContainer}>
        <Ionicons
          name="location-outline"
          size={18}
          color={colors.textSecondary}
        />

        <Text style={styles.country}>
          {destination.country}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>
          About this destination
        </Text>

        <Text style={styles.description}>
          {destination.description}
        </Text>
      </View>

      <View style={styles.infoCard}>
        <Ionicons
          name="airplane-outline"
          size={26}
          color={colors.primary}
        />

        <View style={styles.infoTextContainer}>
          <Text style={styles.infoTitle}>
            Ready to explore?
          </Text>

          <Text style={styles.infoDescription}>
            Discover culture, attractions and unforgettable experiences.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    padding: 24,
  },

  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#DBEAFE',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 18,
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.textPrimary,
    textAlign: 'center',
  },

  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 28,
  },

  country: {
    fontSize: 17,
    color: colors.textSecondary,
    marginLeft: 6,
  },

  card: {
    backgroundColor: colors.surface,
    padding: 20,
    borderRadius: 18,
    elevation: 2,
    marginBottom: 18,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 12,
  },

  description: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 25,
  },

  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#DBEAFE',
    padding: 18,
    borderRadius: 18,
    alignItems: 'center',
  },

  infoTextContainer: {
    flex: 1,
    marginLeft: 14,
  },

  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },

  infoDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginTop: 4,
  },
});