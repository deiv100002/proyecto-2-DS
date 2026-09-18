import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import {
  getWeather,
  WeatherData,
} from '../services/weatherService';

import { colors } from '../theme/colors';
import {
  addFavorite,
} from '../database/favoritesDatabase';

export default function WeatherScreen() {
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  
  const countriesWithState = [
  'US',
  'UNITED STATES',
  'CA',
  'CANADA',
  'CN',
  'CHINA',
];
  const [date, setDate] = useState('');
  
  const normalizedCountry = country
  .trim()
  .toUpperCase();

  const requiresState =
  countriesWithState.includes(normalizedCountry);
  const [weather, setWeather] =
    useState<WeatherData | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] =
    useState<string | null>(null);

  const searchWeather = async () => {
  if (!country.trim() || !city.trim()) {
    Alert.alert(
      'Location required',
      'Please enter both country and city.'
    );
    return;
  }

  if (requiresState && !state.trim()) {
    Alert.alert(
      'State / Province required',
      'Please enter a state or province.'
    );
    return;
  }

  if (!date.trim()) {
    Alert.alert(
      'Date required',
      'Please enter a date in MM/DD/YYYY format.'
    );
    return;
  }

  const dateParts = date.split('/');

  if (dateParts.length !== 3) {
    Alert.alert(
      'Invalid date',
      'Please use the format MM/DD/YYYY.'
    );
    return;
  }

  const month = Number(dateParts[0]);
  const day = Number(dateParts[1]);
  const year = Number(dateParts[2]);

  const selectedDate = new Date(
    year,
    month - 1,
    day
  );

  selectedDate.setHours(0, 0, 0, 0);

  if (
    selectedDate.getFullYear() !== year ||
    selectedDate.getMonth() !== month - 1 ||
    selectedDate.getDate() !== day
  ) {
    Alert.alert(
      'Invalid date',
      'Please enter a valid date in MM/DD/YYYY format.'
    );
    return;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const maxDate = new Date(today);
  maxDate.setDate(
    maxDate.getDate() + 15
  );

  if (selectedDate < today) {
    Alert.alert(
      'Invalid date',
      'Please select today or a future date.'
    );
    return;
  }

  if (selectedDate > maxDate) {
    Alert.alert(
      'Date too far',
      'You can only select a date up to 15 days in advance.'
    );
    return;
  }

  const apiDate =
    `${year}-` +
    `${String(month).padStart(2, '0')}-` +
    `${String(day).padStart(2, '0')}`;

  try {
    setLoading(true);
    setError(null);
    setWeather(null);

    let location = '';

    if (requiresState) {
      location =
        `${city.trim()}, ${state.trim()}`;
    } else {
      location =
        `${city.trim()}, ${country.trim()}`;
    }

    const data = await getWeather(
      location,
      apiDate
    );

    setWeather(data);
  } catch (err) {
    console.error(err);

    setError(
      'Weather information could not be loaded. Please check the location and date.'
    );
  } finally {
    setLoading(false);
  }
};

const stateLabel =
  normalizedCountry === 'CA' ||
  normalizedCountry === 'CANADA'
    ? 'Province'
    : normalizedCountry === 'CN' ||
      normalizedCountry === 'CHINA'
    ? 'Province / Region'
    : 'State';

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Ionicons
          name="partly-sunny-outline"
          size={52}
          color={colors.primary}
        />

        <Text style={styles.title}>
          Weather Explorer
        </Text>

        <Text style={styles.subtitle}>
          Check the current weather before
          your next adventure.
        </Text>
      </View>

      <View style={styles.searchCard}>
        <Text style={styles.label}>
          Search location
        </Text>



<Text style={styles.label}>
  Country
</Text>

<TextInput
  style={styles.input}
  placeholder="Example: Japan, Costa Rica"
  placeholderTextColor={colors.textSecondary}
  value={country}
  onChangeText={(value) => {
    setCountry(value);

    const normalized = value
      .trim()
      .toUpperCase();

    if (
      !countriesWithState.includes(normalized)
    ) {
      setState('');
    }
  }}
  autoCapitalize="words"
/>

<Text style={styles.label}>
  City
</Text>

<TextInput
  style={styles.input}
  placeholder="Example: Tokyo"
  placeholderTextColor={colors.textSecondary}
  value={city}
  onChangeText={setCity}
  autoCapitalize="words"
/>

{requiresState && (
  <>
    <Text style={styles.label}>
      {stateLabel}
    </Text>

    <TextInput
      style={styles.input}
      placeholder={
        normalizedCountry === 'US' ||
        normalizedCountry === 'UNITED STATES'
          ? 'Example: NY'
          : normalizedCountry === 'CA' ||
            normalizedCountry === 'CANADA'
          ? 'Example: ON'
          : 'Example: Beijing'
      }
      placeholderTextColor={
        colors.textSecondary
      }
      value={state}
      onChangeText={setState}
      autoCapitalize="characters"
    />
  </>
)}

{/* DATE MUST BE OUTSIDE THE requiresState BLOCK */}

<Text style={styles.label}>
  Date
</Text>

<TextInput
  style={styles.input}
  placeholder="MM/DD/YYYY"
  placeholderTextColor={
    colors.textSecondary
  }
  value={date}
  onChangeText={setDate}
  keyboardType="numbers-and-punctuation"
  
/>


<Text style={styles.helperText}>
  You can select a date up to 15 days in advance.
</Text>

<TouchableOpacity
  style={styles.searchButton}
  onPress={async () => {
    try {
      await addFavorite(
        weather!.city,
        weather!.country
      );

      Alert.alert(
        'Saved',
        'City saved to favorites.'
      );
    } catch (error) {
      console.error(error);

      Alert.alert(
        'Error',
        'Could not save favorite.'
      );
    }
  }}
>
  <Ionicons
    name="heart-outline"
    size={20}
    color="#FFFFFF"
  />

  <Text style={styles.searchButtonText}>
    Save to Favorites
  </Text>
</TouchableOpacity>

      </View>

      {loading && (
        <View style={styles.statusContainer}>
          <ActivityIndicator
            size="large"
            color={colors.primary}
          />

          <Text style={styles.statusText}>
            Loading weather...
          </Text>
        </View>
      )}

      {error && (
        <View style={styles.errorCard}>
          <Ionicons
            name="alert-circle-outline"
            size={30}
            color="#DC2626"
          />

          <Text style={styles.errorTitle}>
            Something went wrong
          </Text>

          <Text style={styles.errorText}>
            {error}
          </Text>
        </View>
      )}

      {weather && !loading && (
        <View style={styles.weatherCard}>
          <View style={styles.weatherHeader}>
            <View>
              <Text style={styles.city}>
                {weather.city}
              </Text>

              <Text style={styles.locationText}>
                {[
                  weather.state,
                  weather.country,
                ]
                  .filter(Boolean)
                  .join(', ')}
              </Text>
            </View>

            <Ionicons
              name="cloud-outline"
              size={48}
              color={colors.primary}
            />
          </View>

          <Text style={styles.temperature}>
            {Math.round(weather.temperature)}°C
          </Text>

          <Text style={styles.condition}>
            {weather.weather}
          </Text>

          <Text style={styles.feelsLike}>
            Feels like{' '}
            {Math.round(weather.feelsLike)}°C
          </Text>

          <View style={styles.details}>
            <View style={styles.detailCard}>
              <Ionicons
                name="water-outline"
                size={26}
                color={colors.primary}
              />

              <Text style={styles.detailLabel}>
                Humidity
              </Text>

              <Text style={styles.detailValue}>
                {weather.humidity}%
              </Text>
            </View>

            <View style={styles.detailCard}>
              <Ionicons
                name="speedometer-outline"
                size={26}
                color={colors.primary}
              />

              <Text style={styles.detailLabel}>
                Wind
              </Text>

              <Text style={styles.detailValue}>
                {weather.windSpeed} km/h
              </Text>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  header: {
    alignItems: 'center',
    marginBottom: 24,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginTop: 10,
  },

  subtitle: {
    fontSize: 15,
    lineHeight: 21,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 6,
  },

  searchCard: {
    backgroundColor: colors.surface,
    padding: 18,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 22,
  },

  label: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 8,
  },

  input: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 15,
    color: colors.textPrimary,
    marginBottom: 12,
  },

  searchButton: {
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },

  searchButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },

  statusContainer: {
    alignItems: 'center',
    marginTop: 30,
  },

  statusText: {
    marginTop: 12,
    color: colors.textSecondary,
  },

  errorCard: {
    backgroundColor: '#FEF2F2',
    borderRadius: 18,
    padding: 20,
    alignItems: 'center',
  },

  errorTitle: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#991B1B',
  },

  errorText: {
    marginTop: 6,
    color: '#991B1B',
    textAlign: 'center',
    lineHeight: 20,
  },

  weatherCard: {
    backgroundColor: colors.surface,
    borderRadius: 22,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },

  weatherHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  city: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },

  locationText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 3,
  },

  temperature: {
    fontSize: 54,
    fontWeight: 'bold',
    color: colors.primary,
    marginTop: 22,
  },

  condition: {
    fontSize: 19,
    fontWeight: '600',
    color: colors.textPrimary,
    marginTop: 2,
  },

  feelsLike: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 5,
    marginBottom: 20,
  },

  details: {
    flexDirection: 'row',
    gap: 12,
  },

  detailCard: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 14,
  },

  detailLabel: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 8,
  },

  detailValue: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: 2,
  },
  helperText: {
  fontSize: 12,
  color: colors.textSecondary,
  marginTop: -6,
  marginBottom: 14,
},
});