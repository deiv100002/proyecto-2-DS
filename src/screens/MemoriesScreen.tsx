import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { useMemories } from '../context/MemoriesContext';
import { colors } from '../theme/colors';

export default function MemoriesScreen() {
  const { memories } = useMemories();

  if (memories.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons
          name="images-outline"
          size={70}
          color={colors.primary}
        />

        <Text style={styles.emptyTitle}>
          No memories yet
        </Text>

        <Text style={styles.emptyText}>
          Take your first travel photo and it will appear here.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        My Travel Memories
      </Text>

      <Text style={styles.subtitle}>
        Places and moments captured during your adventures.
      </Text>

      <FlatList
        data={memories}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              source={{ uri: item.imageUri }}
              style={styles.image}
            />

            <View style={styles.cardContent}>
              <Text style={styles.description}>
                {item.description}
              </Text>

              <View style={styles.locationRow}>
                <Ionicons
                  name="location-outline"
                  size={18}
                  color={colors.primary}
                />

                <View style={styles.coordinates}>
                  <Text style={styles.coordinateText}>
                    Latitude: {item.latitude.toFixed(6)}
                  </Text>

                  <Text style={styles.coordinateText}>
                    Longitude: {item.longitude.toFixed(6)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 15,
    lineHeight: 21,
    color: colors.textSecondary,
    marginBottom: 18,
  },

  list: {
    paddingBottom: 30,
  },

  card: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },

  image: {
    width: '100%',
    height: 260,
  },

  cardContent: {
    padding: 16,
  },

  description: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 14,
  },

  locationRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  coordinates: {
    marginLeft: 8,
  },

  coordinateText: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 3,
  },

  emptyContainer: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },

  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginTop: 16,
    marginBottom: 8,
  },

  emptyText: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});