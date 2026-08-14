import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Ionicons
          name="person"
          size={46}
          color={colors.primary}
        />
      </View>

      <Text style={styles.name}>Traveler Profile</Text>

      <Text style={styles.subtitle}>
        Ready to discover new places and experiences.
      </Text>

      <View style={styles.card}>
        <View style={styles.item}>
          <Ionicons
            name="compass-outline"
            size={22}
            color={colors.primary}
          />

          <View style={styles.itemText}>
            <Text style={styles.itemTitle}>Travel Style</Text>
            <Text style={styles.itemValue}>Explorer</Text>
          </View>
        </View>

        <View style={styles.item}>
          <Ionicons
            name="heart-outline"
            size={22}
            color={colors.primary}
          />

          <View style={styles.itemText}>
            <Text style={styles.itemTitle}>Favorite Experience</Text>
            <Text style={styles.itemValue}>Culture & Adventure</Text>
          </View>
        </View>

        <View style={styles.item}>
          <Ionicons
            name="earth-outline"
            size={22}
            color={colors.primary}
          />

          <View style={styles.itemText}>
            <Text style={styles.itemTitle}>Goal</Text>
            <Text style={styles.itemValue}>Explore the world</Text>
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
    alignItems: 'center',
  },

  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#DBEAFE',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
    marginBottom: 18,
  },

  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },

  subtitle: {
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 28,
  },

  card: {
    width: '100%',
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 20,
    elevation: 2,
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  itemText: {
    marginLeft: 14,
  },

  itemTitle: {
    fontSize: 14,
    color: colors.textSecondary,
  },

  itemValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginTop: 2,
  },
});