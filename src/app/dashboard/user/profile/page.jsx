import { auth } from '@/lib/auth';
import { Person } from '@gravity-ui/icons';
import { Card, Skeleton } from '@heroui/react';
import { headers } from 'next/headers';
import Image from 'next/image';
import React from 'react';
import { SiNamecheap } from 'react-icons/si';

const ProfilePage = async () => {
  const session = await auth.api.getSession({
    headers: await headers() // you need to pass the headers object.
  })
  const user = session?.user
  return (
    <div className='mt-6'>
      <h1 className='text-[36px] font-bold'>My Profile</h1>
      <p className='text-gray-500 text1rem] font-medium my-2'>Mange Your Account</p>
      <Card className=' w-full'>
        <div className='flex items-center gap-2 '>
          <div>
            <Image src={user?.image} alt='user image' width={100} height={100} className='rounded-full'></Image>
          </div>
          <div>
            <p>{user?.name}</p>
            <p>{user?.email}</p>
          </div>
        </div>
        <div className='space-y-2'>
          <h1 className='flex items-center gap-2 text-[1rem]'><SiNamecheap />Full Name</h1>
          <p className='border rounded-md p-4 text-[1rem] font-semibold'>{user?.name}</p>
          <h1 className='flex items-center gap-2 text-[1rem]'><Person/>Image Url</h1>
          <p className='border rounded-md p-4 text-[1rem] font-semibold'>{user?.image}</p>
        </div>
      </Card>
    </div>
  );
};

export default ProfilePage; 