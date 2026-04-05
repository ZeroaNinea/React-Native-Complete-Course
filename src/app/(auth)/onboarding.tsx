import { ThemedText } from '@/components/themed-text';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/hooks/use-theme';
import { getSupabase } from '@/lib/supabase/client';
import { uploadProfileImage } from '@/lib/supabase/storage';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function Onboarding() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const { user, updateUser } = useAuth();
  const router = useRouter();

  const theme = useTheme();

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert(
        'Permission Denied',
        'You need camera roll permissions to select a profile image.',
      );

      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets[0]) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert(
        'Permission Denied',
        'You need camera permissions to take a photo.',
      );

      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets[0]) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const showImagePicker = () => {
    Alert.alert('Select Profile Image', 'Choose an option.', [
      {
        text: 'Camera',
        onPress: takePhoto,
      },
      {
        text: 'Photo Library',
        onPress: pickImage,
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ]);
  };

  const handleComplete = async () => {
    console.log('handle complete called');
    if (!name || !username || !profileImage) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    if (username.length < 3) {
      Alert.alert('Error', 'Username must be at least 3 characters.');
      return;
    }

    setIsLoading(true);
    try {
      // if (!user) {
      //   throw new Error('User is not authenticated.');
      // }

      const {
        data: { user: authUser },
      } = await getSupabase().auth.getUser();

      if (!authUser) {
        throw new Error('User is not authenticated.');
      }

      // Check if username exists.
      const { data: existingUser, error } = await getSupabase()
        .from('profiles')
        .select('id')
        .eq('username', username)
        .neq('id', authUser.id)
        .maybeSingle();

      if (error) {
        console.error('Error checking username:', error);
        Alert.alert('Error', 'Failed to check username. Please try again.');
        setIsLoading(false);
        return;
      }

      if (existingUser) {
        Alert.alert(
          'Error',
          'This username is already taken. Please choose another one.',
        );
        setIsLoading(false);
        return;
      }

      // Upload profile image.
      let profileImageUrl: string | undefined;
      if (profileImage) {
        try {
          profileImageUrl = await uploadProfileImage(
            user?.id || '',
            profileImage,
          );
        } catch (error) {
          console.error('Error uploading profile image:', error);
          Alert.alert(
            'Warning',
            'Failed to upload profile image. Continuing without image.',
          );
        }
      }

      // Update profile.
      await updateUser({
        name,
        username,
        profileImage: profileImageUrl,
        onboardingCompleted: true,
      });
      router.replace('/(tabs)/home');
    } catch (error: any) {
      console.error('Onboarding error:', error);
      Alert.alert('Error', error.message || 'Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ThemedText type="title">Onboarding</ThemedText>
      <Text style={styles.subtitle}>Add Your Information to Get Started</Text>
      <View style={styles.separator}></View>
      <View style={styles.form}>
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={showImagePicker}
        >
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <View style={styles.placeholderImage}>
              <Text style={styles.placeholderText}>+</Text>
            </View>
          )}
          <View style={styles.editBadge}>
            <Text style={styles.editText}>Edit</Text>
          </View>
        </TouchableOpacity>
      </View>

      <TextInput
        style={[styles.textInput, { color: theme.text }]}
        placeholder="Full Name"
        placeholderTextColor="#999"
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
      />

      <TextInput
        style={[styles.textInput, { color: theme.text }]}
        placeholder="Username"
        placeholderTextColor="#999"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        autoComplete="username"
      />

      <TouchableOpacity style={styles.button} onPress={handleComplete}>
        {isLoading ? (
          <ActivityIndicator size={24} color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Complete Setup</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginTop: 20,
  },
  subtitle: {
    color: '#999',
    fontSize: 16,
    marginTop: 10,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  form: {
    width: '100%',
    alignItems: 'center',
  },
  imageContainer: {
    marginBottom: 32,
    position: 'relative',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#f5f5f5',
  },
  placeholderImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderStyle: 'dashed',
  },
  placeholderText: {
    position: 'absolute',
    fontSize: 48,
    color: '#999',
    top: '46%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#21bde4',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  editText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  textInput: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#21bde4',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
  },
});
