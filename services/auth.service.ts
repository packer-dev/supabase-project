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
  uploadAvatar: async (file: File) => {
    const { data, error } = await supabase.storage
      .from('packer-ui')
      .upload('/profile/', file);
    if (error) throw error;
    return data;
  },
};
