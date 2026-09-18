import React, { useRef, useState } from 'react';
import {
  Alert,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  CameraView,
  useCameraPermissions,
} from 'expo-camera';

import * as Location from 'expo-location';

import { useMemories } from '../context/MemoriesContext';
import { colors } from '../theme/colors';

export default function CaptureMemoryScreen({ navigation }: any) {
  const cameraRef = useRef<CameraView>(null);

  const [cameraPermission, requestCameraPermission] =
    useCameraPermissions();

  const [photoUri, setPhotoUri] = useState<string | null>(null);

  const [description, setDescription] = useState('');

  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  const [loading, setLoading] = useState(false);

  const { addMemory } = useMemories();

  const [cameraReady, setCameraReady] = useState(false);

  const takePhoto = async () => {
    try {
      setLoading(true);

      // 1. Revisar permiso de cámara
      if (!cameraPermission?.granted) {
        const permissionResult =
          await requestCameraPermission();

        if (!permissionResult.granted) {
          Alert.alert(
            'Camera permission required',
            'Travel Explorer needs camera permission to capture your travel memories.'
          );

          setLoading(false);
          return;
        }
      }

      // 2. Pedir permiso de ubicación
      const locationPermission =
        await Location.requestForegroundPermissionsAsync();

      if (locationPermission.status !== 'granted') {
        Alert.alert(
          'Location permission required',
          'Travel Explorer needs your location to save where the photo was taken.'
        );

        setLoading(false);
        return;
      }

      // 3. Tomar fotografía
      const photo =
        await cameraRef.current?.takePictureAsync({
          quality: 0.8,
        });

      if (!photo) {
        Alert.alert(
          'Error',
          'The photo could not be captured.'
        );

        setLoading(false);
        return;
      }

      // 4. Obtener GPS inmediatamente después de la foto
      const location =
        await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });

      // 5. Guardar datos temporalmente
      setPhotoUri(photo.uri);

      setLatitude(
        location.coords.latitude
      );

      setLongitude(
        location.coords.longitude
      );

      setLoading(false);
    } catch (error) {
      console.log(error);

      Alert.alert(
        'Error',
        'Something went wrong while capturing your travel memory.'
      );

      setLoading(false);
    }
  };

  const saveMemory = () => {
    if (!photoUri) {
      Alert.alert(
        'Photo required',
        'Please take a photo first.'
      );

      return;
    }

    if (!description.trim()) {
      Alert.alert(
        'Description required',
        'Please add a short description of your memory.'
      );

      return;
    }

    if (
      latitude === null ||
      longitude === null
    ) {
      Alert.alert(
        'Location required',
        'Location information is missing.'
      );

      return;
    }

    addMemory({
      id: Date.now().toString(),
      imageUri: photoUri,
      description: description.trim(),
      latitude,
      longitude,
    });

    Alert.alert(
      'Memory saved!',
      'Your travel memory was added successfully.'
    );

    // Limpiar formulario
    setPhotoUri(null);
    setDescription('');
    setLatitude(null);
    setLongitude(null);

    // Más adelante conectaremos esta pantalla
    navigation.navigate('Memories');
  };

  // Si todavía está cargando el permiso
 if (!cameraPermission) {
  return (
    <View style={styles.center}>
      <Text style={styles.loadingText}>
        Checking camera permission...
      </Text>
    </View>
  );
}

if (!cameraPermission.granted) {
  const handleCameraPermission = async () => {
    // Android todavía permite volver a preguntar
    if (cameraPermission.canAskAgain) {
      const result = await requestCameraPermission();

      if (!result.granted && !result.canAskAgain) {
        Alert.alert(
          'Camera permission denied',
          'Please enable camera access from your phone settings.'
        );
      }

      return;
    }

    // Android ya no permite mostrar el popup otra vez
    Alert.alert(
      'Camera permission required',
      'Camera access is disabled. Please enable it in your phone settings.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Open Settings',
          onPress: () => Linking.openSettings(),
        },
      ]
    );
  };

  return (
    <View style={styles.center}>
      <Text style={styles.permissionTitle}>
        Camera Permission
      </Text>

      <Text style={styles.permissionText}>
        Travel Explorer needs access to your camera
        to capture your travel memories.
      </Text>

      <TouchableOpacity
        style={styles.permissionButton}
        onPress={handleCameraPermission}
      >
        <Text style={styles.primaryButtonText}>
          {cameraPermission.canAskAgain
            ? 'Allow Camera'
            : 'Open Settings'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>
        Capture a Memory
      </Text>

      <Text style={styles.subtitle}>
        Take a photo and save the place
        where your adventure happened.
      </Text>

      {!photoUri ? (
        <>
          <View style={styles.cameraContainer}>
            <CameraView
             ref={cameraRef}
                style={styles.camera}
             facing="back"
            onCameraReady={() => setCameraReady(true)}
/>
          </View>

          <TouchableOpacity
  style={styles.primaryButton}
  onPress={takePhoto}
  disabled={loading || !cameraReady}
>
  <Text style={styles.primaryButtonText}>
    {!cameraReady
      ? 'Preparing Camera...'
      : loading
      ? 'Capturing...'
      : 'Take Photo'}
  </Text>
</TouchableOpacity>
        </>
      ) : (
        <>
          <Image
            source={{ uri: photoUri }}
            style={styles.preview}
          />

          <View style={styles.locationCard}>
            <Text style={styles.locationTitle}>
              📍 Photo Location
            </Text>

            <Text style={styles.coordinate}>
              Latitude:{' '}
              {latitude?.toFixed(6)}
            </Text>

            <Text style={styles.coordinate}>
              Longitude:{' '}
              {longitude?.toFixed(6)}
            </Text>
          </View>

          <Text style={styles.label}>
            Description
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Example: Amazing afternoon in Alajuela..."
            placeholderTextColor={
              colors.textSecondary
            }
            value={description}
            onChangeText={setDescription}
            multiline
          />

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={saveMemory}
          >
            <Text style={styles.primaryButtonText}>
              Save Memory
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => {
              setPhotoUri(null);
              setLatitude(null);
              setLongitude(null);
            }}
          >
            <Text style={styles.secondaryButtonText}>
              Retake Photo
            </Text>
          </TouchableOpacity>
        </>
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

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },

  loadingText: {
    color: colors.textSecondary,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.textSecondary,
    marginBottom: 20,
  },

  cameraContainer: {
    height: 420,
    borderRadius: 22,
    overflow: 'hidden',
    marginBottom: 20,
    backgroundColor: '#000',
  },

  camera: {
    flex: 1,
  },

  preview: {
    width: '100%',
    height: 380,
    borderRadius: 22,
    marginBottom: 18,
  },

  locationCard: {
    backgroundColor: colors.surface,
    padding: 18,
    borderRadius: 18,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },

  locationTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 10,
  },

  coordinate: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 5,
  },

  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 8,
  },

  input: {
    minHeight: 100,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    padding: 15,
    color: colors.textPrimary,
    textAlignVertical: 'top',
    marginBottom: 18,
  },

  primaryButton: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 12,
  },

  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  secondaryButton: {
    borderWidth: 1,
    borderColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },

  secondaryButtonText: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: '600',
  },
  permissionTitle: {
  fontSize: 24,
  fontWeight: 'bold',
  color: colors.textPrimary,
  marginBottom: 12,
},

permissionText: {
  fontSize: 15,
  color: colors.textSecondary,
  textAlign: 'center',
  lineHeight: 22,
  marginBottom: 20,
  paddingHorizontal: 25,
},
permissionButton: {
  width: '80%',
  backgroundColor: colors.primary,
  paddingVertical: 15,
  borderRadius: 14,
  alignItems: 'center',
  marginTop: 8,
},
});