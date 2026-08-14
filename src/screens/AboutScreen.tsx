import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

export default function AboutScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <View style={styles.iconContainer}>
        <Ionicons
          name="information-circle-outline"
          size={46}
          color={colors.primary}
        />
      </View>

      <Text style={styles.title}>About Travel Explorer</Text>

      <Text style={styles.description}>
        Travel Explorer is a React Native application developed with Expo
        to demonstrate nested navigation using Drawer, Bottom Tabs and Stack
        navigation.
      </Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Navigation Architecture</Text>

        <Text style={styles.item}>• Drawer Navigator</Text>
        <Text style={styles.item}>• Bottom Tab Navigator</Text>
        <Text style={styles.item}>• Native Stack Navigator</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Technologies</Text>

        <Text style={styles.item}>• React Native</Text>
        <Text style={styles.item}>• Expo</Text>
        <Text style={styles.item}>• TypeScript</Text>
        <Text style={styles.item}>• React Navigation</Text>
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
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: '#DBEAFE',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 18,
    marginBottom: 18,
  },

  title: {
    fontSize: 27,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.textPrimary,
    marginBottom: 16,
  },

  description: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },

  card: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 20,
    marginBottom: 16,
    elevation: 2,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 12,
  },

  item: {
    fontSize: 15,
    color: colors.textSecondary,
    marginBottom: 8,
  },
});