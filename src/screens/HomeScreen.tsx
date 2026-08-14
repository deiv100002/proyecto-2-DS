import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

export default function HomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <View style={styles.iconContainer}>
          <Ionicons name="airplane" size={42} color={colors.primary} />
        </View>

        <Text style={styles.title}>Travel Explorer</Text>

        <Text style={styles.subtitle}>
          Discover inspiring destinations and explore new places around the world.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Explore')}
        >
          <Text style={styles.buttonText}>Start Exploring</Text>

          <Ionicons
            name="arrow-forward"
            size={20}
            color={colors.surface}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.featuresContainer}>
        <Text style={styles.sectionTitle}>Explore your next destination</Text>

        <View style={styles.feature}>
          <Ionicons
            name="compass-outline"
            size={24}
            color={colors.primary}
          />

          <View style={styles.featureTextContainer}>
            <Text style={styles.featureTitle}>Discover</Text>
            <Text style={styles.featureDescription}>
              Browse destinations and learn more about each location.
            </Text>
          </View>
        </View>

        <View style={styles.feature}>
          <Ionicons
            name="heart-outline"
            size={24}
            color={colors.primary}
          />

          <View style={styles.featureTextContainer}>
            <Text style={styles.featureTitle}>Favorites</Text>
            <Text style={styles.featureDescription}>
              Keep track of the destinations that inspire you.
            </Text>
          </View>
        </View>

        <View style={styles.feature}>
          <Ionicons
            name="person-outline"
            size={24}
            color={colors.primary}
          />

          <View style={styles.featureTextContainer}>
            <Text style={styles.featureTitle}>Your Profile</Text>
            <Text style={styles.featureDescription}>
              Access your traveler profile and preferences.
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 24,
  },

  hero: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 30,
  },

  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#DBEAFE',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.textPrimary,
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 24,
  },

  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
  },

  buttonText: {
    color: colors.surface,
    fontSize: 16,
    fontWeight: '600',
  },

  featuresContainer: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 20,
    elevation: 2,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 20,
  },

  feature: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 18,
  },

  featureTextContainer: {
    flex: 1,
    marginLeft: 14,
  },

  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
  },

  featureDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.textSecondary,
    marginTop: 4,
  },
});