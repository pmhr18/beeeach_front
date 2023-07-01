'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { apiClient } from '../../../utils/api';

export default function AuthCallbackPage() {
	const router = useRouter();
	const searchParams = useSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
				const callbackParams = Array.from(searchParams.entries());
				const queryString = callbackParams.map(([key, value]) => `${key}=${value}`).join('&');
				const response = await apiClient.get(`/login/google/callback?${queryString}`);
				console.log('success!!!!!', response.data);
				
        router.replace('/');
      } catch (e) {
        console.error('failed.' ,e);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='mx-auto card w-auto py-10 sm:w-[32rem] bg-base-100 shadow-xl'>
      <div className='card-body'>
        <div className='mx-auto'>ユーザー認証処理中です...</div>
        <span className="mx-auto my-2 loading loading-spinner loading-md text-accent"></span>
      </div>
    </div>
  )
};
