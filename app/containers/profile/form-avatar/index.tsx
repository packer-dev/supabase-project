'use client';

import Spinner from '@/app/common/Spinner';
import { toast } from '@/hooks/use-toast';
import { authService } from '@/services/auth.service';
import { useMutation } from '@tanstack/react-query';
import { Camera } from 'lucide-react';
import Image from 'next/image';
import { useRef, useState } from 'react';

export const FormAvatar = () => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<File | string>('https://nqhlmtbglaailxpcvkwb.supabase.co/storage/v1/object/public/packer-ui/profile/9210844715430.webp');
  const mutation = useMutation({
    mutationKey: ['UPLOAD_AVATAR'],
    mutationFn: () => {
      if (typeof image === 'object')
        return authService.uploadAvatar('https://nqhlmtbglaailxpcvkwb.supabase.co/storage/v1/object/public/packer-ui/profile/9210844715430.webp', image)
      return Promise.resolve(null)
    },
    onSuccess: () => {
      toast({
        title: 'Update avatar successfully.',
      });
      if (!fileRef.current) return;
      fileRef.current.value = ""
    }
  })
  return (
    <section className='w-40 h-40 rounded-full relative overflow-hidden'>
      {mutation.isPending && <div className='absolute top-0 left-0 bottom-0 right-0 bg-white/50 flex items-center justify-center z-10 text-white'>
        <Spinner />
      </div>}
      <Image
        src={typeof image === 'object' ? window.URL.createObjectURL(image) : image}
        alt=''
        className='rounded-full object-cover'
        fill
      />
      {!mutation.isPending && <label
        htmlFor='avatar-image'
        className='absolute bg-black bottom-0 w-full h-6 py-0.5 rounded-full cursor-pointer'
      >
        <Camera color='white' size={16} className='mx-auto' />
      </label>}
      <input
        ref={fileRef}
        type='file'
        id='avatar-image'
        className='hidden'
        onChange={async (event) => {
          if (event.target.files?.length) {
            const file = event.target.files[0];
            setImage(file);
            await mutation.mutateAsync();
          }
        }}
      />
    </section>
  );
};