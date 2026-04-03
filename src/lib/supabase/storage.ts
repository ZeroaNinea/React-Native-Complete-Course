import { File } from 'expo-file-system';
import { getSupabase } from './client';

export const uploadProfileImage = async (userId: string, imageUri: string) => {
  try {
    const fileExtension = imageUri.split('.').pop() || 'jpg';
    const fileName = `${userId}/profile.${fileExtension}`;
    const file = new File(imageUri);
    const bytes = await file.bytes();

    const { error } = await getSupabase()
      .storage.from('profiles')
      .upload(fileName, bytes, {
        contentType: `image/${fileExtension}`,
        upsert: true,
      });

    if (error) throw error;

    const { data: urlData } = getSupabase()
      .storage.from('profiles')
      .getPublicUrl(fileName);

    return urlData.publicUrl;
  } catch (error) {}
};
