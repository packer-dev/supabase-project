import { supabase } from './api';

export const authService = {
  updateProfile: async (profile: { full_name: string; userId: string }) => {
    const { data, error } = await supabase
      .from('users')
      .update({
        full_name: profile.full_name,
      })
      .eq('id', profile.userId);
    if (error) {
      throw error;
    }
    return data;
  },
  updatePassword: async (newPassword: string, userId: string) => {
    const { data, error } = await supabase.auth.admin.updateUserById(userId, {
      password: newPassword,
    });
    if (error) {
      throw error;
    }
    return data;
  },
  uploadAvatar: async (image: string, file: File) => {
    await supabase.storage
      .from('packer-ui')
      .remove([`profile/${image.split('/')[image.split('/').length - 1]}`]);
    const { data, error } = await supabase.storage
      .from('packer-ui')
      .upload(
        `/profile/${Math.random()
          .toString()
          .substring(2, 15)}.${file.type.replace('image/', '')}`,
        file
      );
    if (error) throw error;
    await supabase
      .from('users')
      .update({
        avatar: `https://nqhlmtbglaailxpcvkwb.supabase.co/storage/v1/object/public${data.fullPath}`,
      })
      .eq('id', '72');
    return data;
  },
};
